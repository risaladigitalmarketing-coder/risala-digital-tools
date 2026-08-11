import { Metadata } from 'next';

/**
 * Fetch RankMath SEO data or custom fields for a specific slug from WordPress CMS.
 * Uses revalidate caching (30s) as described in HEADLESS_WP_NEXTJS_GUIDE.md.
 */
export async function getSEO(
  slug: string,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  const WP_API_BASE = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/+$/, '') || 'https://tools-cms.risaladigitalmarketing.com';

  try {
    // Fetch standard WordPress page by slug
    const res = await fetch(`${WP_API_BASE}/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 30 }, // 30s cache revalidation as per guide
    });

    if (res.ok) {
      const pages = await res.json();
      if (Array.isArray(pages) && pages.length > 0) {
        const page = pages[0];
        const rank = page.rank_math_seo || {};
        const yoast = page.yoast_head_json || {};

        const title = rank.title || yoast.title || page.title?.rendered || fallbackTitle;
        const description = rank.description || yoast.description || page.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || fallbackDescription;
        const robots = yoast.robots || { index: true, follow: true };

        return {
          title,
          description,
          openGraph: {
            title,
            description,
            url: `https://tools.risaladigitalmarketing.com/tools/${slug}`,
          },
          robots,
        };
      }
    }
  } catch (error) {
    console.error('[getSEO] Fetch error:', error);
  }

  return {
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      title: fallbackTitle,
      description: fallbackDescription,
      url: `https://tools.risaladigitalmarketing.com/tools/${slug}`,
    },
    robots: { index: true, follow: true },
  };
}
