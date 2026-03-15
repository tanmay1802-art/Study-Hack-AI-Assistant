"use client"

import { Button } from "@/components/ui/button"
import {
  UserIcon,
  CrownIcon,
  SettingsIcon,
  ClockIcon,
  SparklesIcon,
  ChevronRightIcon,
  BrainIcon,
} from "@/components/icons"

const usageHistory = [
  { tool: "AI Chat", count: 24, icon: <SparklesIcon className="h-4 w-4" /> },
  { tool: "Math Solver", count: 18, icon: <SparklesIcon className="h-4 w-4" /> },
  { tool: "AI Writer", count: 12, icon: <SparklesIcon className="h-4 w-4" /> },
  { tool: "Summarizer", count: 8, icon: <SparklesIcon className="h-4 w-4" /> },
]

const menuItems = [
  { label: "Account Settings", icon: <SettingsIcon className="h-5 w-5" /> },
  { label: "Usage History", icon: <ClockIcon className="h-5 w-5" /> },
  { label: "Favorite Tools", icon: <SparklesIcon className="h-5 w-5" /> },
  { label: "Help & Support", icon: <BrainIcon className="h-5 w-5" /> },
]

export function ProfileScreen() {
  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
          <UserIcon className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-foreground">Student User</h2>
        <p className="text-muted-foreground">student@email.com</p>
        
        <div className="mt-4 flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
          <SparklesIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Free Plan</span>
        </div>
      </div>

      {/* Premium Upgrade */}
      <div className="rounded-xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/20">
            <CrownIcon className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">Upgrade to Premium</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Get unlimited AI usage, no ads, and priority response speed
            </p>
            <Button className="mt-3 bg-yellow-500 text-yellow-950 hover:bg-yellow-400">
              Get Premium
            </Button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-foreground">This Week</h3>
        <div className="grid grid-cols-2 gap-3">
          {usageHistory.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                {item.icon}
                <span className="text-sm">{item.tool}</span>
              </div>
              <p className="mt-2 text-2xl font-bold text-foreground">{item.count}</p>
              <p className="text-xs text-muted-foreground">uses</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Items */}
      <section>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Settings</h3>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                {item.icon}
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRightIcon className="h-5 w-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      {/* Sign Out */}
      <Button
        variant="outline"
        className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
      >
        Sign Out
      </Button>
    </div>
  )
}
