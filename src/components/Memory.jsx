import { useState, useEffect } from 'react'
import './Memory.css'

const allPhotos = [
  'foto1.jpeg', 'foto2.jpeg', 'foto3.jpeg',
  'foto4.jpeg', 'foto5.jpeg', 'foto6.jpeg',
  'foto7.jpeg', 'foto8.jpeg', 'foto9.jpeg',
]

function shuffle(arr) {
  return [...arr, ...arr]
    .map((v, i) => ({ id: i, file: v, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5)
}

export default function Memory({ onBack }) {
  const [cards, setCards] = useState(shuffle(allPhotos))
  const [selected, setSelected] = useState([])
  const [moves, setMoves] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected
      if (cards[a].file === cards[b].file) {
        setCards(c => c.map((card, i) =>
          i === a || i === b ? { ...card, matched: true } : card
        ))
        setSelected([])
      } else {
        setTimeout(() => {
          setCards(c => c.map((card, i) =>
            i === a || i === b ? { ...card, flipped: false } : card
          ))
          setSelected([])
        }, 900)
      }
      setMoves(m => m + 1)
    }
  }, [selected])

  useEffect(() => {
    if (cards.every(c => c.matched)) setFinished(true)
  }, [cards])

  function handleFlip(i) {
    if (selected.length === 2) return
    if (cards[i].flipped || cards[i].matched) return
    setCards(c => c.map((card, j) => j === i ? { ...card, flipped: true } : card))
    setSelected(s => [...s, i])
  }

  function restart() {
    setCards(shuffle(allPhotos))
    setSelected([])
    setMoves(0)
    setFinished(false)
  }

  if (finished) return (
    <div className="memory-container" translate="no">
      <div className="memory-result">
        <p className="memory-result-emoji">🥹</p>
        <h2 className="memory-result-title">Você encontrou todos!</h2>
        <p className="memory-result-moves">{moves} jogadas</p>
        <button className="memory-btn-restart" onClick={restart}>Jogar de novo</button>
        <button className="memory-btn-back" onClick={onBack}>Voltar</button>
      </div>
    </div>
  )

  return (
    <div className="memory-container" translate="no">
      <button className="memory-back" onClick={onBack}>← Voltar</button>
      <div className="memory-header">
        <h2 className="memory-title">Jogo da Memória</h2>
        <p className="memory-moves">{moves} jogadas</p>
      </div>
      <div className="memory-grid">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={`memory-card ${card.flipped || card.matched ? 'memory-card--flipped' : ''} ${card.matched ? 'memory-card--matched' : ''}`}
            onClick={() => handleFlip(i)}
          >
            <div className="memory-card-inner">
              <div className="memory-card-back">❤️</div>
              <div className="memory-card-front">
                <img src={`/${card.file}`} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}