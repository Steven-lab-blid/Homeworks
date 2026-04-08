import { useState } from "react"
import { useTaskContext } from "../Context/TaskContext"

export default function TaskForm() {
  const [title, setTitle] = useState("")
  const { addTask } = useTaskContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return
    addTask(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Agregar</button>
    </form>
  )
}