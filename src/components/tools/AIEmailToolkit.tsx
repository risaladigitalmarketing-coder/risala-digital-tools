'use client'

import React, { useState } from 'react'
import { Mail, Copy, Check, RefreshCw, Sparkles, Send } from 'lucide-react'

const emailTemplates = [
  {
    category: 'Cold Outreach',
    templates: [
      { subject: 'Quick question about {{company}}\'s growth', body: 'Hi {{firstName}},\n\nI noticed {{company}} has been expanding rapidly in the {{industry}} space. I work with similar companies to help them reduce costs and improve efficiency.\n\nWould you be open to a quick 5-minute chat next week?\n\nBest,\n{{yourName}}' },
      { subject: 'Idea for {{company}}', body: 'Hi {{firstName}},\n\nI came across {{company}} and had a quick idea that could potentially 2x your conversion rate. Would you be open to sharing your email so I can send a brief breakdown?\n\nCheers,\n{{yourName}}' }
    ]
  },
  {
    category: 'Follow-Up',
    templates: [
      { subject: 'Following up on our conversation', body: 'Hi {{firstName}},\n\nJust wanted to follow up on my previous email about {{topic}}. I understand you\'re busy, but I think a 5-minute call could really help.\n\nWhen works best for you?\n\nBest,\n{{yourName}}' }
    ]
  }
]

export default function AIEmailToolkit() {
  const [copiedIndex, setCopiedIndex] = useState('')

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(id)
    setTimeout(() => setCopiedIndex(''), 2000)
  }

  return (
    <div className="space-y-8 animate-in">
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Mail className="text-cyan-500" size={28} />
          <span>AI Email Toolkit</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Professional email templates and AI copy generation for sales outreach and follow-ups.</p>
      </div>

      <div className="space-y-6">
        {emailTemplates.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            <h3 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">{group.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.templates.map((tpl, tIdx) => {
                const id = `${gIdx}-${tIdx}`
                return (
                  <div key={tIdx} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
                    <div className="bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-xs font-bold text-gray-800">
                      Subject: {tpl.subject}
                    </div>
                    <pre className="text-xs text-gray-600 font-sans whitespace-pre-wrap leading-relaxed">{tpl.body}</pre>
                    <button
                      onClick={() => handleCopy(`Subject: ${tpl.subject}\n\n${tpl.body}`, id)}
                      className="flex items-center space-x-1.5 text-xs font-bold text-cyan-600 hover:text-cyan-700"
                    >
                      {copiedIndex === id ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                      <span>{copiedIndex === id ? 'Copied!' : 'Copy Template'}</span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
