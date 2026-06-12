import { useState } from 'react'
import './Spinner.css'

const desafios = [
  'Mande um áudio dizendo eu te amo 🎙️',
  'Dá um beijo de 10 segundos 💋',
  'Fale 3 coisas que ama no outro 💜',
  'Recrie a primeira foto de vocês 📸',
  'Mande uma foto fazendo careta 😜',
  'Cante um trecho de uma musiica favorita 🎵',
  'Dá um abraço que dure 1 minuto 🤗',
  'Escreva uma coisa que nunca falou para o outro 💌',
  'Imite o outro por 30 segundos 🎭',
  'Faz um pedido de cinema para o outro 🎬',
  'Mande uma mensagem como se fosse o primeiro dia 🥹',
  'Escolhe o próximo rolê de vocês 📍',
]

export default function Spinner({ onBack }) {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)

  function spin() {
    if (spinning) return
    setSpinning(true)
    setResult(null)
    const extra = 1440 + Math.floor(Math.random() * 360)
    const newRotation = rotation + extra
    setRotation(newRotation)
    setTimeout(() => {
      const index = Math.floor((newRotation % 360) / (360 / desafios.length)) % desafios.length
      setResult(desafios[index])
      setSpinning(false)
    }, 3000)
  }

  return (
    <div className="spinner-container" translate="no">
      <button className="spinner-back" onClick={onBack}>← Voltar</button>

      <div className="spinner-header">
        <h2 className="spinner-title">Roleta Romântica</h2>
        <p className="spinner-sub">gira e cumpre o desafio 💜</p>
      </div>

      <div className="spinner-wheel-wrap">
        <div
          className="spinner-wheel"
          style={{ transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 1)' : 'none' }}
        >
          {desafios.map((_, i) => (
            <div
              key={i}
              className="spinner-slice"
              style={{ transform: `rotate(${(360 / desafios.length) * i}deg)` }}
            >
              <div className="spinner-slice-color" style={{ background: i % 2 === 0 ? 'rgba(196,30,58,0.6)' : 'rgba(106,13,173,0.6)' }} />
            </div>
          ))}
          <div className="spinner-center">💜</div>
        </div>
        <div className="spinner-arrow">▼</div>
      </div>

      <button className="spinner-btn" onClick={spin} disabled={spinning}>
        {spinning ? 'Girando...' : 'Girar!'}
      </button>

      {result && (
        <div className="spinner-result">
          <p className="spinner-result-label">Seu desafio:</p>
          <p className="spinner-result-text">{result}</p>
        </div>
      )}
    </div>
  )
}