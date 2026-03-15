"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  TimerIcon,
  CheckCircleIcon,
  BarChartIcon,
  XIcon,
} from "@/components/icons"

interface Task {
  id: string
  title: string
  subject: string
  completed: boolean
  duration: number
}

const initialTasks: Task[] = [
  { id: "1", title: "Complete Math Assignment", subject: "Mathematics", completed: false, duration: 45 },
  { id: "2", title: "Read Chapter 5", subject: "History", completed: true, duration: 30 },
  { id: "3", title: "Practice Essay Writing", subject: "English", completed: false, duration: 60 },
  { id: "4", title: "Review Science Notes", subject: "Science", completed: false, duration: 25 },
]

export function PlannerScreen() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [pomodoroActive, setPomodoroActive] = useState(false)
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskSubject, setNewTaskSubject] = useState("")
  const [showAddTask, setShowAddTask] = useState(false)

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalStudyTime = tasks.reduce((acc, t) => acc + t.duration, 0)

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const addTask = () => {
    if (newTaskTitle.trim() && newTaskSubject.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTaskTitle,
          subject: newTaskSubject,
          completed: false,
          duration: 30,
        },
      ])
      setNewTaskTitle("")
      setNewTaskSubject("")
      setShowAddTask(false)
    }
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Study Planner</h1>
        <p className="mt-1 text-muted-foreground">Organize your study schedule</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex justify-center">
            <CalendarIcon className="h-5 w-5 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{tasks.length}</p>
          <p className="text-xs text-muted-foreground">Tasks</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-5 w-5 text-accent" />
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{completedTasks}</p>
          <p className="text-xs text-muted-foreground">Done</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <div className="flex justify-center">
            <BarChartIcon className="h-5 w-5 text-orange-400" />
          </div>
          <p className="mt-2 text-2xl font-bold text-foreground">{totalStudyTime}</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
      </div>

      {/* Pomodoro Timer */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <TimerIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Pomodoro Timer</h3>
              <p className="text-sm text-muted-foreground">25 min focus sessions</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground tabular-nums">{formatTime(pomodoroTime)}</p>
        </div>
        <div className="mt-4 flex gap-3">
          <Button
            onClick={() => setPomodoroActive(!pomodoroActive)}
            className={cn(
              "flex-1",
              pomodoroActive
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            {pomodoroActive ? "Pause" : "Start Focus"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setPomodoroTime(25 * 60)}
            className="border-border text-foreground hover:bg-secondary"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Task List */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{"Today's Tasks"}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddTask(true)}
            className="border-border text-foreground hover:bg-secondary"
          >
            Add Task
          </Button>
        </div>

        {/* Add Task Form */}
        {showAddTask && (
          <div className="mb-4 rounded-xl border border-primary/50 bg-card p-4">
            <input
              type="text"
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="mb-3 w-full rounded-lg border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject..."
              value={newTaskSubject}
              onChange={(e) => setNewTaskSubject(e.target.value)}
              className="mb-3 w-full rounded-lg border border-border bg-input px-3 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <div className="flex gap-2">
              <Button onClick={addTask} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Add
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddTask(false)}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all",
                task.completed && "opacity-60"
              )}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  task.completed
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-muted-foreground hover:border-primary"
                )}
              >
                {task.completed && <CheckCircleIcon className="h-4 w-4" />}
              </button>
              <div className="flex-1">
                <p className={cn("font-medium text-foreground", task.completed && "line-through")}>
                  {task.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {task.subject} • {task.duration} min
                </p>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
