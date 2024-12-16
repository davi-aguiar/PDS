import React, { useState } from "react";
import styles from "./page.module.css";
import { FaTrash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string; // Define se será exibido como ícone ou botão
  protocolo: number; // Identificador único do evento, conforme o banco de dados
}

const PopupEvento = ({ type, protocolo }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Alterna o estado do popup (aberto ou fechado)
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Lida com a exclusão do evento
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/eventos/${protocolo}`);
      togglePopup(); // Fecha o popup após a exclusão
      navigate("/eventos"); // Redireciona para a lista de eventos
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Erro ao excluir o evento. Tente novamente.");
    }
  };

  return (
    <div>
      {/* Define o trigger do popup como ícone ou botão */}
      {type === "icon" ? (
        <FaTrash
          onClick={togglePopup}
          size={18}
          color="black"
          className={styles.icon}
        />
      ) : (
        <button onClick={togglePopup}>EXCLUIR</button>
      )}

      {/* Conteúdo do popup */}
      {isOpen && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()} // Previne o fechamento ao clicar dentro do popup
          >
            <h2>Tem certeza que deseja excluir o evento?</h2>
            <p>
              Todas as informações associadas a este evento serão excluídas
              permanentemente.
            </p>
            <div className={styles.buttonsDiv}>
              {/* Botões para cancelar ou confirmar a exclusão */}
              <button onClick={togglePopup}>Cancelar</button>
              <button onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupEvento;
