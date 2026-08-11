'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  BookOpen,
  List,
  PenTool
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, useAITool } from '@/lib/seller-tools-ui'

const blogTemplates = {
  'how-to': {
    title: 'How-to Guide',
    outline: ['Introduction', 'Prerequisites', 'Step 1: Planning', 'Step 2: Execution', 'Step 3: Optimization', 'Tips & Tricks', 'Conclusion'],
    style: 'Instructional, clear steps'
  },
  'listicle': {
    title: 'Listicle (Top X)',
    outline: ['Hook Introduction', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Bonus Tip', 'Conclusion'],
    style: 'Scannable, engaging'
  },
  'case-study': {
    title: 'Case Study',
    outline: ['Challenge', 'Solution', 'Implementation', 'Results', 'Key Takeaways', 'Conclusion'],
    style: 'Data-driven, storytelling'
  }
}

export default function AIBlogGenerator() {
  const [topic, setTopic] = useState('')
  const [template, setTemplate] = useState('how-to')
  const [tone, setTone] = useState('Professional')
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [copiedText, setCopiedText] = useState('')

  const { generating, setGenerating } = useAITool('blog-generator')

  const handleGenerate = () => {
    if (!topic) return
    setGenerating(true)
    setTimeout(() => {
      const tpl = (blogTemplates as any)[template] || blogTemplates['how-to']
      setGeneratedContent({
        title: `Ultimate Guide to ${topic}: Everything You Need to Know`,
        metaDescription: `Discover key insights and actionable strategies on ${topic}. Complete step-by-step tutorial.`,
        outline: tpl.outline.map((section: string) => `${section}: ${topic} Strategy`),
        takeaways: [
          `Mastering ${topic} leads to improved ROI.`,
          `Consistency in execution yields maximum search visibility.`,
          `Regular updates ensure long-term audience engagement.`
        ]
      })
      setGenerating(false)
    }, 400)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <PenTool className="text-pink-500" size={28} />
          <span>AI Blog Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Generate structured blog post outlines, title tags, and meta descriptions optimized for search engines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider">Define Blog Topic</h2>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Article Topic / Keyword</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., E-commerce SEO Strategies for 2026"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Post Type</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white"
              >
                <option value="how-to">How-to Guide</option>
                <option value="listicle">Listicle (Top 10)</option>
                <option value="case-study">Case Study</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!topic || generating}
              className="w-full flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-pink-100 transition disabled:opacity-50"
            >
              {generating ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{generating ? 'Generating Outline...' : 'Generate Blog Outline'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider">Generated Output</h2>

            {generatedContent ? (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] text-pink-600 font-bold uppercase">SEO Title</span>
                  <p className="text-sm font-bold text-gray-900">{generatedContent.title}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                  <span className="text-[10px] text-pink-600 font-bold uppercase">Outline Sections</span>
                  <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                    {generatedContent.outline.map((sec: string, idx: number) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="w-4 text-pink-500 font-bold">{idx + 1}.</span>
                        <span>{sec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCopy(JSON.stringify(generatedContent, null, 2))}
                  className="w-full flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  {copiedText ? <Check size={16} /> : <Copy size={16} />}
                  <span>{copiedText ? 'Copied Full Output!' : 'Copy Outline JSON'}</span>
                </button>
              </div>
            ) : (
              <div className="text-center py-10 space-y-2">
                <FileText size={36} className="mx-auto text-gray-300" />
                <p className="text-sm font-semibold text-gray-400">Enter a topic to generate blog structure.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
