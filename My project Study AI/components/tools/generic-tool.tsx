"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  SparklesIcon,
  CopyIcon,
} from "@/components/icons"

interface GenericToolProps {
  icon: ReactNode
  title: string
  description: string
  placeholder: string
  inputLabel: string
  buttonText: string
  buttonColor?: string
  onBack: () => void
  generateResponse: (input: string) => string
}

export function GenericTool({
  icon,
  title,
  description,
  placeholder,
  inputLabel,
  buttonText,
  buttonColor = "bg-primary hover:bg-primary/90",
  onBack,
  generateResponse,
}: GenericToolProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleProcess = () => {
    if (!input.trim()) return

    setIsProcessing(true)

    setTimeout(() => {
      setOutput(generateResponse(input))
      setIsProcessing(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="border-border text-foreground hover:bg-secondary"
        >
          Back
        </Button>
      </div>

      {/* Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">{inputLabel}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="h-32 w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Process Button */}
      <Button
        onClick={handleProcess}
        disabled={!input.trim() || isProcessing}
        className={`w-full gap-2 text-primary-foreground disabled:opacity-50 ${buttonColor}`}
      >
        {isProcessing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            Processing...
          </>
        ) : (
          <>
            <SparklesIcon className="h-4 w-4" />
            {buttonText}
          </>
        )}
      </Button>

      {/* Output */}
      {output && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-foreground">Result</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2 border-border text-foreground hover:bg-secondary"
            >
              <CopyIcon className="h-4 w-4" />
              Copy
            </Button>
          </div>
          <div className="prose prose-invert max-h-96 max-w-none overflow-y-auto text-sm text-muted-foreground">
            <pre className="whitespace-pre-wrap font-sans">{output}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
