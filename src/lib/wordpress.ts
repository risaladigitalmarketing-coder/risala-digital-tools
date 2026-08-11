// src/lib/wordpress.ts
/**
 * Helper utilities to fetch data from the external WordPress CMS via the REST API.
 * The base URL is provided through the public env variable NEXT_PUBLIC_WORDPRESS_API_URL.
 * All functions run on the server (App Router Server Component) and return typed data.
 */

type WPPost = {
  id: number;
  date: string;
  slug: string;
  status?: string;
  type?: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  excerpt_raw?: string;
  featured_media?: number;
  meta?: Record<string, any>;
  acf?: Record<string, any>; // if ACF plugin is used for custom fields
  // SEO fields (Yoast/RankMath) are often exposed under `yoast_head_json` or `rank_math_seo`.
  yoast_head_json?: {
    title?: string;
    description?: string;
    focuskeyword?: string;
    robots?: { index?: boolean; follow?: boolean };
    og_image?: { url?: string }[];
  };
  rank_math_seo?: {
    title?: string;
    description?: string;
    focus_keyword?: string;
    robots?: string; // e.g. "index, follow"
    featured_image?: string;
  };
};

type WPTool = WPPost & {
  tool_category?: number[];
};

/**
 * Base URL for WordPress API – must be defined in .env or .env.local.
 */
const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/*$/, "");

if (!WP_API_BASE) {
  console.warn(
    "[wordpress] NEXT_PUBLIC_WORDPRESS_API_URL is not defined. WordPress integration will be inactive."
  );
}

/**
 * Generic fetch helper that adds the base URL and parses JSON.
 */
async function wpFetch<T>(path: string): Promise<T> {
  if (!WP_API_BASE) {
    throw new Error(
      "WordPress API base URL is missing. Set NEXT_PUBLIC_WORDPRESS_API_URL in your environment."
    );
  }
  const url = `${WP_API_BASE}${path}`;
  const res = await fetch(url, { next: { revalidate: 60 } }); // cache for 60 seconds on the edge
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`WordPress request failed (${res.status}): ${txt}`);
  }
  return (await res.json()) as T;
}

/**
 * Get a single tool CPT item by slug.
 * Returns null if not found.
 */
export async function getToolBySlug(slug: string): Promise<WPTool | null> {
  try {
    const tools = await wpFetch<WPTool[]>(`/wp-json/wp/v2/tool?slug=${encodeURIComponent(slug)}&_embed`);
    if (tools && tools.length > 0) {
      return tools[0];
    }
    return null;
  } catch (e) {
    console.error("[wordpress] getToolBySlug error:", e);
    return null;
  }
}

/**
 * Fetch the tool categories attached to a specific tool post.
 */
export async function getToolCategoriesByPostId(postId: number): Promise<Array<{ id: number; name: string; slug: string }>> {
  try {
    return await wpFetch<Array<{ id: number; name: string; slug: string }>>(
      `/wp-json/wp/v2/tool_category?post=${encodeURIComponent(postId)}&_fields=id,name,slug`
    );
  } catch (e) {
    console.error("[wordpress] getToolCategoriesByPostId error:", e);
    return [];
  }
}

/**
 * Get a list of categories (terms) – useful for mapping tools to categories later.
 */
export async function getCategories(): Promise<any[]> {
  try {
    const cats = await wpFetch<any[]>(`/wp-json/wp/v2/categories?_fields=id,name,slug`);
    return cats;
  } catch (e) {
    console.error("[wordpress] getCategories error:", e);
    return [];
  }
}

/**
 * Utility to extract SEO meta data from a WPPost.
 */
export function extractSeo(post: WPPost) {
  // Prefer Yoast/RankMath fields if present.
  const seo = post.yoast_head_json ?? {};
  const rank = post.rank_math_seo ?? {};
  const acf = post.acf ?? {};
  const title = seo.title ?? rank.title ?? acf.seo_title ?? post.title.rendered;
  const description = seo.description ?? rank.description ?? acf.meta_description ?? post.excerpt?.rendered ?? '';
  const focusKeyword = seo.focuskeyword ?? rank.focus_keyword ?? "";
  const robots = acf.no_index ? { index: false, follow: false } : seo.robots ?? { index: true, follow: true };
  const featuredImage =
    (seo.og_image && seo.og_image[0]?.url) ?? rank.featured_image ?? acf.featured_image ?? null;

  return { title, description, focusKeyword, robots, featuredImage };
}

/**
 * Fetch all tool posts from the WordPress CMS (custom post type "tool").
 * Adjust the endpoint if your CPT uses a different slug.
 */
export async function getAllTools(): Promise<WPPost[]> {
  // Retrieve up to 100 tool posts; increase per_page if needed.
  return wpFetch<WPPost[]>(`/wp-json/wp/v2/tool?_embed&per_page=100`);
}
