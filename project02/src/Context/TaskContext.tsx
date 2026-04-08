import { createContext, useContext, useState } from "react"

export interface Task {
  id: string
  title: string
  done: boolean
}

interface TaskContextType {
  tasks: Task[]
  addTask: (title: string) => void
  deleteTask: (id: string) => void
  toggleTask: (id: string) => void
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false },
    ])
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    )
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) throw new Error("useTaskContext must be used inside provider")
  return context
}