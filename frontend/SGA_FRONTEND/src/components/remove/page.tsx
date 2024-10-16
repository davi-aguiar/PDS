import React, { useState } from "react";
import styles from "./page.module.css";
import { FaCar, FaNewspaper, FaTrash } from "react-icons/fa6";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <FaTrash onClick={togglePopup} size={18} color="black" className={styles.icon}/>

      {isOpen && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Tem certeza que deseja excluir x?</h2>
            <p>
              Todas as atividades, notas, arquivos, documentos e faturas desta
              pessoa também serão excluídos.
            </p>
            <p>x está ligado a:</p>
            <div className={styles.dependencies}>
              <p>
                <FaCar size={22} color="black" /> x Veículos
              </p>
              <p>
                <FaNewspaper size={22} color="black" /> x Faturas
              </p>
            </div>
            <div className={styles.buttonsDiv}>
              <button onClick={togglePopup}>Cancelar</button>
              <button onClick={togglePopup}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
