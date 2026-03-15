"use client"

import { cn } from "@/lib/utils"
import { HomeIcon, SparklesIcon, CalendarIcon, FolderIcon, UserIcon } from "@/components/icons"

type TabName = "home" | "tools" | "planner" | "files" | "profile"

interface BottomNavProps {
  activeTab: TabName
  onTabChange: (tab: TabName) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as const, label: "Home", icon: HomeIcon },
    { id: "tools" as const, label: "AI Tools", icon: SparklesIcon },
    { id: "planner" as const, label: "Planner", icon: CalendarIcon },
    { id: "files" as const, label: "Files", icon: FolderIcon },
    { id: "profile" as const, label: "Profile", icon: UserIcon },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-3 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_var(--primary)]")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
