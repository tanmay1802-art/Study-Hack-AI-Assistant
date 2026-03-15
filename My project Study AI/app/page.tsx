"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { HomeScreen } from "@/components/screens/home-screen"
import { ToolsScreen } from "@/components/screens/tools-screen"
import { PlannerScreen } from "@/components/screens/planner-screen"
import { FilesScreen } from "@/components/screens/files-screen"
import { ProfileScreen } from "@/components/screens/profile-screen"
import { ToolRouter } from "@/components/tools/tool-router"
import { BrainIcon, MenuIcon, XIcon } from "@/components/icons"

type TabName = "home" | "tools" | "planner" | "files" | "profile"

export default function AIStudySuperApp() {
  const [activeTab, setActiveTab] = useState<TabName>("home")
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleOpenTool = (toolId: string) => {
    setActiveTool(toolId)
  }

  const handleCloseTool = () => {
    setActiveTool(null)
  }

  const handleNavigateToTools = () => {
    setActiveTab("tools")
  }

  const renderScreen = () => {
    if (activeTool) {
      return <ToolRouter toolId={activeTool} onBack={handleCloseTool} />
    }

    switch (activeTab) {
      case "home":
        return <HomeScreen onNavigateToTools={handleNavigateToTools} onOpenTool={handleOpenTool} />
      case "tools":
        return <ToolsScreen onOpenTool={handleOpenTool} />
      case "planner":
        return <PlannerScreen />
      case "files":
        return <FilesScreen onOpenTool={handleOpenTool} />
      case "profile":
        return <ProfileScreen />
      default:
        return <HomeScreen onNavigateToTools={handleNavigateToTools} onOpenTool={handleOpenTool} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
              <BrainIcon className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground">AI Study</span>
          </div>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-b border-border bg-card px-4 py-4 shadow-lg">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => { setActiveTab("home"); setActiveTool(null); setMenuOpen(false) }}
                className="rounded-lg px-4 py-2 text-left text-foreground transition-colors hover:bg-secondary"
              >
                Home
              </button>
              <button
                onClick={() => { setActiveTab("tools"); setActiveTool(null); setMenuOpen(false) }}
                className="rounded-lg px-4 py-2 text-left text-foreground transition-colors hover:bg-secondary"
              >
                AI Tools
              </button>
              <button
                onClick={() => { setActiveTab("planner"); setActiveTool(null); setMenuOpen(false) }}
                className="rounded-lg px-4 py-2 text-left text-foreground transition-colors hover:bg-secondary"
              >
                Study Planner
              </button>
              <button
                onClick={() => { setActiveTab("files"); setActiveTool(null); setMenuOpen(false) }}
                className="rounded-lg px-4 py-2 text-left text-foreground transition-colors hover:bg-secondary"
              >
                Files
              </button>
              <button
                onClick={() => { setActiveTab("profile"); setActiveTool(null); setMenuOpen(false) }}
                className="rounded-lg px-4 py-2 text-left text-foreground transition-colors hover:bg-secondary"
              >
                Profile
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-lg px-4 py-6 pb-24">
        {renderScreen()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav 
        activeTab={activeTab} 
        onTabChange={(tab) => {
          setActiveTab(tab)
          setActiveTool(null)
        }} 
      />
    </div>
  )
}
