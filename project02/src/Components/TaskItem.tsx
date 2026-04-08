import { useTaskContext } from "../Context/TaskContext"
import type { Task } from "../Context/TaskContext"

export default function TaskItem({ task }: { task: Task }) {
  const { deleteTask, toggleTask } = useTaskContext()

  return (
    <div>
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          textDecoration: task.done ? "line-through" : "none",
        }}
      >
        {task.title}
      </span>

      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  )
}