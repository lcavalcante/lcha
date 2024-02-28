import React, { useState } from 'react';

function Formulario() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/confirmacao-presenca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (response.ok) {
        alert('Presença confirmada e registrada com sucesso!');
        console.log('Presença confirmada e registrada!');
      } else {
        console.error('Erro ao confirmar presença.');
      }
    } catch (error) {
      console.error('Erro ao enviar a confirmação:', error);
    }
  };

  return (  
    <div>
      <h3>Confirme sua Presença</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button type="submit">Confirmar Presença</button>
      </form>
    </div>
  );
}

export default Formulario;
