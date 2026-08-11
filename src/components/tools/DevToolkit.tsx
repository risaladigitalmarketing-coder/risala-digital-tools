'use client'

import React from 'react'
import { Terminal, GitBranch, Zap } from 'lucide-react'

export default function DevToolkit() {
  return (
    <div className="space-y-8 animate-in">
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <Terminal className="text-indigo-600" size={28} />
          <span>Dev Toolkit</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Handy developer utilities – Git cheatsheet, terminal shortcuts, and common scripts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <GitBranch className="text-indigo-600" size={20} />
            Git Cheatsheet
          </h2>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <p className="text-gray-500 mb-2">Basic workflow</p>
              <pre>{`git init
git add .
git commit -m "msg"
git push origin main`}</pre>
            </div>
            <div className="bg-gray-50 border border-gray-150 rounded-xl p-4 font-mono text-xs overflow-x-auto">
              <p className="text-gray-500 mb-2">Branching</p>
              <pre>{`git branch feature
git checkout feature
git merge feature`}</pre>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Zap className="text-yellow-500" size={20} />
              Terminal Shortcuts
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex justify-between py-2 border-b border-gray-100"><span>Ctrl + R</span><span className="font-mono text-gray-500">History search</span></li>
              <li className="flex justify-between py-2 border-b border-gray-100"><span>Ctrl + C</span><span className="font-mono text-gray-500">Kill process</span></li>
              <li className="flex justify-between py-2"><span>Ctrl + D</span><span className="font-mono text-gray-500">EOF / Exit</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
