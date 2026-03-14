import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Libreria from './Pilas/Libreria.tsx'
import Cajero from './Colas/Cajero.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Libreria />
    <Cajero />
  </StrictMode>,
)
