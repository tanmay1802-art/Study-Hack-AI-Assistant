"use client"

import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import {
  ChatIcon,
  PenIcon,
  CalculatorIcon,
  BrainIcon,
  SparklesIcon,
  BookOpenIcon,
  LightbulbIcon,
  ArrowRightIcon,
  CrownIcon,
} from "@/components/icons"

interface HomeScreenProps {
  onNavigateToTools: () => void
  onOpenTool: (toolId: string) => void
}

export function HomeScreen({ onNavigateToTools, onOpenTool }: HomeScreenProps) {
  const quickTools = [
    { id: "chat", icon: <ChatIcon className="h-5 w-5" />, title: "AI Chat", description: "Ask anything", color: "primary" },
    { id: "writer", icon: <PenIcon className="h-5 w-5" />, title: "AI Writer", description: "Write essays & more", color: "accent" },
    { id: "math", icon: <CalculatorIcon className="h-5 w-5" />, title: "Math Solver", description: "Solve equations", color: "orange" },
    { id: "homework", icon: <BookOpenIcon className="h-5 w-5" />, title: "Homework", description: "Get help", color: "cyan" },
  ]

  const studyTips = [
    "Use active recall to test yourself on what you have learned",
    "Take short breaks every 25 minutes using the Pomodoro technique",
    "Teach concepts to others to deepen your understanding",
  ]

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/10 p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
        
        <div className="relative">
          <div className="flex items-center gap-2 text-primary">
            <BrainIcon className="h-6 w-6" />
            <span className="text-sm font-semibold tracking-wide uppercase">AI Study Super App</span>
          </div>
          
          <h1 className="mt-3 text-2xl font-bold text-foreground text-balance">
            Your AI-Powered Learning Assistant
          </h1>
          
          <p className="mt-2 text-muted-foreground text-pretty">
            Study smarter with AI tools for writing, math, homework, and more.
          </p>
          
          <div className="mt-5 flex gap-3">
            <Button 
              onClick={() => onOpenTool("chat")}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <SparklesIcon className="h-4 w-4" />
              Start Chat
            </Button>
            <Button 
              variant="outline" 
              onClick={onNavigateToTools}
              className="gap-2 border-border text-foreground hover:bg-secondary"
            >
              Explore Tools
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Banner */}
      <button className="flex items-center gap-4 rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-4 text-left transition-all hover:border-yellow-500/50">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/20">
          <CrownIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground">Upgrade to Premium</p>
          <p className="text-sm text-muted-foreground">Unlimited AI usage, no ads</p>
        </div>
        <ArrowRightIcon className="h-5 w-5 text-yellow-400" />
      </button>

      {/* Quick Access Tools */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Quick Access</h2>
          <button 
            onClick={onNavigateToTools}
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {quickTools.map((tool) => (
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
      </section>

      {/* Daily Study Tips */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <LightbulbIcon className="h-5 w-5 text-yellow-400" />
          <h2 className="text-lg font-semibold text-foreground">Daily Study Tips</h2>
        </div>
        
        <div className="space-y-3">
          {studyTips.map((tip, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card/50 p-4"
            >
              <p className="text-sm text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
