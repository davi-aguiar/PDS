import { useState } from "react";
import styles from "./page.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropDownInput from "../dropdownInput/page";

interface Props {
  title: string;
  type: string;
  onChange: (field: string, value: string) => void;
  formData: {
    nome?: string;
    cpf_cnpj?: string;
    data_nascimento?: string;
    cnh?: string;
    rg?: string;
    telefone?: string;
    end_cep?: string;
    end_complemento?: string;
    end_logradouro?: string;
    end_cidade?: string;
    end_bairro?: string;
    end_numero?: string;

    //modelo_veiculo
    modelo_nome?: string;
    modelo_marca?: string;
    modelo_fipe?: string;
    modelo_ano?: string;
    modelo_combustivel?: string;
    modelo_transmissao?: string;
    modelo_portas?: string;

    //veiculo
    chassi?: string;
    renavam?: string;
    placa?: string;
    categoria?: string;
    modelo?: string;
    ano_fab?: string;
    depreciacao?: string;
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

  const associadosData = [
    { label: "Nome", name: "nome", placeholder: "Ex: Antônio Nunes" },
    { label: "CPF/CNPJ", name: "cpf_cnpj", placeholder: "Ex: 897.234.123-32" },
    {
      label: "Data de Nascimento",
      name: "data_nascimento",
      placeholder: "Ex: 13/05/2000",
    },
    { label: "CNH", name: "cnh", placeholder: "Ex: 38348213128" },
    { label: "RG", name: "rg", placeholder: "Ex: 8839992341" },
    { label: "Telefone", name: "telefone", placeholder: "Ex: (77) 98832-3243" },
    { label: "CEP", name: "end_cep", placeholder: "Ex: 45077-100" },
    { label: "Complemento", name: "end_complemento", placeholder: "Ex: Casa" },
    {
      label: "Logradouro",
      name: "end_logradouro",
      placeholder: "Ex: Rua das Flores",
    },
    { label: "Cidade", name: "end_cidade", placeholder: "Ex: Brumado" },
    { label: "Bairro", name: "end_bairro", placeholder: "Ex: Vila Serrana" },
    { label: "N°", name: "end_numero", placeholder: "Ex: 28" },
  ];

  const veiculosData = [
    {
      label: "Chassi",
      name: "chassi",
      placeholder: "Ex: 4aDsu5mZLFRyz3353",
    },
    { label: "Renavam", name: "renavam", placeholder: "Ex: 144003058" },
    { label: "Placa", name: "placa", placeholder: "Ex: BRA2E19" },
    { label: "Categoria", name: "categoria", placeholder: "Ex: Passeio" },
    {
      label: "Modelo",
      name: "modelo",
      placeholder: "Ex: Fiat Uno",
    },
    {
      label: "Ano Fab",
      name: "ano_fab",
      placeholder: "Ex: 2012",
    },
    { label: "Depreciação", name: "depreciacao", placeholder: "Ex: Novo" },
  ];

  const modVeiculosData = [
    {
      label: "Nome do Modelo",
      name: "modelo_nome",
      placeholder: "Ex: Corolla",
    },
    { label: "Marca", name: "modelo_marca", placeholder: "Ex: Toyota" },
    { label: "Código FIPE", name: "modelo_fipe", placeholder: "Ex: 001234-5" },
    { label: "Ano", name: "modelo_ano", placeholder: "Ex: 2024" },
    {
      label: "Combustível",
      name: "modelo_combustivel",
      placeholder: "Ex: Gasolina",
    },
    {
      label: "Transmissão",
      name: "modelo_transmissao",
      placeholder: "Ex: Automático",
    },
    { label: "Portas", name: "modelo_portas", placeholder: "Ex: 4" },
  ];

  return (
    <>
      <div className={styles.dropDown} onClick={handleClick}>
        <h1>{title}</h1>
      </div>
      <div className={`${styles.form} ${clicked ? styles.show : styles.hide}`}>
        <div>
          {type === "associado" && (
            <div className={styles.inputsFlex}>
              {associadosData.map((field, index) => (
                <DropDownInput
                  key={index}
                  title={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                />
              ))}
              <div className={styles.info2}>
                <p>Upload Documentação</p>
                <div className={styles.uploadInput}>
                  <input type="file" id="file-input" />
                  <label htmlFor="file-input">
                    <IoCloudUploadOutline size={60} />
                  </label>
                </div>
              </div>
            </div>
          )}
          {type === "modelo_veiculo" && (
            <div className={styles.inputsFlex}>
              {modVeiculosData.map((field, index) => (
                <DropDownInput
                  key={index}
                  title={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                />
              ))}
            </div>
          )}
          {type === "veiculo" && (
            <div className={styles.inputsFlex}>
              {veiculosData.map((field, index) => (
                <DropDownInput
                  key={index}
                  title={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                />
              ))}
              <div className={styles.info2}>
                <p>Imagens</p>
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
