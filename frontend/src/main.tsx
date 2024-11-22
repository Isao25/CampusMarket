import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EzCommercerApp } from "./EzCommercerApp";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode> {/* quitarlo en produccion */}
    <EzCommercerApp />
  </StrictMode>,
)
