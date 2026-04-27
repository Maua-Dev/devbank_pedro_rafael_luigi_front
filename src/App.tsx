import { useState } from 'react'
import { Login } from './pages/Login'

export default function App() {
  const [logado, setLogado] = useState(false)

  if (logado) {
    return (
      <main className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center">
        <h1 className="text-4xl font-black">DASHBOARD</h1>
      </main>
    )
  }

  return <Login onLogin={() => setLogado(true)} />
}