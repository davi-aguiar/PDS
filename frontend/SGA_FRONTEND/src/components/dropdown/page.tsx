import { useState } from "react";
import styles from "./page.module.css";

interface Props {
    title: string,
    content: string,
}

export default function DropDown({title, content}: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      <div className={styles.dropDown} onClick={handleClick}>
        <h1>{title}</h1>
      </div>
      <div className={`${styles.form} ${clicked ? styles.show : styles.hide}`}>
        <p>{content}</p>
      </div>
    </>
  );
}
