import TaskForm from "../Components/Taskform"
import TaskList from "../Components/TaskList"
import { useAuth } from "../Hooks/useAuth"

export default function Dashboard() {
  const { logout } = useAuth()

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <TaskForm />
      <TaskList />
    </div>
  )
}