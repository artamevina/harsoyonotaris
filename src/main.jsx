import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'aos/dist/aos.css'
import AOS from 'aos'
import { useEffect } from 'react'

const InitAOS = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  }, [])
  return null
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InitAOS />
    <App />
  </React.StrictMode>
)