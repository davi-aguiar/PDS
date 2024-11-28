import styles from "./page.module.css";
import alpha from "../../assets/Forma 4.png";
import {
  FaUsers,
  FaCar,
  FaNewspaper,
  FaScrewdriverWrench,
  FaCoins,
  FaBullhorn,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function Dash() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <>
      <div className={styles.menu}>
        <img
          src={alpha}
          alt="logo"
          width={120}
          onClick={() => handleNavigate("")} // Passa uma arrow function para evitar execução imediata
        />
        <br />
        <button
          className={styles.button}
          onClick={() => handleNavigate("associado")}
        >
          <FaUsers size={18} color="black" />
          ASSOCIADOS
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("veiculos")}
        >
          <FaCar size={18} color="black" />
          VEICULOS
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("modelos-veiculos")}
        >
          <FaCar size={18} color="black" />
          MODELO DE VEICULO
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("cadastros")}
        >
          <FaNewspaper size={18} color="black" />
          CADASTROS
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("ferramentas")}
        >
          <FaScrewdriverWrench size={18} color="black" />
          FERRAMENTAS
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("financeiros")}
        >
          <FaCoins size={18} color="black" />
          FINANCEIROS
        </button>
        <button
          className={styles.button}
          onClick={() => handleNavigate("eventos")}
        >
          <FaBullhorn size={18} color="black" />
          EVENTOS
        </button>
      </div>
    </>
  );
}
