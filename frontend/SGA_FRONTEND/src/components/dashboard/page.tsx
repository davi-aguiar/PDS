import styles from "./page.module.css";
import alpha from "../../assets/Forma 4.png";
import {
  FaUsers,
  FaCar,
  FaNewspaper,
  FaCoins,
  FaBullhorn,
  FaCaravan,
} from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

export default function Dash() {
  const navigate = useNavigate();
  const location = useLocation();

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
          onClick={() => handleNavigate("")}
        />
        <br />
        <button
          className={`${styles.button} ${
            location.pathname.includes("/associado") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("associado")}
        >
          <FaUsers size={18} color="black" />
          ASSOCIADOS
        </button>
        <button
          className={`${styles.button} ${
            location.pathname.includes("/veiculos") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("veiculos")}
        >
          <FaCar size={18} color="black" />
          VEICULOS
        </button>
        <button
          className={`${styles.button} ${
            location.pathname.includes("/modelos-veiculos") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("modelos-veiculos")}
        >
          <FaCaravan size={18} color="black" />
          MOD. DE VEICULO
        </button>
        <button
          className={`${styles.button} ${
            location.pathname.includes("/cadastros") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("cadastros")}
        >
          <FaNewspaper size={18} color="black" />
          CADASTROS
        </button>
        <button
          className={`${styles.button} ${
            location.pathname.includes("/financeiros") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("financeiros")}
        >
          <FaCoins size={18} color="black" />
          FINANCEIROS
        </button>
        <button
          className={`${styles.button} ${
            location.pathname.includes("/eventos") ? styles.active : ""
          }`}
          onClick={() => handleNavigate("eventos")}
        >
          <FaBullhorn size={18} color="black" />
          EVENTOS
        </button>
      </div>
    </>
  );
}
