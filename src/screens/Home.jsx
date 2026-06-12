import { useEffect, useState, useRef } from 'react'
import '@fontsource/dancing-script'
import './Home.css'

const START_DATE = new Date('2025-06-08T00:00:00')

function calcTime() {
  const now = new Date()
  const diff = now - START_DATE
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))

  let d = new Date(START_DATE)
  let years = 0, months = 0

  while (true) {
    const next = new Date(d)
    next.setFullYear(next.getFullYear() + 1)
    if (next <= now) { years++; d = next } else break
  }
  while (true) {
    const next = new Date(d)
    next.setMonth(next.getMonth() + 1)
    if (next <= now) { months++; d = next } else break
  }

  const days = Math.floor((now - d) / (1000 * 60 * 60 * 24))
  const hours = String(now.getHours()).padStart(2, '0')
  const mins = String(now.getMinutes()).padStart(2, '0')
  const secs = String(now.getSeconds()).padStart(2, '0')

  return { years, months, days, hours, mins, secs, totalDays }
}

export default function Home() {
  const [time, setTime] = useState(calcTime())
  const [photo, setPhoto] = useState(() => localStorage.getItem('timeless_photo') || null)
  const fileRef = useRef()

  useEffect(() => {
    const t = setInterval(() => setTime(calcTime()), 1000)
    return () => clearInterval(t)
  }, [])

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      localStorage.setItem('timeless_photo', reader.result)
      setPhoto(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="container" translate="no">
     <div className="topbar">
  <span className="app-title">Timeless</span>
</div>

      <div className="couple-photo">
        {photo
          ? <img src={photo} alt="casal" className="casal-foto" />
          : <span className="initials">I <span className="initials-amp">&</span> F</span>
        }
      </div>

      <p className="juntos-label">JUNTOS HÁ</p>

      <div className="counter-grid">
        {[
          { num: time.years, lbl: 'ANO' },
          { num: time.months, lbl: 'MESES' },
          { num: time.days, lbl: 'DIAS' },
          { num: time.hours, lbl: 'HORAS' },
          { num: time.mins, lbl: 'MIN' },
          { num: time.secs, lbl: 'SEG' },
        ].map(({ num, lbl }) => (
          <div key={lbl} className="counter-card">
            <span className="num">{num}</span>
            <span className="lbl">{lbl}</span>
          </div>
        ))}
      </div>

      <p className="days-phrase">
        Isso são <strong>{time.totalDays}</strong> dias se escolhendo.
      </p>

      <div className="quote-box">
        <p className="quote-text">"We're gonna be timeless" 💜</p>
      </div>
    </div>
  )
}