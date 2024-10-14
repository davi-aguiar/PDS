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

export default function Dash() {
  return (
    <>
      <div className={styles.menu}>
        <img src={alpha} alt={"logo"} width={120} />
        <br />
        <button className={styles.button}>
          <FaUsers size={18} color="black" />
          ASSOCIADOS
        </button>
        <button className={styles.button}>
          <FaCar size={18} color="black" />
          VEICULOS
        </button>
        <button className={styles.button}>
          <FaNewspaper size={18} color="black" />
          CADASTROS
        </button>
        <button className={styles.button}>
          <FaScrewdriverWrench size={18} color="black" />
          FERRAMENTAS
        </button>
        <button className={styles.button}>
          <FaCoins size={18} color="black" />
          FINANCEIROS
        </button>
        <button className={styles.button}>
          <FaBullhorn size={18} color="black" />
          EVENTOS
        </button>
      </div>
    </>
  );
}
