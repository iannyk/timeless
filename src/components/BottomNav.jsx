import './BottomNav.css'

const tabs = [
  { id: 'home', icon: '🏠', label: 'Início' },
  { id: 'memories', icon: '📸', label: 'Memórias' },
  { id: 'games', icon: '🎮', label: 'Jogos' },
  { id: 'diary', icon: '📓', label: 'Diário' },
  { id: 'voice', icon: '🎙️', label: 'Voz dela' },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`nav-btn ${active === t.id ? 'nav-btn--active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <span className="nav-icon">{t.icon}</span>
          <span className="nav-label">{t.label}</span>
        </button>
      ))}
    </nav>
  )
}