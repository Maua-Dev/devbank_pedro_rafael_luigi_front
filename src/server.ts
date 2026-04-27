interface ContaData {
  tipoConta: string;
  agencia: string;
  conta: string;
}

app.post('/acessar-conta', (req: Request, res: Response) => {
  const { tipoConta, agencia, conta }: ContaData = req.body;

  console.log(`Solicitação de acesso: Ag: ${agencia} | Conta: ${conta} (${tipoConta})`);

  if (!agencia || !conta) {
    return res.status(400).json({ message: "Agência e conta são obrigatórios." });
  }

  // Servidor simula a busca no banco de dados
  res.status(200).json({
    status: "Sucesso",
    titular: "Dev Developer",
    saldo: 1500.50
  });
});