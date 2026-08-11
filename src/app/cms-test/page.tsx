// src/app/cms-test/page.tsx
import React from 'react'
import { getToolBySlug, getToolCategoriesByPostId, extractSeo } from '@/lib/wordpress'

export const generateMetadata = async () => ({
  title: 'CMS Test - WordPress Integration',
  description: 'Test page for WordPress API connectivity',
})

export default async function CmsTestPage() {
  const post = await getToolBySlug('pdf-tools')
  const categories = post ? await getToolCategoriesByPostId(post.id) : []

  if (!post) {
    return (
      <section className="max-w-4xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">CMS Test</h1>
        <p className="text-red-600">
          Unable to fetch the PDF Tools record from the WordPress Tool CPT.
        </p>
        <p className="text-slate-600">
          Check <code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_WORDPRESS_API_URL</code> and confirm the
          REST endpoint for <code className="bg-slate-100 px-1 rounded">tool</code> is reachable.
        </p>
      </section>
    )
  }

  const seo = extractSeo(post)
  const acf = post.acf ?? {}

  return (
    <section className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">CMS Test</p>
        <h1 className="text-3xl font-black text-slate-950">WordPress Integration Verified</h1>
        <p className="text-slate-600">
          This page is reading the live WordPress Tool CPT, ACF fields, and Tool Category for PDF Tools.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Tool CPT</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">ID</dt><dd className="font-medium">{post.id}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Slug</dt><dd className="font-medium">{post.slug}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Status</dt><dd className="font-medium">{post.status}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Type</dt><dd className="font-medium">{post.type}</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Tool Category</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Count</dt><dd className="font-medium">{categories.length}</dd></div>
            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((category) => (
                <span key={category.id} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {category.name}
                </span>
              ))}
            </div>
          </dl>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">ACF Fields</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Icon</dt><dd className="font-medium">{acf.icon_name || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Background</dt><dd className="font-medium">{acf.bg_color || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Color</dt><dd className="font-medium">{acf.color || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Tag</dt><dd className="font-medium">{acf.tag || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Focus Keyword</dt><dd className="font-medium">{acf.focus_keyword || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Canonical URL</dt><dd className="font-medium text-right">{acf.canonical_url || '—'}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">No Index</dt><dd className="font-medium">{String(Boolean(acf.no_index))}</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">SEO Snapshot</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Title</dt><dd className="font-medium text-right">{seo.title}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Description</dt><dd className="font-medium text-right">{seo.description}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-slate-500">Indexable</dt><dd className="font-medium">{seo.robots.index ? 'Yes' : 'No'}</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}
