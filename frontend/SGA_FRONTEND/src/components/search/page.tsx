import styles from "./page.module.css";
import {
  FaCar,
  FaMagnifyingGlass,
  FaGear
} from "react-icons/fa6";

export default function Search() {
  return (
    <>
    <div className={styles.searchDiv}>
    <FaCar size={18} color="white" />
      <div className={styles.searchBar}>
        <FaMagnifyingGlass size={18} color="#7f7f7f" />
        <input type="text" placeholder="Pesquisar Por Associados" />
      </div>
      <FaGear size={18} color="#7f7f7f" />
    </div>
    </>
  );
}
