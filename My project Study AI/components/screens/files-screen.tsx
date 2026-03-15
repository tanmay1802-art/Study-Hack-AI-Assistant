"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  UploadIcon,
  FileTextIcon,
  ImageIcon,
  FileIcon,
  SparklesIcon,
} from "@/components/icons"
import { cn } from "@/lib/utils"

interface UploadedFile {
  id: string
  name: string
  type: "pdf" | "image" | "doc"
  size: string
  uploadedAt: Date
}

const mockFiles: UploadedFile[] = [
  { id: "1", name: "Physics_Notes.pdf", type: "pdf", size: "2.4 MB", uploadedAt: new Date() },
  { id: "2", name: "Math_Problem.jpg", type: "image", size: "1.1 MB", uploadedAt: new Date() },
  { id: "3", name: "Essay_Draft.docx", type: "doc", size: "0.8 MB", uploadedAt: new Date() },
]

interface FilesScreenProps {
  onOpenTool: (toolId: string) => void
}

export function FilesScreen({ onOpenTool }: FilesScreenProps) {
  const [files, setFiles] = useState<UploadedFile[]>(mockFiles)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (type: UploadedFile["type"]) => {
    switch (type) {
      case "pdf":
        return <FileTextIcon className="h-6 w-6 text-orange-400" />
      case "image":
        return <ImageIcon className="h-6 w-6 text-accent" />
      case "doc":
        return <FileIcon className="h-6 w-6 text-primary" />
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.includes("pdf") ? "pdf" : file.type.includes("image") ? "image" : "doc",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date(),
      }))
      setFiles([...newFiles, ...files])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = e.dataTransfer.files
    if (droppedFiles) {
      const newFiles: UploadedFile[] = Array.from(droppedFiles).map((file) => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: file.type.includes("pdf") ? "pdf" : file.type.includes("image") ? "image" : "doc",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date(),
      }))
      setFiles([...newFiles, ...files])
    }
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Files</h1>
        <p className="mt-1 text-muted-foreground">Upload and analyze your documents</p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all",
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border bg-card hover:border-primary/50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
          <UploadIcon className="h-7 w-7 text-primary" />
        </div>
        
        <h3 className="mt-4 font-semibold text-foreground">Upload Files</h3>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Drag and drop or click to upload PDF, DOC, or images
        </p>
        
        <Button
          onClick={handleFileSelect}
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Select Files
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onOpenTool("pdf")}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
        >
          <FileTextIcon className="h-6 w-6 text-orange-400" />
          <span className="text-sm font-medium text-foreground">Summarize PDF</span>
        </button>
        <button
          onClick={() => onOpenTool("image-scan")}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
        >
          <ImageIcon className="h-6 w-6 text-accent" />
          <span className="text-sm font-medium text-foreground">Scan Image</span>
        </button>
        <button
          onClick={() => onOpenTool("doc-analyzer")}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
        >
          <FileIcon className="h-6 w-6 text-primary" />
          <span className="text-sm font-medium text-foreground">Analyze Doc</span>
        </button>
      </div>

      {/* Recent Files */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Files</h2>
        
        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                {getFileIcon(file.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">{file.size}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onOpenTool(file.type === "pdf" ? "pdf" : file.type === "image" ? "image-scan" : "doc-analyzer")}
                className="shrink-0 gap-2 border-border text-foreground hover:bg-secondary"
              >
                <SparklesIcon className="h-4 w-4" />
                Analyze
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
