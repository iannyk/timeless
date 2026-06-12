import { useState } from 'react'
import '@fontsource/dancing-script'
import './Quiz.css'

const questions = [
  {
    q: 'Qual é a comida favorita do casal?',
    options: ['Pizza', 'Poke', 'Sushi', 'Hambúrguer'],
    answer: 'Poke',
  },
  {
    q: 'Onde foi o primeiro lugar que tomamos milkshake?',
    options: ['Bob\'s', 'MrMix', 'BurgerKing', 'Milkmoo'],
    answer: 'MrMix',
  },
  {
    q: 'Qual foi nossa primeira música?',
    options: ['Mirrors', 'Timeless', 'Lover', 'Pra você'],
    answer: 'Timeless',
  },
  {
    q: 'Quem se apaixonou primeiro?',
    options: ['Ianny', 'Francisco'],
    answer: 'Ianny',
  },
  {
    q: 'Pra onde foi nossa primeira viagem?',
    options: ['Fortaleza', 'Recife', 'Natal', 'João Pessoa'],
    answer: 'Natal',
  },
  {
    q: 'O que mais gostamos de beber (alcoólico)?',
    options: ['Cerveja', 'Vinho', 'Cachaça', 'Vodka'],
    answer: 'Cachaça',
  },
  {
    q: 'Qual foi nosso primeiro apelido?',
    options: ['Carrapato e Peste', 'West e Swift', 'Cullen e Swan', 'Doninho e Doninha'],
    answer: 'West e Swift',
  },
  {
    q: 'Quem mais caga?',
    options: ['Ianny', 'Francisco'],
    answer: 'Ianny',
  },
  {
    q: 'Quem mais peida?',
    options: ['Ianny', 'Francisco'],
    answer: 'Francisco',
  },
  {
    q: 'Qual rolê que mais gostamos de fazer?',
    options: ['Praia', 'Show', 'Ir ao cinema', 'Jantar fora'],
    answer: 'Ir ao cinema',
  },
]

export default function Quiz({ onBack }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = questions[current]

  function handleAnswer(opt) {
    if (selected) return
    setSelected(opt)
    if (opt === q.answer) setScore(s => s + 1)
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(c => c + 1)
        setSelected(null)
      } else {
        setFinished(true)
      }
    }, 1000)
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) return (
    <div className="quiz-container" translate="no">
      <div className="quiz-result">
        <p className="quiz-result-emoji">{score >= 8 ? '🥹' : score >= 5 ? '😄' : '😅'}</p>
        <h2 className="quiz-result-title">
          {score >= 8 ? 'Você nos conhece demais!' : score >= 5 ? 'Quase lá!' : 'Precisa estudar mais!'}
        </h2>
        <p className="quiz-result-score">{score} de {questions.length} acertos</p>
        <button className="quiz-btn-restart" onClick={restart}>Tentar de novo</button>
        <button className="quiz-btn-back" onClick={onBack}>Voltar</button>
      </div>
    </div>
  )

  return (
    <div className="quiz-container" translate="no">
      <button className="quiz-back" onClick={onBack}>← Voltar</button>
      <div className="quiz-progress">
        <div className="quiz-progress-bar" style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>
      <p className="quiz-count">{current + 1} / {questions.length}</p>
      <h2 className="quiz-question">{q.q}</h2>
      <div className="quiz-options">
        {q.options.map(opt => (
          <button
            key={opt}
            className={`quiz-option
              ${selected === opt ? (opt === q.answer ? 'quiz-option--correct' : 'quiz-option--wrong') : ''}
              ${selected && opt === q.answer ? 'quiz-option--correct' : ''}
            `}
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}