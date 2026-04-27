import './style.css'

function TelaInicial() {
  return (
    <div className="container">
      <form>
        <h1>DEV BANK</h1>
        <input name='Tipo de conta' type='text'/>
        <input name='Conta' type='number'/>
        <input name='Agência' type='number'/>
        <button type='button'>Entrar</button>
      </form>
    </div>
  );
} 