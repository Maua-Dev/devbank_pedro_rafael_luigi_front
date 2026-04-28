const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  {
    nome: "Vitor",
    tipo: "Corrente",
    agencia: "0000",
    conta: "00000-0",
    saldo: 1250.00,
    transacoes: []
  }
];

app.post('/api/v1/login', (req, res) => {
  const { agencia, conta } = req.body;
  const user = users.find(u => u.conta === conta && u.agencia === agencia);
  if (user) return res.status(200).json(user);
  return res.status(401).json({ message: "Dados inválidos" });
});

app.put('/api/v1/update-balance', (req, res) => {
  const { conta, novoSaldo, tipoOperacao, valor } = req.body;
  const user = users.find(u => u.conta === conta);

  if (user) {
    user.saldo = novoSaldo;
    user.transacoes.unshift({
      id: Math.random(),
      tipo: tipoOperacao,
      valor: valor,
      data: new Date().toLocaleTimeString()
    });
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "Usuário não encontrado" });
});

app.listen(3000, () => {
  console.log('--- SERVIDOR ON-LINE ---');
  console.log('Rodando em http://localhost:3000');
});