import { useState } from 'react'
import axios from 'axios'
import { OperacaoDinheiro } from './componentes/OperacaoDinheiro'
import { ListaTransacoes } from './componentes/ListaTransacoes'

interface DashboardProps {
  userData: {
    nome: string;
    agencia: string;
    conta: string;
    saldo: number;
    transacoes: any[];
  }
}

export function Dashboard({ userData }: DashboardProps) {
  const [telaAtiva, setTelaAtiva] = useState<'menu' | 'depositar' | 'retirar' | 'extrato'>('menu')
  const [saldo, setSaldo] = useState(userData.saldo)
  const [historico, setHistorico] = useState(userData.transacoes || [])

  const realizarOperacao = async (valor: number) => {
    const novoSaldo = telaAtiva === 'depositar' ? saldo + valor : saldo - valor
    try {
      const response = await axios.put('http://localhost:3000/api/v1/update-balance', {
        conta: userData.conta,
        novoSaldo: novoSaldo,
        tipoOperacao: telaAtiva.toUpperCase(),
        valor: valor
      })

      const novosDadosParaSalvar = {
        ...userData,
        saldo: novoSaldo,
        transacoes: response.data.transacoes
      }

      localStorage.setItem('@DevBank:usuario', JSON.stringify(novosDadosParaSalvar))
      
      setSaldo(novoSaldo)
      setHistorico(response.data.transacoes)
      setTelaAtiva('menu')
    } catch (error) {
      alert("Erro ao processar transação.")
    }
  }

  const sair = () => {
    localStorage.removeItem('@DevBank:usuario')
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans flex flex-col">
      <header className="bg-[#18181B] border-b border-white/5 p-6 shadow-2xl">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-black italic tracking-tighter">DEV<span className="text-[#8B5CF6]">BANK</span></h1>
          <div className="flex items-center gap-6">
            <div className="bg-[#0A0A0B] border border-white/10 px-6 py-3 rounded-2xl text-right">
              <p className="text-sm font-bold text-zinc-100">{userData.nome}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">AG: {userData.agencia} | CC: {userData.conta}</p>
            </div>
            <button onClick={sair} className="text-zinc-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest">Sair</button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 flex flex-col justify-center px-4 py-12">
        {telaAtiva === 'menu' && (
          <div className="flex flex-col gap-10">
            <section className="bg-[#18181B] border border-white/5 p-8 rounded-[32px] flex justify-between items-center shadow-2xl">
              <h2 className="text-4xl font-bold">O que você deseja fazer?</h2>
              <div className="bg-[#0A0A0B] border border-white/10 px-10 py-4 rounded-[20px]">
                <p className="text-zinc-500 text-[10px] font-black uppercase mb-1">Saldo em conta</p>
                <span className="text-3xl font-mono font-bold text-[#8B5CF6]">R$ {saldo.toFixed(2)}</span>
              </div>
            </section>

            <section className="grid grid-cols-3 gap-8">
              <button onClick={() => setTelaAtiva('depositar')} className="bg-[#18181B] hover:border-[#8B5CF6]/40 border border-white/5 p-12 rounded-[40px] transition-all group flex flex-col items-center">
                <h3 className="text-2xl font-black mb-6 group-hover:text-[#8B5CF6]">DEPOSITAR</h3>
                <div className="w-20 h-20 rounded-full border-4 border-[#8B5CF6] flex items-center justify-center text-4xl font-black text-[#8B5CF6]">$</div>
              </button>

              <button onClick={() => setTelaAtiva('retirar')} className="bg-[#18181B] hover:border-[#8B5CF6]/40 border border-white/5 p-12 rounded-[40px] transition-all group flex flex-col items-center">
                <h3 className="text-2xl font-black mb-6 group-hover:text-[#8B5CF6]">RETIRAR</h3>
                <div className="w-20 h-20 rounded-full border-4 border-[#8B5CF6] flex items-center justify-center text-4xl font-black text-[#8B5CF6]">$</div>
              </button>

              <button onClick={() => setTelaAtiva('extrato')} className="bg-[#18181B] hover:border-[#8B5CF6]/40 border border-white/5 p-12 rounded-[40px] transition-all group flex flex-col items-center text-center">
                <h3 className="text-2xl font-black mb-6 group-hover:text-[#8B5CF6]">TRANSAÇÃO</h3>
                <div className="flex items-center gap-4">
                  <span className="text-[#8B5CF6] text-2xl">➔</span>
                  <div className="w-20 h-20 rounded-full border-4 border-[#8B5CF6] flex items-center justify-center text-4xl font-black text-[#8B5CF6]">$</div>
                  <span className="text-[#8B5CF6] text-2xl">➔</span>
                </div>
              </button>
            </section>
          </div>
        )}

        {(telaAtiva === 'depositar' || telaAtiva === 'retirar') && (
          <OperacaoDinheiro 
            tipo={telaAtiva} 
            saldoAtual={saldo} 
            aoConfirmar={realizarOperacao} 
            aoCancelar={() => setTelaAtiva('menu')} 
          />
        )}

        {telaAtiva === 'extrato' && (
          <ListaTransacoes 
            historico={historico} 
            aoVoltar={() => setTelaAtiva('menu')} 
          />
        )}
      </main>
    </div>
  )
}