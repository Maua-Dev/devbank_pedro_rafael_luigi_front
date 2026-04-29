interface Transacao {
  id: number;
  tipo: string;
  valor: number;
  data: string;
}

interface ListaTransacoesProps {
  historico: Transacao[];
  aoVoltar: () => void;
}

export function ListaTransacoes({ historico, aoVoltar }: ListaTransacoesProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold">Extrato Completo</h2>
        <button onClick={aoVoltar} className="px-8 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-black uppercase tracking-widest transition-all">
          Voltar ao Menu
        </button>
      </div>

      <div className="bg-[#18181B] border border-white/5 rounded-[32px] p-8 shadow-2xl">
        <div className="flex flex-col gap-4">
          {historico.length === 0 ? (
            <p className="text-zinc-500 italic text-center py-10">Nenhuma atividade registrada.</p>
          ) : (
            historico.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-[#0A0A0B] p-6 rounded-2xl border border-white/5">
                <div className="flex flex-col">
                  <span className={`text-xs font-black ${item.tipo === 'DEPOSITAR' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.tipo}
                  </span>
                  <span className="text-sm text-zinc-500 font-bold">{item.data}</span>
                </div>
                <span className="font-mono font-bold text-2xl text-zinc-200">R$ {item.valor.toFixed(2)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}