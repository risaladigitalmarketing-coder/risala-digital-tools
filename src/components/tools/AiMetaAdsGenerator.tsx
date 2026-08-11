'use client'

import React, { useState } from 'react'
import { Megaphone, Sparkles, Copy, Check, RefreshCw, BookOpen, Lightbulb } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent, useAITool } from '@/lib/seller-tools-ui'

const generateAdCopy = (industry: string, offer: string, tone: string, language: string) => {
  const basePrompts = {
    english: {
      primary: [
        `Unlock the power of ${industry} with our exclusive ${offer}!`, 
        `Revolutionize your ${industry} strategy. Get amazing ${offer} now!`, 
        `Experience unparalleled results in ${industry}. Discover our ${offer}.`
      ],
      headline: [
        `Boost Your ${industry}!`, 
        `Exclusive ${offer} Available!`, 
        `Master ${industry} Today!`
      ],
      description: [
        `Don't miss out on this limited-time opportunity to elevate your ${industry} game.`, 
        `Our ${offer} is designed for maximum impact and measurable growth.`
      ]
    },
    hindi: {
      primary: [
        `अपने ${industry} को मज़बूत करें हमारे ख़ास ${offer} के साथ!`, 
        `अपने ${industry} की रणनीति को बदलें। शानदार ${offer} अभी प्राप्त करें!`, 
        `${industry} में बेहतरीन परिणाम पाएँ। हमारे ${offer} को आज़माएँ।`
      ],
      headline: [
        `${industry} को बढ़ावा दें!`, 
        `ख़ास ${offer} उपलब्ध!`, 
        `आज ही ${industry} में महारत हासिल करें!`
      ],
      description: [
        `इस सीमित समय के अवसर को न चूकें और अपने ${industry} को नई ऊँचाई पर ले जाएँ।`, 
        `हमारा ${offer} अधिकतम प्रभाव और मापने योग्य वृद्धि के लिए डिज़ाइन किया गया है।`
      ]
    },
    hinglish: {
      primary: [
        `Apne ${industry} ko strong banayein with our exclusive ${offer}!`, 
        `Revolutionize your ${industry} strategy. Get amazing ${offer} now!`, 
        `Experience next-level results in ${industry}. Discover our ${offer}.`
      ],
      headline: [
        `Boost Your ${industry}!`, 
        `Exclusive ${offer} Available!`, 
        `Master ${industry} Today!`
      ],
      description: [
        `Don't miss out on this limited-time opportunity to elevate your ${industry} game.`, 
        `Our ${offer} is designed for maximum impact and measurable growth.`
      ]
    }
  }

  const selectedPrompts = (basePrompts as any)[language] || basePrompts.english

  const results = {
    primaryTexts: Array(5).fill(0).map((_, i) => `${selectedPrompts.primary[i % selectedPrompts.primary.length]} (Tone: ${tone})`),
    headlines: Array(5).fill(0).map((_, i) => `${selectedPrompts.headline[i % selectedPrompts.headline.length]}`),
    descriptions: Array(5).fill(0).map((_, i) => `${selectedPrompts.description[i % selectedPrompts.description.length]}`)
  }
  return results
}

export default function AiMetaAdsGenerator() {
  const [industry, setIndustry] = useState('')
  const [offer, setOffer] = useState('')
  const [tone, setTone] = useState('Professional')
  const [language, setLanguage] = useState('english')
  const [generatedCopies, setGeneratedCopies] = useState<any>(null)
  const [copiedText, setCopiedText] = useState('')

  const { generating, setGenerating } = useAITool('meta-ads-generator')

  const industries = [
    "Digital Marketing", "E-commerce", "Real Estate", "Education", "Healthcare", 
    "Fitness", "Food & Beverage", "Fashion", "Technology", "Finance"
  ]
  const tones = ["Professional", "Funny", "Luxury", "Urgent", "Empathetic"]
  const languages = [
    { label: "English", value: "english" },
    { label: "Hindi (हिंदी)", value: "hindi" },
    { label: "Hinglish (Hindi in English)", value: "hinglish" },
  ]

  const handleGenerate = () => {
    if (!industry || !offer) return
    setGenerating(true)
    setTimeout(() => {
      const copies = generateAdCopy(industry, offer, tone, language)
      setGeneratedCopies(copies)
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
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Megaphone className="text-purple-500" size={28} />
          <span>AI Meta Ads Text Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Harness AI to write high-converting primary text, headlines, and descriptions for Facebook & Instagram ads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Define Your Ad Parameters</span>
            </h2>

            {/* Industry Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Industry / Niche</label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 bg-white"
              >
                <option value="">Select your industry</option>
                {industries.map((ind, i) => (
                  <option key={i} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            {/* Offer / Product Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Product / Offer Details</label>
              <textarea
                rows={3}
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g. 50% discount on summer apparel collection with free delivery"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Tone of Voice</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      tone === t
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Language</label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setLanguage(lang.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      language === lang.value
                        ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!industry || !offer || generating}
              className="w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-purple-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
              <span>{generating ? 'Generating Ad Copies...' : 'Generate Ad Copies'}</span>
            </button>
          </div>
        </div>

        {/* OUTPUT PANEL (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Generated Variations</span>
              {generatedCopies && (
                <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full">Copy Ready</span>
              )}
            </h2>

            {generatedCopies ? (
              <Tabs defaultValue="primary">
                <TabsList>
                  <TabsTrigger value="primary">Primary Text</TabsTrigger>
                  <TabsTrigger value="headline">Headlines</TabsTrigger>
                  <TabsTrigger value="description">Descriptions</TabsTrigger>
                </TabsList>

                <TabsContent value="primary">
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 pt-2">
                    {generatedCopies.primaryTexts.map((text: string, idx: number) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm space-y-2">
                        <p className="text-xs text-gray-800 font-medium leading-relaxed">{text}</p>
                        <button
                          onClick={() => handleCopy(text)}
                          className="flex items-center space-x-1 text-xs font-bold text-purple-600 hover:text-purple-700"
                        >
                          {copiedText === text ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                          <span>{copiedText === text ? 'Copied!' : 'Copy Text'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="headline">
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 pt-2">
                    {generatedCopies.headlines.map((text: string, idx: number) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-900">{text}</p>
                        <button
                          onClick={() => handleCopy(text)}
                          className="p-1.5 text-gray-400 hover:text-purple-600 rounded-lg"
                        >
                          {copiedText === text ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                        </button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="description">
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 pt-2">
                    {generatedCopies.descriptions.map((text: string, idx: number) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm space-y-2">
                        <p className="text-xs text-gray-700">{text}</p>
                        <button
                          onClick={() => handleCopy(text)}
                          className="flex items-center space-x-1 text-xs font-bold text-purple-600 hover:text-purple-700"
                        >
                          {copiedText === text ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                          <span>{copiedText === text ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-10 space-y-3">
                <Lightbulb size={40} className="mx-auto text-gray-300" />
                <p className="text-sm font-semibold text-gray-400">Fill in the ad parameters and click generate to write Meta ad copy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
