import AppRouter from "./Routes/AppRouter"
import { AuthProvider } from "./Context/AuthContext"
import { TaskProvider } from "./Context/TaskContext"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
