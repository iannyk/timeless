import { useEffect } from 'react'
import '@fontsource/dancing-script'
import './Splash.css'

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="splash-container">
      <p className="splash-title">Timeless</p>
      <p className="splash-quote">"We're gonna be timeless" 💜</p>
    </div>
  )
}