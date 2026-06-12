import { useState } from 'react'
import '@fontsource/dancing-script'
import './Games.css'
import Quiz from '../components/Quiz'
import Memory from '../components/Memory'
import Spinner from '../components/Spinner'
import SnakeGame from '../components/SnakeGame'

export default function Games() {
  const [activeGame, setActiveGame] = useState(null)

  if (activeGame === 'quiz') return <Quiz onBack={() => setActiveGame(null)} />
  if (activeGame === 'memory') return <Memory onBack={() => setActiveGame(null)} />
  if (activeGame === 'spinner') return <Spinner onBack={() => setActiveGame(null)} />
  if (activeGame === 'snake') return <SnakeGame onBack={() => setActiveGame(null)} />

  return (
    <div className="games-container" translate="no">
      <div className="games-header">
        <h1 className="games-title">Joguinhos</h1>
        <p className="games-sub">só nós dois sabemos</p>
      </div>

      <div className="games-grid">
        <button className="game-card" onClick={() => setActiveGame('quiz')}>
          <span className="game-icon">🧠</span>
          <span className="game-name">Quiz do Relacionamento</span>
          <span className="game-desc">Quanto você sabe sobre nós?</span>
        </button>
        <button className="game-card" onClick={() => setActiveGame('memory')}>
          <span className="game-icon">🃏</span>
          <span className="game-name">Jogo da Memória</span>
          <span className="game-desc">Encontre os pares</span>
        </button>
        <button className="game-card" onClick={() => setActiveGame('spinner')}>
            <span className="game-icon">🎡</span>
            <span className="game-name">Roleta Romântica</span>
            <span className="game-desc">Gira e cumpre o desafio</span>
        </button>
       <button className="game-card" onClick={() => setActiveGame('snake')}>
            <span className="game-icon">🐍</span>
            <span className="game-name">Salva Ianny!</span>
            <span className="game-desc">Me salva, herói!</span>
        </button>
      </div>
    </div>
  )
}