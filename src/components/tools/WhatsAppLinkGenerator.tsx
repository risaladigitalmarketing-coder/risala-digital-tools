'use client'

import React, { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Copy, 
  ExternalLink, 
  QrCode, 
  Check, 
  RefreshCw, 
  Share2,
  Sparkles,
  Search,
  BookOpen,
  Send
} from 'lucide-react'

export default function WhatsAppLinkGenerator() {
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [countryCode, setCountryCode] = useState('91') // Default to India
  const [generatedLink, setGeneratedLink] = useState('')
  const [copied, setCopied] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [showQr, setShowQr] = useState(false)

  // Popular pre-filled templates to make the tool extremely engaging & user-friendly
  const templates = [
    { label: "Business Inquiry", text: "Hello, I am interested in your digital marketing services. Please share details." },
    { label: "Book Appointment", text: "Hi! I would like to book a consulting appointment for my brand." },
    { label: "Support Ticket", text: "Hello Team, I am facing an issue and need technical support." },
    { label: "Product Order", text: "Hi, I want to order this product. Please share availability." }
  ]

  useEffect(() => {
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '')
      const fullPhone = `${countryCode}${cleanPhone}`
      const baseUrl = `https://wa.me/${fullPhone}`
      const link = message ? `${baseUrl}?text=${encodeURIComponent(message)}` : baseUrl
      setGeneratedLink(link)
      
      // Generate QR Code URL using a free reliable open QR API
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link)}`)
    } else {
      setGeneratedLink('')
      setQrCodeUrl('')
    }
  }, [phone, message, countryCode])

  const copyToClipboard = () => {
    if (!generatedLink) return
    navigator.clipboard.writeText(generatedLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = () => {
    if (!generatedLink) return
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: 'WhatsApp Click to Chat Link',
        text: 'Send me a message on WhatsApp:',
        url: generatedLink,
      }).catch(() => {})
    } else {
      copyToClipboard()
      alert('Link copied to clipboard for sharing!')
    }
  }

  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <MessageSquare className="text-green-500" size={28} />
          <span>WhatsApp Link Generator</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create free WhatsApp click-to-chat links (wa.me) with pre-filled messages instantly. Boost leads and customer engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT FORM (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>Step 1: Enter Phone Number & Message</span>
            </h2>

            {/* Country Code & Phone Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Enter WhatsApp Number</label>
              <div className="flex rounded-xl shadow-sm border border-gray-200 overflow-hidden bg-white">
                <select 
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="bg-gray-50 border-r border-gray-200 px-3 py-3 text-sm font-bold text-gray-700 focus:outline-none"
                >
                  <option value="91">🇮🇳 +91 (India)</option>
                  <option value="1">🇺🇸 +1 (US/CA)</option>
                  <option value="44">🇬🇧 +44 (UK)</option>
                  <option value="971">🇦🇪 +971 (UAE)</option>
                  <option value="966">🇸🇦 +966 (Saudi)</option>
                  <option value="61">🇦🇺 +61 (Australia)</option>
                  <option value="92">🇵🇰 +92 (Pakistan)</option>
                  <option value="880">🇧🇩 +880 (Bangladesh)</option>
                </select>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210" 
                  className="flex-1 px-4 py-3 text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-gray-400 font-medium">Include your full WhatsApp number without spaces or special characters.</p>
            </div>

            {/* Custom Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Custom Pre-filled Message (Optional)</label>
              <textarea 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Hello, I am interested in your consulting services. Please share details!" 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
            </div>

            {/* Quick Templates */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                <Sparkles size={14} className="text-green-500" />
                Quick Message Templates:
              </span>
              <div className="flex flex-wrap gap-2">
                {templates.map((tpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(tpl.text)}
                    className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-600 font-semibold px-3 py-1.5 rounded-lg transition border border-gray-200"
                  >
                    + {tpl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OUTPUT PANEL (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
            <h2 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider flex items-center justify-between">
              <span>Your Generated Link</span>
              {generatedLink && (
                <span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Ready</span>
              )}
            </h2>

            {generatedLink ? (
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-xl p-3 break-all font-mono text-xs text-green-700 select-all">
                  {generatedLink}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-green-100 transition"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl shadow-lg transition"
                  >
                    <Send size={18} />
                    <span>Test Link</span>
                  </a>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={() => setShowQr(!showQr)}
                    className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-bold py-2.5 px-4 rounded-xl transition text-sm"
                  >
                    <QrCode size={18} className="text-green-600" />
                    <span>{showQr ? 'Hide QR Code' : 'Generate QR Code'}</span>
                  </button>
                </div>

                {showQr && qrCodeUrl && (
                  <div className="bg-white border border-gray-200 rounded-xl p-4 text-center space-y-3 animate-in">
                    <img src={qrCodeUrl} alt="WhatsApp QR Code" className="w-40 h-40 mx-auto rounded-lg shadow-sm" />
                    <p className="text-xs text-gray-500 font-medium">Scan with smartphone camera to open WhatsApp directly.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-10 space-y-3">
                <MessageSquare size={40} className="mx-auto text-gray-300" />
                <p className="text-sm font-semibold text-gray-400">Enter a phone number on the left to generate your custom wa.me link.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
