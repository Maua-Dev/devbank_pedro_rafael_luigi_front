import { useState } from 'react'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'

export default function App() {
  const [user, setUser] = useState<any>(null)

  if (user) {
    return <Dashboard userData={user} />
  }

  return <Login onLogin={(data) => setUser(data)} />
}