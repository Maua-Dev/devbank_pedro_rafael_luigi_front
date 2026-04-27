import { useState } from 'react'

interface LoginProps {
  onLogin: () => void
}

export function Login({ onLogin }: LoginProps) {
  const [tipo, setTipo] = useState('')
  const [agencia, setAgencia] = useState('')
  const [conta, setConta] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (agencia && conta) onLogin()
  }

  return (
    <main className="min-h-screen bg-[#0A0A0B] flex flex-col items-center justify-center p-6 text-white">
      <h1 className="text-6xl font-black mb-10 tracking-tighter">
        DEV <span className="text-purple-600">BANK</span>
      </h1>

      <div className="w-full max-w-sm bg-[#18181B] p-8 rounded-[32px] border border-white/5 shadow-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-zinc-500 text-xs font-bold uppercase ml-1">Tipo de conta</label>
            <input 
              type="text" 
              placeholder="Ex: Corrente"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-purple-600 transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-500 text-xs font-bold uppercase ml-1">Agência</label>
            <input 
              type="text" 
              placeholder="0000" 
              value={agencia}
              onChange={(e) => setAgencia(e.target.value)}
              className="bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-purple-600 transition-all" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-zinc-500 text-xs font-bold uppercase ml-1">Conta</label>
            <input 
              type="text" 
              placeholder="00000-0" 
              value={conta}
              onChange={(e) => setConta(e.target.value)}
              className="bg-zinc-900 border border-white/5 p-4 rounded-2xl outline-none focus:border-purple-600 transition-all" 
            />
          </div>
          
          <button type="submit" className="w-full mt-4 bg-purple-600 hover:bg-purple-700 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-purple-600/20">
            ENTRAR
          </button>
        </form>
      </div>
    </main>
  )
}