import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";

interface Props {
  title: string;
  type: string;
  onChange: (field: string, value: string) => void;
  formData: {
    nome: string;
    cpf_cnpj: string;
    data_nascimento: string;
    cnh: string;
    rg: string;
    telefone: string;
    end_cep: string;
    end_complemento: string;
    end_logradouro: string;
    end_cidade: string;
    end_bairro: string;
    end_numero: string;
  };
}

export default function DropDown({ title, type, onChange, formData }: Props) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <>
      <div className={styles.dropDown} onClick={handleClick}>
        <h1>{title}</h1>
      </div>
      <div className={`${styles.form} ${clicked ? styles.show : styles.hide}`}>
        <div>
          {type === "associado" && (
            <div className={styles.inputsFlex}>
              <div className={styles.info}>
                <p>Nome</p>
                <input
                  name="nome"
                  placeholder="Ex: Antônio Nunes"
                  onChange={handleInputChange}
                  value={formData.nome || ""}
                />
              </div>
              <div className={styles.info}>
                <p>CPF/CNPJ</p>
                <input
                  name="cpf_cnpj"
                  placeholder="Ex: 897.234.123-32"
                  onChange={handleInputChange}
                  value={formData.cpf_cnpj || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Data de Nascimento</p>
                <input
                  name="data_nascimento"
                  placeholder="Ex: 13/05/2000"
                  onChange={handleInputChange}
                  value={formData.data_nascimento || ""}
                />
              </div>
              <div className={styles.info}>
                <p>CNH</p>
                <input
                  name="cnh"
                  placeholder="Ex: 38348213128"
                  onChange={handleInputChange}
                  value={formData.cnh || ""}
                />
              </div>
              <div className={styles.info}>
                <p>RG</p>
                <input
                  name="rg"
                  placeholder="Ex: 8839992341"
                  onChange={handleInputChange}
                  value={formData.rg || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Telefone</p>
                <input
                  name="telefone"
                  placeholder="Ex: (77) 98832-3243"
                  onChange={handleInputChange}
                  value={formData.telefone || ""}
                />
              </div>
              <div className={styles.info}>
                <p>CEP</p>
                <input
                  name="end_cep"
                  placeholder="Ex: 45077-100"
                  onChange={handleInputChange}
                  value={formData.end_cep || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Complemento</p>
                <input
                  name="end_complemento"
                  placeholder="Ex: Casa"
                  onChange={handleInputChange}
                  value={formData.end_complemento || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Logradouro</p>
                <input
                  name="end_logradouro"
                  placeholder="Ex: Rua das Flores"
                  onChange={handleInputChange}
                  value={formData.end_logradouro || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Cidade</p>
                <input
                  name="end_cidade"
                  placeholder="Ex: Brumado"
                  onChange={handleInputChange}
                  value={formData.end_cidade || ""}
                />
              </div>
              <div className={styles.info}>
                <p>Bairro</p>
                <input
                  name="end_bairro"
                  placeholder="Ex: Vila Serrana"
                  onChange={handleInputChange}
                  value={formData.end_bairro || ""}
                />
              </div>
              <div className={styles.info}>
                <p>N°</p>
                <input
                  name="end_numero"
                  placeholder="Ex: 28"
                  onChange={handleInputChange}
                  value={formData.end_numero || ""}
                />
              </div>
              <div className={styles.info2}>
                <p>Upload</p>
                <div className={styles.uploadInput}>
                  <input type="file" id="file-input" />
                  <label htmlFor="file-input">
                    <IoCloudUploadOutline size={60} />
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
