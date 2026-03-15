"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  SendIcon,
  BrainIcon,
  UserIcon,
  CopyIcon,
} from "@/components/icons"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI study assistant. I can help you with homework, explain concepts, answer questions about any subject, and much more. What would you like to learn today?",
  },
]

interface AIChatProps {
  onBack: () => void
}

export function AIChat({ onBack }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Let me explain...\n\nBased on the topic you mentioned, here are the key points to understand:\n\n1. **Core Concept**: The fundamental principle is...\n2. **Application**: This is commonly used in...\n3. **Examples**: For instance, consider...\n\nWould you like me to elaborate on any of these points?",
        "I'd be happy to help you with that!\n\nHere's a step-by-step breakdown:\n\n**Step 1**: First, identify the main components\n**Step 2**: Apply the relevant formula or method\n**Step 3**: Verify your answer\n\nLet me know if you need more clarification!",
        "Great question! This is a fundamental concept in this subject.\n\nThe key things to remember are:\n• Point A is essential for understanding the basics\n• Point B builds upon that foundation\n• Point C is the practical application\n\nShould I provide some practice problems?",
      ]

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
          <BrainIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">AI Chat Assistant</h2>
          <p className="text-sm text-muted-foreground">Ask me anything</p>
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  message.role === "user"
                    ? "bg-primary/20"
                    : "bg-accent/20"
                )}
              >
                {message.role === "user" ? (
                  <UserIcon className="h-4 w-4 text-primary" />
                ) : (
                  <BrainIcon className="h-4 w-4 text-accent" />
                )}
              </div>
              <div
                className={cn(
                  "group relative max-w-[80%] rounded-xl p-4",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                )}
              >
                <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                {message.role === "assistant" && (
                  <button
                    onClick={() => copyToClipboard(message.content)}
                    className="absolute -bottom-2 -right-2 hidden rounded-lg border border-border bg-card p-2 text-muted-foreground transition-colors hover:text-foreground group-hover:flex"
                  >
                    <CopyIcon className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                <BrainIcon className="h-4 w-4 text-accent" />
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "150ms" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border pt-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim()}
            className="bg-primary px-4 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
