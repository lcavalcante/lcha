import React, { useState, useEffect } from "react";
import "./Formulario.css";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleClickOutsideModal = (e) => {
      if (showModal && !e.target.closest(".modal")) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://lcha-fn.vercel.app/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome }),
      });

      if (response.ok) {
        alert("Presença confirmada e registrada com sucesso!");
        console.log("Presença confirmada e registrada!");
        setNome("");
        setShowModal(false);
      } else {
        console.error("Erro ao confirmar presença.");
      }
    } catch (error) {
      console.error("Erro ao enviar a confirmação:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="image-container">
        <img src="/img/convite.jpeg" alt="Convite" />
      </div>

      <button
        className="open-modal-button"
        onClick={() => setShowModal(true)}
      >
        Confirmar Presença
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-modal-button"
              onClick={() => setShowModal(false)}
            >
              Fechar
            </button>

            <form onSubmit={handleSubmit}>
              <h3>Confirme sua Presença</h3>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <button
                type="submit"
                className={loading ? "btn-disabled" : ""}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Confirmar Presença"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
