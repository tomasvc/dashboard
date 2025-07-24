"use client"

import * as React from "react"
import { CheckCircle, Circle, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/components/utils/cn"

export interface Task {
  id: string | number
  title: string
  assignedBy: string
  completed: boolean
}

interface MyTasksProps {
  /**
   * Optional initial task list. If omitted, a small demo list is rendered.
   */
  tasks?: Task[]
  className?: string
}

/**
 * A sophisticated yet self-contained to-do list component.
 *
 * Features:
 * • Add a task (via input + button or pressing <Enter>)
 * • Toggle completion state
 * • Remove tasks
 *
 * This component manages its own local state – integrate with your backend by
 * lifting the state and handling the callbacks if needed.
 */
export function MyTasks({ tasks, className }: MyTasksProps) {
  const [list, setList] = React.useState<Task[]>(
    tasks ?? [
      { id: 1, title: "Finish the dashboard UI", assignedBy: "John Doe", completed: false },
      { id: 2, title: "Plan sprint retrospective", assignedBy: "Jane Doe", completed: true },
      { id: 3, title: "Review pull request #42", assignedBy: "John Doe", completed: false },
    ]
  )

  const [input, setInput] = React.useState("")

  const addTask = () => {
    const title = input.trim()
    if (!title) return
    setList((prev) => [
      ...prev,
      { id: Date.now(), title, assignedBy: "John Doe", completed: false },
    ])
    setInput("")
  }

  const toggleTask = (id: Task["id"]) => {
    setList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: Task["id"]) => {
    setList((prev) => prev.filter((task) => task.id !== id))
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  }

  return (
    <Card className={cn(className)}>
      <CardHeader className="gap-1.5">
        <CardTitle>My Tasks</CardTitle>
        {list.length > 0 && (
          <CardDescription>
            {list.filter((t) => t.completed).length} of {list.length} completed
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {/* Task input */}
        <div className="flex items-center gap-2 border-b px-6 py-4">
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button
            size="icon"
            variant="secondary"
            onClick={addTask}
            disabled={!input.trim()}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        {/* Task list */}
        <ul className="divide-border divide-y">
          {list.map((task) => (
            <li
              key={task.id}
              className="group flex items-center gap-3 px-6 py-3"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="text-muted-foreground hover:text-primary flex size-6 items-center justify-center rounded-md transition-colors"
              >
                {task.completed ? <CheckCircle className="size-5" /> : <Circle className="size-5" />}
              </button>
              <span
                className={cn(
                  "flex-1 text-sm",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </span>
              <span className="text-muted-foreground text-xs">
                Assigned by {task.assignedBy}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-muted-foreground hover:text-destructive invisible group-hover:visible flex size-6 items-center justify-center rounded-md transition-colors"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
} 