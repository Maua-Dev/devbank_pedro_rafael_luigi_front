import { useState } from 'react'
import axios from 'axios'

interface Transaction {
  id: number;
  tipo: string;
  valor: number;
  data: string;
}

interface DashboardProps {
  userData: {
    nome: string;
    agencia: string;
    conta: string;
    saldo: number;
    transacoes?: Transaction[];
  }
}

export function Dashboard({ userData }: DashboardProps) {
  const [view, setView] = useState<'menu' | 'depositar' | 'retirar'>('menu')
  const [balance, setBalance] = useState(userData.saldo)
  const [transactions, setTransactions] = useState<Transaction[]>(userData.transacoes || [])
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    2: 0, 5: 0, 10: 0, 20: 0, 50: 0, 100: 0, 200: 0
  })

  const bills = [2, 5, 10, 20, 50, 100, 200]
  const totalOperation = Object.entries(quantities).reduce((acc, [bill, qtt]) => acc + Number(bill) * qtt, 0)
  const finalBalance = view === 'depositar' ? balance + totalOperation : balance - totalOperation

  const handleConfirm = async () => {
    try {
      const response = await axios.put('http://localhost:3000/api/v1/update-balance', {
        conta: userData.conta,
        novoSaldo: finalBalance,
        tipoOperacao: view.toUpperCase(),
        valor: totalOperation
      })

      setBalance(finalBalance)
      setTransactions(response.data.transacoes)
      setQuantities({ 2: 0, 5: 0, 10: 0, 20: 0, 50: 0, 100: 0, 200: 0 })
      setView('menu')
    } catch (error) {
      alert("Erro ao salvar transação no servidor.")
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans flex flex-col">
      <header className="bg-[#18181B] border-b border-white/5 p-6 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-black italic tracking-tighter">DEV<span className="text-[#8B5CF6]">BANK</span></h1>
          <div className="flex items-center gap-6">
            <div className="bg-[#0A0A0B] border border-white/10 px-6 py-3 rounded-2xl shadow-inner">
              <p className="text-sm font-bold text-zinc-100">Nome: {userData.nome}</p>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">
                Agência: {userData.agencia} | Conta: {userData.conta}
              </p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-4xl font-black">?</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 flex flex-col justify-center px-4 py-12">
        {view === 'menu' ? (
          <div className="flex flex-col gap-8 w-full">
            <section className="bg-[#18181B] border border-white/5 p-8 rounded-[32px] flex justify-between items-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8B5CF6]/5 blur-[100px]" />
              <h2 className="text-4xl font-bold tracking-tight">O que você deseja <span className="text-[#8B5CF6]">fazer</span>?</h2>
              <div className="bg-[#0A0A0B] border border-white/10 px-10 py-4 rounded-[20px]">
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Saldo atual</p>
                <span className="text-3xl font-mono font-bold text-[#8B5CF6]">R$ {balance.toFixed(2)}</span>
              </div>
            </section>

            <section className="grid grid-cols-12 gap-8">
              <button onClick={() => setView('depositar')} className="col-span-3 bg-[#18181B] hover:border-[#8B5CF6]/40 border border-white/5 p-10 rounded-[40px] transition-all group flex flex-col items-center">
                <h3 className="text-2xl font-black text-zinc-300 mb-6 group-hover:text-white uppercase">Depositar</h3>
                <div className="bg-[#0A0A0B] p-6 rounded-[32px] border-2 border-white/5 group-hover:border-[#8B5CF6]/30">
                  <div className="w-16 h-16 rounded-full border-4 border-[#8B5CF6] flex items-center justify-center text-3xl font-black text-[#8B5CF6]">$</div>
                </div>
              </button>

              <button onClick={() => setView('retirar')} className="col-span-3 bg-[#18181B] hover:border-[#8B5CF6]/40 border border-white/5 p-10 rounded-[40px] transition-all group flex flex-col items-center">
                <h3 className="text-2xl font-black text-zinc-300 mb-6 group-hover:text-white uppercase">Retirar</h3>
                <div className="bg-[#0A0A0B] p-6 rounded-[32px] border-2 border-white/5 group-hover:border-[#8B5CF6]/30">
                  <div className="w-16 h-16 rounded-full border-4 border-[#8B5CF6] flex items-center justify-center text-3xl font-black text-[#8B5CF6]">$</div>
                </div>
              </button>

              <div className="col-span-6 bg-[#18181B] border border-white/5 p-8 rounded-[40px] shadow-xl flex flex-col">
                <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">Últimas Atividades</h3>
                <div className="flex flex-col gap-3 max-h-[200px] overflow-y-auto pr-2 custom-scroll">
                  {transactions.length === 0 ? (
                    <p className="text-zinc-600 text-sm italic">Nenhuma transação realizada ainda.</p>
                  ) : (
                    transactions.map(t => (
                      <div key={t.id} className="flex justify-between items-center bg-[#0A0A0B] p-4 rounded-2xl border border-white/5">
                        <div className="flex flex-col">
                          <span className={`text-[10px] font-black tracking-tighter ${t.tipo === 'DEPOSITAR' ? 'text-emerald-500' : 'text-rose-500'}`}>{t.tipo}</span>
                          <span className="text-[10px] text-zinc-600 font-bold">{t.data}</span>
                        </div>
                        <span className="font-mono font-bold text-lg">R$ {t.valor.toFixed(2)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-4 gap-4">
              {bills.map(bill => (
                <div key={bill} className="bg-[#18181B] border border-white/5 p-6 rounded-3xl flex flex-col gap-4 shadow-xl">
                  <div className="bg-[#0A0A0B] py-6 rounded-2xl border border-white/5 flex items-center justify-center">
                    <span className="text-2xl font-black text-zinc-200">{bill} R$</span>
                  </div>
                  <input 
                    type="number" 
                    value={quantities[bill]} 
                    onChange={(e) => setQuantities({...quantities, [bill]: Math.max(0, parseInt(e.target.value) || 0)})}
                    className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg py-2 text-center font-mono font-bold text-[#8B5CF6] outline-none" 
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <button onClick={() => setView('menu')} className="px-12 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-black uppercase tracking-widest">Voltar</button>
              <button onClick={handleConfirm} className="px-12 py-4 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-black uppercase tracking-widest shadow-lg shadow-[#8B5CF6]/20">
                Confirmar R$ {totalOperation.toFixed(2)}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="container mx-auto p-4 mb-8">
        <div className="bg-[#18181B] rounded-2xl flex justify-between items-center px-8 py-5 border border-white/5 text-zinc-500 font-bold text-xs tracking-widest">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            ENDPOINT: HTTP://LOCALHOST:3000/API/V1
          </div>
        </div>
      </footer>
    </div>
  )
}