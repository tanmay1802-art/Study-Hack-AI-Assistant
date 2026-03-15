"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ToolCardProps {
  icon: ReactNode
  title: string
  description: string
  color?: string
  onClick?: () => void
  className?: string
}

export function ToolCard({ icon, title, description, color = "primary", onClick, className }: ToolCardProps) {
  const colorClasses: Record<string, string> = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary/20",
    accent: "bg-accent/10 text-accent group-hover:bg-accent/20",
    orange: "bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20",
    pink: "bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20",
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex w-full flex-col gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/50 hover:bg-card/80 focus:outline-none focus:ring-2 focus:ring-primary/50",
        className
      )}
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg transition-colors", colorClasses[color])}>
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </button>
  )
}
