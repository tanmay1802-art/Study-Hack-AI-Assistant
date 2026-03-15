"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CalculatorIcon,
  SparklesIcon,
  CopyIcon,
} from "@/components/icons"

const mathTypes = [
  { id: "algebra", label: "Algebra" },
  { id: "equations", label: "Equations" },
  { id: "calculus", label: "Calculus" },
  { id: "geometry", label: "Geometry" },
  { id: "statistics", label: "Statistics" },
]

interface MathSolverProps {
  onBack: () => void
}

export function MathSolver({ onBack }: MathSolverProps) {
  const [problem, setProblem] = useState("")
  const [mathType, setMathType] = useState("algebra")
  const [solution, setSolution] = useState("")
  const [isSolving, setIsSolving] = useState(false)

  const handleSolve = () => {
    if (!problem.trim()) return

    setIsSolving(true)

    setTimeout(() => {
      const sampleSolution = `## Problem Analysis

**Given problem:** ${problem}

**Problem type:** ${mathType.charAt(0).toUpperCase() + mathType.slice(1)}

---

## Step-by-Step Solution

### Step 1: Identify the variables and given information
First, let's identify what we know and what we need to find.

• **Known values:** Extract from the problem statement
• **Unknown values:** What we need to solve for
• **Relationships:** Any equations or formulas that apply

### Step 2: Set up the equation
Based on the problem type, we apply the relevant mathematical principles:

For ${mathType}:
\`\`\`
Let x = the unknown value
Set up the equation based on the given conditions
\`\`\`

### Step 3: Solve the equation
Applying algebraic operations:

\`\`\`
Step 3.1: Simplify both sides
Step 3.2: Isolate the variable
Step 3.3: Solve for the unknown
\`\`\`

### Step 4: Verify the solution
Substitute the answer back into the original equation to verify:

\`\`\`
Verification: LHS = RHS ✓
\`\`\`

---

## Final Answer

**Solution: x = 42** (example)

The answer satisfies all conditions of the original problem.

---

### Key Concepts Used:
1. ${mathType === "algebra" ? "Algebraic manipulation" : mathType === "calculus" ? "Differentiation/Integration" : mathType === "geometry" ? "Geometric formulas" : mathType === "statistics" ? "Statistical methods" : "Equation solving"}
2. Problem-solving strategies
3. Verification techniques

*Need more help? Try rephrasing the problem or ask for clarification on any step.*`

      setSolution(sampleSolution)
      setIsSolving(false)
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(solution)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
          <CalculatorIcon className="h-5 w-5 text-orange-400" />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-foreground">Math Solver</h2>
          <p className="text-sm text-muted-foreground">Solve any math problem step by step</p>
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

      {/* Math Type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Problem Type</label>
        <div className="flex flex-wrap gap-2">
          {mathTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setMathType(type.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                mathType === type.id
                  ? "bg-orange-500 text-white"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Input */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">Enter your problem</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          placeholder="Type or paste your math problem here...

Examples:
• Solve for x: 2x + 5 = 15
• Find the derivative of f(x) = x² + 3x
• Calculate the area of a circle with radius 5"
          className="h-32 w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {/* Solve Button */}
      <Button
        onClick={handleSolve}
        disabled={!problem.trim() || isSolving}
        className="w-full gap-2 bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {isSolving ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Solving...
          </>
        ) : (
          <>
            <SparklesIcon className="h-4 w-4" />
            Solve Problem
          </>
        )}
      </Button>

      {/* Solution */}
      {solution && (
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-foreground">Solution</h3>
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
            <pre className="whitespace-pre-wrap font-sans">{solution}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
