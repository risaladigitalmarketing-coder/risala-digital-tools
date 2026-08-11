'use client'

import React from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react'
import { toolsList } from '@/data/tools'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                RD
              </div>
              <span className="font-extrabold text-base tracking-tight text-gray-900">
                Risala Digital <span className="text-green-600 font-normal text-xs px-2 py-0.5 rounded-full bg-green-50 border border-green-100">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-md">
              Free premium web utilities and marketing calculators brought to you by risaladigitalmarketing.com. Boost your workflow, increase CTR, generate higher ROI, and create beautiful text and formats in seconds.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center text-xs text-gray-400">
                <CheckCircle2 size={12} className="text-green-500 mr-1" />
                No Sign Up Required
              </span>
              <span className="flex items-center text-xs text-gray-400">
                <CheckCircle2 size={12} className="text-green-500 mr-1" />
                100% Free Forever
              </span>
              <span className="flex items-center text-xs text-gray-400">
                <CheckCircle2 size={12} className="text-green-500 mr-1" />
                GDPR & AdSense Compliant
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-gray-950 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
              <HelpCircle size={14} className="text-green-600" />
              <span>Our Top Tools</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              {toolsList.slice(0, 5).map((tool) => (
                <li key={tool.path}>
                  <Link href={tool.path} className="text-gray-500 hover:text-green-600 transition flex items-center">
                    <ChevronRight size={12} className="mr-1 text-gray-300" />
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-sm text-gray-950 uppercase tracking-wider mb-4 flex items-center space-x-1.5">
              <span>Legal & Links</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://risaladigitalmarketing.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <ChevronRight size={12} className="mr-1 text-gray-300" />
                  Visit Official Site
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <ChevronRight size={12} className="mr-1 text-gray-300" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-gray-500 hover:text-green-600 transition flex items-center">
                  <ChevronRight size={12} className="mr-1 text-gray-300" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-150 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
          <p>© {new Date().getFullYear()} risaladigitalmarketing.com. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed & Optimized for Search Traffic & Maximum AdSense Revenue</p>
        </div>
      </div>
    </footer>
  )
}
