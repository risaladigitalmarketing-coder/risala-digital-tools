import { toolsList } from '../src/data/tools'

/**
 * Script to sync all static tools to WordPress CMS via REST API.
 * Uses WP Basic Auth (or Application Passwords) if WP_ADMIN_USER and WP_ADMIN_PASSWORD environment variables are set.
 * 
 * Usage:
 *   WP_ADMIN_USER=antigravity WP_ADMIN_PASSWORD="<your_password>" npx tsx scripts/sync-tools-to-wordpress.ts
 */

const WP_API_BASE = (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://tools-cms.risaladigitalmarketing.com').replace(/\/+$/, '')
const WP_USER = process.env.WP_ADMIN_USER || 'antigravity'
const WP_PASS = process.env.WP_ADMIN_PASSWORD || ''

const authHeader = WP_PASS ? `Basic ${Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')}` : ''

async function syncTools() {
  console.log(`Checking WordPress tools at ${WP_API_BASE}...`)
  
  // 1. Fetch existing categories
  const catRes = await fetch(`${WP_API_BASE}/wp-json/wp/v2/tool_category`)
  const existingCategories = catRes.ok ? await catRes.json() : []
  const categoryMap = new Map<string, number>()
  for (const cat of existingCategories) {
    categoryMap.set(cat.name, cat.id)
    categoryMap.set(cat.slug, cat.id)
  }

  // 2. Fetch existing tool posts
  const toolRes = await fetch(`${WP_API_BASE}/wp-json/wp/v2/tool?per_page=100`)
  const existingTools = toolRes.ok ? await toolRes.json() : []
  const existingSlugs = new Set(existingTools.map((t: any) => t.slug))

  console.log(`Existing tools in WP (${existingTools.length}):`, Array.from(existingSlugs))

  for (const tool of toolsList) {
    if (existingSlugs.has(tool.slug)) {
      console.log(`[SKIP] Tool "${tool.name}" (${tool.slug}) already exists in WordPress.`)
      continue
    }

    console.log(`[NEW] Need to create Tool: "${tool.name}" (${tool.slug})`)
    
    // Ensure taxonomy term exists or create it
    let categoryId = categoryMap.get(tool.category)
    if (!categoryId && authHeader) {
      const catSlug = tool.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      try {
        const createCatRes = await fetch(`${WP_API_BASE}/wp-json/wp/v2/tool_category`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
          },
          body: JSON.stringify({
            name: tool.category,
            slug: catSlug
          })
        })
        if (createCatRes.ok) {
          const createdCat = await createCatRes.json()
          categoryId = createdCat.id
          if (categoryId) {
            categoryMap.set(tool.category, categoryId)
            categoryMap.set(catSlug, categoryId)
          }
          console.log(`  ✓ Created category "${tool.category}" (ID: ${categoryId})`)
        } else {
          console.error(`  ✗ Category creation failed (${createCatRes.status}):`, await createCatRes.text())
        }
      } catch (err) {
        console.error(`  ✗ Category request error:`, err)
      }
    }

    // Prepare payload
    const payload: any = {
      title: tool.name,
      slug: tool.slug,
      status: 'publish',
      excerpt: tool.desc,
      acf: {
        icon_name: tool.iconName,
        bg_color: tool.bgColor,
        color: tool.color,
        tag: tool.tag,
        focus_keyword: tool.name.toLowerCase(),
        canonical_url: `https://tools.risaladigitalmarketing.com${tool.path}/`,
        no_index: false
      }
    }

    if (categoryId) {
      payload.tool_category = [categoryId]
    }

    if (!authHeader) {
      console.log(`  -> Ready to create (Provide WP_ADMIN_PASSWORD to auto-post via REST API).`)
      console.log(`  Payload:`, JSON.stringify(payload, null, 2))
      continue
    }

    try {
      const createRes = await fetch(`${WP_API_BASE}/wp-json/wp/v2/tool`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(payload)
      })

      if (createRes.ok) {
        const created = await createRes.json()
        console.log(`  ✓ Successfully created in WP! ID: ${created.id}`)
      } else {
        const errText = await createRes.text()
        console.error(`  ✗ Failed to create (${createRes.status}):`, errText)
      }
    } catch (err) {
      console.error(`  ✗ Request error:`, err)
    }
  }
}

syncTools()
