import { useState } from 'react'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  const [usuario, setUsuario] = useState<any>(() => {
    const salvo = localStorage.getItem('@DevBank:usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  const entrar = (dados: any) => {
    localStorage.setItem('@DevBank:usuario', JSON.stringify(dados))
    setUsuario(dados)
  }

  if (usuario) {
    return <Dashboard userData={usuario} />
  }

  return <Login onLogin={entrar} />
}