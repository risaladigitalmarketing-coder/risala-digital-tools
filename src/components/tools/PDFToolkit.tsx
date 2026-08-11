'use client'

import React, { useState } from 'react'
import { 
  FileText, 
  Merge, 
  Split, 
  Minimize2, 
  Image as ImageIcon, 
  RefreshCw, 
  BookOpen, 
  UploadCloud,
  DownloadCloud,
  Lock,
  Trash2,
  FileCheck
} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/lib/seller-tools-ui'
import { PDFDocument } from 'pdf-lib'
import { jsPDF } from 'jspdf'

const FileDropZone = ({ onFileSelect, children, accept }: any) => {
  const [highlight, setHighlight] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files)
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-6 text-center transition-all ${highlight ? 'border-red-500 bg-red-50/50' : 'border-gray-300 bg-gray-50'}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

// 1. MERGE PDF
const MergePDFTool = () => {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleFileSelect = (newFiles: FileList) => {
    const pdfs = Array.from(newFiles).filter(f => f.name.toLowerCase().endsWith('.pdf'))
    if (pdfs.length > 0) {
      setFiles(prev => [...prev, ...pdfs])
      setSuccess(false)
    }
  }

  const handleMerge = async () => {
    if (files.length < 2) return
    setLoading(true)
    try {
      const mergedPdf = await PDFDocument.create()
      
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'Merged_Document.pdf'
      link.click()
      
      setSuccess(true)
      setFiles([])
    } catch (err) {
      console.error(err)
      alert('Error merging PDF files. Make sure files are valid and not password protected.')
    } finally {
      setLoading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <FileDropZone onFileSelect={handleFileSelect} accept=".pdf">
        <UploadCloud size={36} className="mx-auto text-red-500 mb-2" />
        <p className="text-sm font-bold text-gray-700">Drag & Drop PDF files here</p>
        <p className="text-xs text-gray-400 mt-1">or click to browse from device</p>
        <input 
          type="file" 
          multiple 
          accept=".pdf" 
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)} 
          className="hidden" 
          id="merge-pdf-input"
        />
        <label 
          htmlFor="merge-pdf-input" 
          className="mt-4 inline-block bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition shadow-sm"
        >
          Select PDF Files
        </label>
      </FileDropZone>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected Files ({files.length}):</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-gray-700">
                <span className="truncate max-w-[240px]">{file.name}</span>
                <button onClick={() => removeFile(idx)} className="text-gray-400 hover:text-red-600 transition">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleMerge}
            disabled={files.length < 2 || loading}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-100 transition disabled:opacity-50"
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <Merge size={18} />}
            <span>{loading ? 'Merging PDFs...' : `Merge ${files.length} PDFs`}</span>
          </button>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-center space-y-1">
          <FileCheck size={24} className="mx-auto text-green-600" />
          <p className="text-sm font-bold text-green-800">PDFs Merged Successfully!</p>
          <p className="text-xs text-green-600">Your download started automatically.</p>
        </div>
      )}
    </div>
  )
}

// 2. JPG TO PDF
const JPGToPDFTool = () => {
  const [images, setImages] = useState<File[]>([])
  const [loading, setLoading] = useState(false)

  const handleImageSelect = (files: FileList) => {
    const imgs = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (imgs.length > 0) {
      setImages(prev => [...prev, ...imgs])
    }
  }

  const handleConvert = async () => {
    if (images.length === 0) return
    setLoading(true)
    try {
      const doc = new jsPDF()
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onload = (e) => resolve(e.target?.result as string)
          reader.readAsDataURL(file)
        })
        if (i > 0) doc.addPage()
        doc.addImage(dataUrl, 'JPEG', 10, 10, 190, 0)
      }
      doc.save('Converted_Images.pdf')
      setImages([])
    } catch (err) {
      console.error(err)
      alert('Error converting images to PDF.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <FileDropZone onFileSelect={handleImageSelect} accept="image/*">
        <ImageIcon size={36} className="mx-auto text-red-500 mb-2" />
        <p className="text-sm font-bold text-gray-700">Drag & Drop JPG/PNG images here</p>
        <p className="text-xs text-gray-400 mt-1">Convert multiple images into a single PDF</p>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={(e) => e.target.files && handleImageSelect(e.target.files)} 
          className="hidden" 
          id="jpg-pdf-input"
        />
        <label 
          htmlFor="jpg-pdf-input" 
          className="mt-4 inline-block bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-gray-700 px-4 py-2 rounded-lg cursor-pointer transition shadow-sm"
        >
          Select Images
        </label>
      </FileDropZone>

      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Selected Images ({images.length}):</h4>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative bg-gray-100 rounded-lg p-1 text-center">
                <span className="text-[10px] text-gray-600 block truncate">{img.name}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-red-100 transition disabled:opacity-50"
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <DownloadCloud size={18} />}
            <span>{loading ? 'Converting to PDF...' : 'Convert to PDF'}</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function PDFToolkit() {
  return (
    <div className="space-y-8 animate-in">
      {/* Title & SEO Description */}
      <div className="border-b border-gray-150 pb-5">
        <h1 className="text-3xl font-extrabold text-gray-950 flex items-center gap-2">
          <FileText className="text-red-500" size={28} />
          <span>PDF Toolkit</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Merge, split, compress, and convert PDF files directly inside your browser. Fast, 100% private, and secure.
        </p>
      </div>

      <Tabs defaultValue="merge">
        <TabsList>
          <TabsTrigger value="merge">Merge PDF</TabsTrigger>
          <TabsTrigger value="jpg2pdf">JPG to PDF</TabsTrigger>
        </TabsList>

        <div className="pt-4 max-w-xl mx-auto">
          <TabsContent value="merge"><MergePDFTool /></TabsContent>
          <TabsContent value="jpg2pdf"><JPGToPDFTool /></TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
