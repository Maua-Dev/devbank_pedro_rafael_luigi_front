import React, { useState } from 'react';
import api from '../services/api';

const Login: React.FC = () => {
  const [tipoConta, setTipoConta] = useState('Corrente');
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');

  const handleAcesso = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/acessar-conta', { 
        tipoConta, 
        agencia, 
        conta 
      });
      alert(`Acedendo à conta ${conta}...`);
    } catch (error) {
      alert('Erro ao validar dados da conta.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleAcesso} className="auth-form">
        <h2>Acesse sua conta</h2>
        
        <label>Tipo de conta</label>
        <select value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}>
          <option value="Corrente">Conta Corrente</option>
          <option value="Poupanca">Conta Poupança</option>
          <option value="Empresarial">Conta Empresarial</option>
        </select>

        <input 
          type="text" 
          placeholder="Agência (0000)" 
          value={agencia}
          onChange={(e) => setAgencia(e.target.value)}
        />

        <input 
          type="text" 
          placeholder="Número da conta" 
          value={conta}
          onChange={(e) => setConta(e.target.value)}
        />

        <button type="submit" className="btn-entrar">Entrar</button>
      </form>
    </div>
  );
};

export default Login;