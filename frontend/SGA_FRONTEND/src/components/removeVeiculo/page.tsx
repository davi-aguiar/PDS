import React, { useState } from "react";
import styles from "./page.module.css";
import { FaCar, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string;
  chassi: string;
  placa: string;
}

const PopupVeiculo = ({ type, chassi, placa }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/veiculos/deletar/${chassi}`);
      togglePopup();
      navigate("/veiculos");
    } catch (error) {
      console.error("Erro ao excluir modelo:", error);
      alert("Erro ao excluir o modelo. Tente novamente.");
    }
  };

  return (
    <div>
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

      {isOpen && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Tem certeza que deseja excluir o veiculo de placa {placa}?</h2>
            <p>
              Todas as associações e dados relacionados a este veículo serão
              excluídos.
            </p>
            <div className={styles.buttonsDiv}>
              <button onClick={togglePopup}>Cancelar</button>
              <button onClick={handleDelete}>Excluir</button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupVeiculo;
