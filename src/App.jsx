import { useState } from 'react'
import Home from './screens/Home'
import Memories from './screens/Memories'
import Games from './screens/Games'
import Diary from './screens/Diary'
import Splash from './screens/Splash'
import BottomNav from './components/BottomNav'

export default function App() {
  const [ready, setReady] = useState(false)
  const [tab, setTab] = useState('home')

  if (!ready) return <Splash onDone={() => setReady(true)} />

  return (
    <>
      {tab === 'home' && <Home />}
      {tab === 'memories' && <Memories />}
      {tab === 'games' && <Games />}
      {tab === 'diary' && <Diary />}
      {tab === 'voice' && <div style={{ color: '#fff', padding: 40 }}>Voz dela em breve 🎙️</div>}
      <BottomNav active={tab} onChange={setTab} />
    </>
  )
}