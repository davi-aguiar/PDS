import { useState } from "react";
import styles from "./page.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
  title: string;
  type: string;
}

export default function DropDown({ title, type }: Props) {
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
        <div>
          {type == "associado" && (
            <div className={styles.inputsFlex}>
              <div className={styles.info}>
                <p>Nome</p>
                <input placeholder="Ex: Antônio Nunes"></input>
              </div>
              <div className={styles.info}>
                <p>CPF/CNPJ</p>
                <input placeholder="Ex: 897.234.123-32"></input>
              </div>
              <div className={styles.info}>
                <p>Data Nasc.</p>
                <input placeholder="Ex: 13/05/2000"></input>
              </div>
              <div className={styles.info}>
                <p>CNH</p>
                <input placeholder="Ex: 38348213128"></input>
              </div>
              <div className={styles.info}>
                <p>RG</p>
                <input placeholder="Ex: 8839992341"></input>
              </div>
              <div className={styles.info}>
                <p>Telefone</p>
                <input placeholder="Ex: (77) 98832-3243"></input>
              </div>
              <div className={styles.info}>
                <p>CEP</p>
                <input placeholder="Ex: 45077-100"></input>
              </div>
              <div className={styles.info}>
                <p>Complemento</p>
                <input placeholder="Ex: Casa"></input>
              </div>
              <div className={styles.info}>
                <p>Logradouro</p>
                <input placeholder="Ex: Casa"></input>
              </div>
              <div className={styles.info}>
                <p>Cidade</p>
                <input placeholder="Ex: Brumado"></input>
              </div>
              <div className={styles.info}>
                <p>Bairro</p>
                <input placeholder="Ex: Vila Serrana"></input>
              </div>
              <div className={styles.info}>
                <p>N°</p>
                <input placeholder="Ex: 28"></input>
              </div>
              <div className={styles.info2}>
                <p>Upload</p>
                <div className={styles.uploadInput}>
                  <input type="file" id="file-input"/>
                  <label htmlFor="file-input">
                    <IoCloudUploadOutline size={60}/>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
