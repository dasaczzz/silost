import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Silost } from './Silost'
import { Navbar } from './componentes/genericos/Navbar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <Silost />
  </StrictMode>
)
