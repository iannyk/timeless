import '@fontsource/dancing-script'
import './Memories.css'

const memories = [
  { id: 1, file: 'foto1.jpeg', caption: 'O dia do pedido', date: '08/06/2025' },
  { id: 2, file: 'foto2.jpeg', caption: 'Nossa primeira festa juntos', date: '22/06/2025' },
  { id: 3, file: 'foto3.jpeg', caption: 'Primeiro show de rock juntos', date: '16/08/2025' },
  { id: 4, file: 'foto4.jpeg', caption: 'Cineminha', date: '07/09/2025' },
  { id: 5, file: 'foto5.jpeg', caption: 'Primeira viagem juntos', date: '27/10/2025' },
  { id: 6, file: 'foto6.jpeg', caption: 'Primeiro natal juntos', date: '25/12/2025' },
  { id: 7, file: 'foto7.jpeg', caption: 'Primeiro ano novo juntos', date: '31/12/2025' },
  { id: 8, file: 'foto8.jpeg', caption: 'Mais uma viagem', date: '09/02/202' },
  { id: 9, file: 'foto9.jpeg', caption: 'A comida que mais comemos juntos', date: '09/05/2025' },
]

export default function Memories() {
  return (
    <div className="memories-container" translate="no">
      <div className="memories-header">
        <h1 className="memories-title">Nossas Memórias</h1>
        <p className="memories-sub">momentos que guardo no coração</p>
      </div>

      <div className="polaroid-grid">
        {memories.map((m, i) => (
          <div key={m.id} className={`polaroid polaroid--${i % 2 === 0 ? 'left' : 'right'}`}>
            <div className="polaroid-photo">
              <img src={`/${m.file}`} alt={m.caption} />
            </div>
            <p className="polaroid-caption">{m.caption}</p>
            <p className="polaroid-date">{m.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}