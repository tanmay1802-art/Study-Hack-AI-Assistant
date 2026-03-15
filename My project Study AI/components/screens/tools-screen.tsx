"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ToolCard } from "@/components/tool-card"
import { SearchIcon } from "@/components/icons"
import {
  ChatIcon,
  PenIcon,
  RefreshIcon,
  CheckCircleIcon,
  ListIcon,
  NotebookIcon,
  QuoteIcon,
  BookOpenIcon,
  CalculatorIcon,
  HelpCircleIcon,
  CardStackIcon,
  GraduationCapIcon,
  MicIcon,
  LanguagesIcon,
  FileTextIcon,
  ImageIcon,
  FileIcon,
  ShieldIcon,
  LockIcon,
  CodeIcon,
  BugIcon,
} from "@/components/icons"

const categories = [
  { id: "all", label: "All" },
  { id: "writing", label: "Writing" },
  { id: "study", label: "Study" },
  { id: "files", label: "Files" },
  { id: "security", label: "Security" },
]

const tools = [
  // Writing Tools
  { id: "chat", icon: <ChatIcon className="h-5 w-5" />, title: "AI Chat", description: "Conversational AI assistant for any question", color: "primary", category: "writing" },
  { id: "writer", icon: <PenIcon className="h-5 w-5" />, title: "AI Writer", description: "Generate essays, articles, and reports", color: "accent", category: "writing" },
  { id: "paraphrase", icon: <RefreshIcon className="h-5 w-5" />, title: "Paraphraser", description: "Rewrite text in different styles", color: "primary", category: "writing" },
  { id: "plagiarism", icon: <CheckCircleIcon className="h-5 w-5" />, title: "Plagiarism Check", description: "Check text for copied content", color: "orange", category: "writing" },
  { id: "summarizer", icon: <ListIcon className="h-5 w-5" />, title: "Summarizer", description: "Create short or bullet-point summaries", color: "cyan", category: "writing" },
  { id: "notes", icon: <NotebookIcon className="h-5 w-5" />, title: "Notes Generator", description: "Convert text into structured notes", color: "accent", category: "writing" },
  { id: "citation", icon: <QuoteIcon className="h-5 w-5" />, title: "Citation Generator", description: "Generate APA, MLA, Chicago references", color: "pink", category: "writing" },
  
  // Study Tools
  { id: "study-helper", icon: <BookOpenIcon className="h-5 w-5" />, title: "Study Helper", description: "Get explanations for any subject", color: "primary", category: "study" },
  { id: "math", icon: <CalculatorIcon className="h-5 w-5" />, title: "Math Solver", description: "Solve algebra, calculus, and more", color: "orange", category: "study" },
  { id: "homework", icon: <HelpCircleIcon className="h-5 w-5" />, title: "Homework Solver", description: "Step-by-step homework solutions", color: "cyan", category: "study" },
  { id: "quiz", icon: <GraduationCapIcon className="h-5 w-5" />, title: "Quiz Generator", description: "Create MCQ quizzes from any topic", color: "accent", category: "study" },
  { id: "flashcards", icon: <CardStackIcon className="h-5 w-5" />, title: "Flashcards", description: "Auto-generate study flashcards", color: "yellow", category: "study" },
  { id: "voice", icon: <MicIcon className="h-5 w-5" />, title: "Voice Question", description: "Ask questions using your voice", color: "pink", category: "study" },
  { id: "translator", icon: <LanguagesIcon className="h-5 w-5" />, title: "Translator", description: "Translate between languages", color: "primary", category: "study" },
  
  // File Tools
  { id: "pdf", icon: <FileTextIcon className="h-5 w-5" />, title: "PDF Summarizer", description: "Upload and summarize PDF documents", color: "orange", category: "files" },
  { id: "image-scan", icon: <ImageIcon className="h-5 w-5" />, title: "Image Scanner", description: "OCR to solve questions from images", color: "accent", category: "files" },
  { id: "doc-analyzer", icon: <FileIcon className="h-5 w-5" />, title: "Doc Analyzer", description: "Analyze PDF, DOCX, and TXT files", color: "cyan", category: "files" },
  
  // Security Tools
  { id: "password", icon: <LockIcon className="h-5 w-5" />, title: "Password Analyzer", description: "Check password strength", color: "accent", category: "security" },
  { id: "code-check", icon: <CodeIcon className="h-5 w-5" />, title: "Code Checker", description: "Find vulnerabilities in code", color: "orange", category: "security" },
  { id: "cyber-tutor", icon: <ShieldIcon className="h-5 w-5" />, title: "Cyber Tutor", description: "Learn cybersecurity basics", color: "primary", category: "security" },
  { id: "bug-bounty", icon: <BugIcon className="h-5 w-5" />, title: "Bug Bounty Learn", description: "Bug bounty fundamentals", color: "pink", category: "security" },
]

interface ToolsScreenProps {
  onOpenTool: (toolId: string) => void
}

export function ToolsScreen({ onOpenTool }: ToolsScreenProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col gap-5 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI Tools</h1>
        <p className="mt-1 text-muted-foreground">Powerful AI tools for every study need</p>
      </div>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-border bg-input py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTools.map((tool) => (
          <ToolCard
            key={tool.id}
            icon={tool.icon}
            title={tool.title}
            description={tool.description}
            color={tool.color}
            onClick={() => onOpenTool(tool.id)}
          />
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No tools found matching your search.</p>
        </div>
      )}
    </div>
  )
}
