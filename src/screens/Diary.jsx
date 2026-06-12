import { useState, useEffect } from 'react'
import '@fontsource/dancing-script'
import './Diary.css'

const STORAGE_PIN = 'timeless_pin'
const STORAGE_ENTRIES = 'timeless_entries'

const moods = ['😊','😌','😢','😰','🙏']

export default function Diary() {
  const [pin, setPin] = useState(() => localStorage.getItem(STORAGE_PIN) || '')
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [creating, setCreating] = useState(false)
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem(STORAGE_ENTRIES) || '[]'))
  const [view, setView] = useState('list')
  const [current, setCurrent] = useState({ text: '', mood: '😊' })
  const [error, setError] = useState('')

  function handlePinSubmit(digit) {
    const next = input + digit
    setInput(next)
    if (next.length === 4) {
      if (!pin) {
        localStorage.setItem(STORAGE_PIN, next)
        setPin(next)
        setUnlocked(true)
      } else if (next === pin) {
        setUnlocked(true)
      } else {
        setError('PIN incorreto')
        setTimeout(() => { setInput(''); setError('') }, 800)
      }
    }
  }

  function saveEntry() {
    if (!current.text.trim()) return
    const entry = {
      id: Date.now(),
      text: current.text,
      mood: current.mood,
      date: new Date().toLocaleDateString('pt-BR'),
    }
    const updated = [entry, ...entries]
    setEntries(updated)
    localStorage.setItem(STORAGE_ENTRIES, JSON.stringify(updated))
    setCurrent({ text: '', mood: '😊' })
    setView('list')
  }

  function deleteEntry(id) {
    const updated = entries.filter(e => e.id !== id)
    setEntries(updated)
    localStorage.setItem(STORAGE_ENTRIES, JSON.stringify(updated))
  }

  if (!unlocked) return (
    <div className="diary-container" translate="no">
      <div className="diary-lock">
        <p className="diary-lock-title">{pin ? 'Digite seu PIN' : 'Crie seu PIN'}</p>
        <p className="diary-lock-sub">{pin ? 'Diário privado' : 'Escolha 4 dígitos'}</p>
        <div className="diary-dots">
          {[0,1,2,3].map(i => (
            <div key={i} className={`diary-dot ${input.length > i ? 'diary-dot--filled' : ''}`} />
          ))}
        </div>
        {error && <p className="diary-error">{error}</p>}
        <div className="diary-keypad">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
            <button
              key={i}
              className={`diary-key ${d === '' ? 'diary-key--empty' : ''}`}
              onClick={() => {
                if (d === '⌫') setInput(p => p.slice(0,-1))
                else if (d !== '') handlePinSubmit(String(d))
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  if (view === 'new') return (
    <div className="diary-container" translate="no">
      <button className="diary-back" onClick={() => setView('list')}>← Voltar</button>
      <h2 className="diary-title">Nova entrada</h2>
      <p className="diary-mood-label">Como você está?</p>
      <div className="diary-moods">
        {moods.map(m => (
          <button
            key={m}
            className={`diary-mood-btn ${current.mood === m ? 'diary-mood-btn--active' : ''}`}
            onClick={() => setCurrent(c => ({ ...c, mood: m }))}
          >
            {m}
          </button>
        ))}
      </div>
      <textarea
        className="diary-textarea"
        placeholder="Escreve aqui..."
        value={current.text}
        onChange={e => setCurrent(c => ({ ...c, text: e.target.value }))}
      />
      <button className="diary-save-btn" onClick={saveEntry}>Salvar</button>
    </div>
  )

  return (
    <div className="diary-container" translate="no">
      <h2 className="diary-title">Diário</h2>
      <div className="diary-pinned">
        <p className="diary-pinned-text">"Esse espaço é seu. Pode ser honesto aqui. Te amo. 💜"</p>
      </div>
      <button className="diary-new-btn" onClick={() => setView('new')}>+ Nova entrada</button>
      <div className="diary-entries">
        {entries.length === 0 && (
          <p className="diary-empty">Nenhuma entrada ainda. Escreve o que sentir. 💜</p>
        )}
        {entries.map(e => (
          <div key={e.id} className="diary-entry">
            <div className="diary-entry-header">
              <span className="diary-entry-mood">{e.mood}</span>
              <span className="diary-entry-date">{e.date}</span>
              <button className="diary-entry-delete" onClick={() => deleteEntry(e.id)}>✕</button>
            </div>
            <p className="diary-entry-text">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}