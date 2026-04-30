import { useState } from 'react'

interface OperacaoDinheiroProps {
  tipo: 'depositar' | 'retirar';
  saldoAtual: number;
  aoConfirmar: (total: number) => void;
  aoCancelar: () => void;
}

export function OperacaoDinheiro({ tipo, saldoAtual, aoConfirmar, aoCancelar }: OperacaoDinheiroProps) {
  const [notas, setNotas] = useState<{ [key: number]: number }>({
    2: 0, 5: 0, 10: 0, 20: 0, 50: 0, 100: 0, 200: 0
  })

  const cedulasDisponiveis = [2, 5, 10, 20, 50, 100, 200]
  
  // Calcula o valor total somando (valor da nota * quantidade)
  const valorTotal = Object.entries(notas).reduce((acc, [nota, qtd]) => acc + Number(nota) * qtd, 0)
  
  // Calcula o saldo final previsto
  const saldoFinal = tipo === 'depositar' ? saldoAtual + valorTotal : saldoAtual - valorTotal

  // Função para aumentar ou diminuir a quantidade de notas
  const ajustarQuantidade = (cedula: number, delta: number) => {
    setNotas(prev => ({
      ...prev,
      [cedula]: Math.max(0, prev[cedula] + delta)
    }))
  }

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      {/* Cabeçalho de Resumo */}
      <section className="bg-[#18181B] border border-white/5 p-6 rounded-[24px] flex justify-between items-center shadow-2xl">
        <div className="bg-[#0A0A0B] border border-white/10 px-6 py-3 rounded-xl text-center">
          <p className="text-[#8B5CF6] text-[10px] font-black uppercase tracking-widest">Total da Operação</p>
          <p className="text-xl font-mono font-bold text-[#8B5CF6]">R$ {valorTotal.toFixed(2)}</p>
        </div>
        <div className="bg-[#0A0A0B] border border-white/10 px-6 py-3 rounded-xl text-right">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Saldo após confirmar</p>
          <p className={`text-xl font-mono font-bold ${saldoFinal < 0 ? 'text-rose-500' : 'text-zinc-300'}`}>
            R$ {saldoFinal.toFixed(2)}
          </p>
        </div>
      </section>

      {/* Grid de Cédulas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cedulasDisponiveis.map(valorNota => (
          <div key={valorNota} className="bg-[#18181B] border border-white/5 p-4 rounded-3xl flex flex-col gap-4 shadow-xl">
            <div className="bg-[#0A0A0B] py-3 rounded-2xl flex items-center justify-center font-black text-lg border border-white/5">
              {valorNota} R$
            </div>
            
            <div className="flex items-center justify-between bg-[#0A0A0B] rounded-xl p-2 border border-white/10">
              <button 
                onClick={() => ajustarQuantidade(valorNota, -1)}
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xl font-bold transition-colors"
              >
                -
              </button>
              
              <span className="font-mono text-xl font-bold text-[#8B5CF6]">
                {notas[valorNota]}
              </span>
              
              <button 
                onClick={() => ajustarQuantidade(valorNota, 1)}
                className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Botões de Ação */}
      <div className="flex justify-center gap-6 mt-4">
        <button 
          onClick={aoCancelar} 
          className="px-12 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-black uppercase tracking-widest transition-all"
        >
          Cancelar
        </button>
        <button 
          onClick={() => aoConfirmar(valorTotal)} 
          disabled={valorTotal === 0 || (tipo === 'retirar' && saldoFinal < 0)}
          className="px-12 py-4 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#8B5CF6]/20"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}