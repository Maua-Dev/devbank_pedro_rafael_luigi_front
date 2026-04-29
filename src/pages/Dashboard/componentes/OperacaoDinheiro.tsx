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
  const valorTotal = Object.entries(notas).reduce((acc, [nota, qtd]) => acc + Number(nota) * qtd, 0)
  const saldoFinal = tipo === 'depositar' ? saldoAtual + valorTotal : saldoAtual - valorTotal

  return (
    <div className="flex flex-col gap-8">
      <section className="bg-[#18181B] border border-white/5 p-6 rounded-[24px] flex justify-between items-center shadow-2xl">
        <div className="bg-[#0A0A0B] border border-white/10 px-6 py-3 rounded-xl">
          <p className="text-[#8B5CF6] text-[10px] font-black uppercase tracking-widest">Total da Operação</p>
          <p className="text-xl font-mono font-bold text-[#8B5CF6]">R$ {valorTotal.toFixed(2)}</p>
        </div>
        <div className="text-right">
          <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Saldo após confirmar</p>
          <p className={`text-xl font-mono font-bold ${saldoFinal < 0 ? 'text-rose-500' : 'text-zinc-300'}`}>
            R$ {saldoFinal.toFixed(2)}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-4 gap-4">
        {cedulasDisponiveis.map(valorNota => (
          <div key={valorNota} className="bg-[#18181B] border border-white/5 p-4 rounded-3xl flex flex-col gap-4">
            <div className="bg-[#0A0A0B] py-4 rounded-2xl flex items-center justify-center font-black text-xl">
              {valorNota} R$
            </div>
            <input 
              type="number" 
              value={notas[valorNota]} 
              onChange={(e) => setNotas({...notas, [valorNota]: Math.max(0, parseInt(e.target.value) || 0)})}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-lg py-2 text-center font-mono font-bold text-[#8B5CF6] outline-none" 
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6">
        <button onClick={aoCancelar} className="px-12 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-black uppercase tracking-widest">Cancelar</button>
        <button 
          onClick={() => aoConfirmar(valorTotal)} 
          disabled={tipo === 'retirar' && saldoFinal < 0}
          className="px-12 py-4 rounded-2xl bg-[#8B5CF6] hover:bg-[#7C3AED] font-black uppercase tracking-widest disabled:opacity-50"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}