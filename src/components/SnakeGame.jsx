import { useState, useEffect, useCallback, useRef } from 'react'
import './SnakeGame.css'

const COLS = 20
const ROWS = 20
const CELL = 16

const DIR = { UP: [0,-1], DOWN: [0,1], LEFT: [-1,0], RIGHT: [1,0] }

function rand() {
  return [Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)]
}

const IANNY_SVG = `
<svg viewBox="0 0 140 210" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="0" width="100" height="10" fill="#2a0a00"/>
  <rect x="10" y="10" width="120" height="10" fill="#2a0a00"/>
  <rect x="0"  y="20" width="140" height="10" fill="#2a0a00"/>
  <rect x="0"  y="30" width="50"  height="10" fill="#2a0a00"/>
  <rect x="90" y="30" width="50"  height="10" fill="#2a0a00"/>
  <rect x="10" y="30" width="120" height="80" fill="#c68642"/>
  <rect x="30" y="50" width="20" height="15" fill="#1a0a00"/>
  <rect x="90" y="50" width="20" height="15" fill="#1a0a00"/>
  <rect x="35" y="52" width="5" height="5" fill="#fff"/>
  <rect x="95" y="52" width="5" height="5" fill="#fff"/>
  <rect x="65" y="75" width="10" height="5" fill="#b5703a"/>
  <rect x="45" y="88" width="50" height="8" fill="#c0392b"/>
  <rect x="48" y="90" width="44" height="5" fill="#fff"/>
  <rect x="0"  y="30" width="10" height="90" fill="#2a0a00"/>
  <rect x="130" y="30" width="10" height="90" fill="#2a0a00"/>
  <rect x="0"   y="110" width="10"  height="120" fill="#2a0a00"/>
  <rect x="130" y="110" width="10"  height="120" fill="#2a0a00"/>
  <rect x="55" y="110" width="30" height="20" fill="#c68642"/>
  <rect x="10" y="130" width="120" height="80" fill="#1a1a1a"/>
  <rect x="5"  y="75" width="5" height="5" fill="#FFD700"/>
  <rect x="130" y="75" width="5" height="5" fill="#FFD700"/>
  <rect x="40" y="125" width="60" height="5" fill="#FFD700"/>
</svg>`

export default function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState([[10,10],[9,10],[8,10]])
  const [food, setFood] = useState([15,10])
  const [dir, setDir] = useState(DIR.RIGHT)
  const [running, setRunning] = useState(false)
  const [won, setWon] = useState(false)
  const [dead, setDead] = useState(false)
  const [score, setScore] = useState(0)
  const dirRef = useRef(DIR.RIGHT)

  function restart() {
    setSnake([[10,10],[9,10],[8,10]])
    setFood(rand())
    setDir(DIR.RIGHT)
    dirRef.current = DIR.RIGHT
    setRunning(false)
    setWon(false)
    setDead(false)
    setScore(0)
  }

  useEffect(() => {
    function onKey(e) {
      const map = {
        ArrowUp: DIR.UP, ArrowDown: DIR.DOWN,
        ArrowLeft: DIR.LEFT, ArrowRight: DIR.RIGHT
      }
      if (map[e.key]) {
        e.preventDefault()
        dirRef.current = map[e.key]
        setRunning(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!running || won || dead) return
    const interval = setInterval(() => {
      setSnake(prev => {
        const [dx, dy] = dirRef.current
        const head = [prev[0][0] + dx, prev[0][1] + dy]
        if (head[0] < 0 || head[0] >= COLS || head[1] < 0 || head[1] >= ROWS) {
          setDead(true); setRunning(false); return prev
        }
        if (prev.some(([x,y]) => x === head[0] && y === head[1])) {
          setDead(true); setRunning(false); return prev
        }
        let newSnake
        if (head[0] === food[0] && head[1] === food[1]) {
          newSnake = [head, ...prev]
          setScore(s => {
            const ns = s + 1
            if (ns >= 10) { setWon(true); setRunning(false) }
            return ns
          })
          setFood(rand())
        } else {
          newSnake = [head, ...prev.slice(0, -1)]
        }
        return newSnake
      })
    }, 150)
    return () => clearInterval(interval)
  }, [running, won, dead, food])

  function swipe(d) { dirRef.current = d; setRunning(true) }

  if (won) return (
    <div className="snake-container" translate="no">
      <div className="snake-result">
        <div className="snake-ianny" dangerouslySetInnerHTML={{ __html: IANNY_SVG }} />
        <p className="snake-won-title">Você me salvou! 🥹</p>
        <p className="snake-won-msg">Te amo meu super herói</p>
        <p className="snake-won-score">{score} pontos</p>
        <button className="snake-btn-restart" onClick={restart}>Jogar de novo</button>
        <button className="snake-btn-back" onClick={onBack}>Voltar</button>
      </div>
    </div>
  )

  if (dead) return (
    <div className="snake-container" translate="no">
      <div className="snake-result">
        <p style={{ fontSize: 64 }}>😢</p>
        <p className="snake-won-title">Não conseguiu me salvar!</p>
        <p className="snake-won-msg">Tenta de novo, eu acredito em você! 💜</p>
        <button className="snake-btn-restart" onClick={restart}>Tentar de novo</button>
        <button className="snake-btn-back" onClick={onBack}>Voltar</button>
      </div>
    </div>
  )

  return (
    <div className="snake-container" translate="no">
      <button className="snake-back" onClick={onBack}>← Voltar</button>
      <div className="snake-header">
        <h2 className="snake-title">Salva Ianny!</h2>
        <p className="snake-score">❤️ {score}/10</p>
      </div>

      <p className="snake-hint">{running ? '' : 'Use as setas ou os botões abaixo'}</p>

      <div className="snake-board">
        {Array.from({ length: ROWS }).map((_, y) =>
          Array.from({ length: COLS }).map((_, x) => {
            const isHead = snake[0][0] === x && snake[0][1] === y
            const isBody = snake.slice(1).some(([sx,sy]) => sx === x && sy === y)
            const isFood = food[0] === x && food[1] === y
        return (
      <div
        key={`${x}-${y}`}
        className={`snake-cell ${isHead ? 'snake-head' : ''} ${isBody ? 'snake-body' : ''}`}
    >
        {isFood && (
        <div className="snake-food-pixel" dangerouslySetInnerHTML={{ __html: IANNY_SVG }} />
                )}
            </div>
            )
          })
        )}
      </div>

      <div className="snake-controls">
        <div className="snake-controls-row">
          <button className="snake-ctrl" onClick={() => swipe(DIR.UP)}>▲</button>
        </div>
        <div className="snake-controls-row">
          <button className="snake-ctrl" onClick={() => swipe(DIR.LEFT)}>◀</button>
          <button className="snake-ctrl" onClick={() => swipe(DIR.DOWN)}>▼</button>
          <button className="snake-ctrl" onClick={() => swipe(DIR.RIGHT)}>▶</button>
        </div>
      </div>
    </div>
  )
}