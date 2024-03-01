import React, { useState } from 'react';
import './Formulario.css'; 

export default function Formulario() {
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://lcha-fn.vercel.app/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      if (response.ok) {
        alert('Presença confirmada e registrada com sucesso!');
        console.log('Presença confirmada e registrada!');
        setNome('');
      } else {
        console.error('Erro ao confirmar presença.');
      }
    } catch (error) {
      console.error('Erro ao enviar a confirmação:', error);
    } finally {
      setLoading(false);
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
        <button
          type="submit"
          className={loading ? 'btn-disabled' : ''}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Confirmar Presença'}
        </button>
      </form>
    </div>
  );
}
