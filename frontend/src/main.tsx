import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CampusMarketApp } from "./CampusMarketApp";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode> {/* quitarlo en produccion */}
    <CampusMarketApp />
  </StrictMode>,
)
