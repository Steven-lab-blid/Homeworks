import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FileSystemProvider } from './context/FileSystemContext'; // Nuevo
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      {/* El FileSystemProvider va dentro del Auth para poder usar useAuth() en él */}
      <FileSystemProvider>
        <Router>
          <AppRoutes />
        </Router>
      </FileSystemProvider>
    </AuthProvider>
  );
}

export default App;