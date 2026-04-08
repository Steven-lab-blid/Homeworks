import { useTaskContext } from "../Context/TaskContext"
import TaskItem from "./TaskItem"

export default function TaskList() {
  const { tasks } = useTaskContext()

  return (
    <>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </>
  )
}