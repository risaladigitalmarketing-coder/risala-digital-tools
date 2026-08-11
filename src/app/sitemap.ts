import { MetadataRoute } from 'next'
import { toolsList } from '@/data/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tools.risaladigitalmarketing.com'

  const staticRoutes = [
    '',
    '/pdf-tools',
    '/whatsapp-link-generator',
    '/business-name-generator',
    '/marketing-calculators',
    '/ai-meta-ads-generator',
    '/ai-blog-generator',
    '/ai-email-toolkit',
    '/dev-toolkit',
    '/privacy-policy',
    '/terms-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const dynamicToolRoutes = toolsList.map((tool) => ({
    url: `${baseUrl}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...dynamicToolRoutes]
}
