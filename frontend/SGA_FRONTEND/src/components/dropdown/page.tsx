import { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./page.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropDownInput from "../dropdownInput/page";
import axios from "axios";

interface Props {
  title: string;
  type: string;
  onChange: (field: string, value: any) => void;
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

    // modelo_veiculo
    codModelo?: number;
    nomeModelo?: string;
    tipo?: string;
    codMarca?: number;

    // veiculo
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
  const [marcas, setMarcas] = useState<{ value: number; label: string }[]>([]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSelectChange = (selectedOption: { value: number; label: string } | null) => {
    if (selectedOption) {
      onChange("codMarca", selectedOption.value);
    }
  };

  useEffect(() => {
    if (type === "modelo_veiculo") {
      // Fetch marcas only when type is "modelo_veiculo"
      axios
        .get("http://localhost:3000/marcas/buscar") // Altere para a URL correta
        .then((response) => {
          const data = response.data;
          const formattedOptions = data.map((marca: { codMarca: number; nomeMarca: string }) => ({
            value: marca.codMarca,
            label: marca.nomeMarca,
          }));
          setMarcas(formattedOptions);
        })
        .catch((error) => console.error("Erro ao buscar marcas:", error));
    }
  }, [type]);

  const associadosData = [
    { label: "Nome", name: "nome", placeholder: "Ex: Antônio Nunes", type: "text" },
    { label: "CPF/CNPJ", name: "cpf_cnpj", placeholder: "Ex: 897.234.123-32", type: "text" },
    { label: "Data de Nascimento", name: "data_nascimento", placeholder: "Ex: 13/05/2000", type: "date" },
    { label: "CNH", name: "cnh", placeholder: "Ex: 38348213128", type: "text" },
    { label: "RG", name: "rg", placeholder: "Ex: 8839992341", type: "text" },
    { label: "Telefone", name: "telefone", placeholder: "Ex: (77) 98832-3243", type: "tel" },
    { label: "CEP", name: "end_cep", placeholder: "Ex: 45077-100", type: "text" },
    { label: "Complemento", name: "end_complemento", placeholder: "Ex: Casa", type: "text" },
    { label: "Logradouro", name: "end_logradouro", placeholder: "Ex: Rua das Flores", type: "text" },
    { label: "Cidade", name: "end_cidade", placeholder: "Ex: Brumado", type: "text" },
    { label: "Bairro", name: "end_bairro", placeholder: "Ex: Vila Serrana", type: "text" },
    { label: "N°", name: "end_numero", placeholder: "Ex: 28", type: "number" },
  ];

  const veiculosData = [
    { label: "Chassi", name: "chassi", placeholder: "Ex: 4aDsu5mZLFRyz3353", type: "text" },
    { label: "Renavam", name: "renavam", placeholder: "Ex: 144003058", type: "text" },
    { label: "Placa", name: "placa", placeholder: "Ex: BRA2E19", type: "text" },
    { label: "Categoria", name: "categoria", placeholder: "Ex: Passeio", type: "text" },
    { label: "Modelo", name: "modelo", placeholder: "Ex: Fiat Uno", type: "text" },
    { label: "Ano Fab", name: "ano_fab", placeholder: "Ex: 2012", type: "number" },
    { label: "Depreciação", name: "depreciacao", placeholder: "Ex: Novo", type: "text" },
  ];

  const modVeiculosData = [
    { label: "Código do Modelo", name: "codModelo", placeholder: "Ex: 1", type: "number" },
    { label: "Nome do Modelo", name: "nomeModelo", placeholder: "Ex: Corolla", type: "text" },
    { label: "Tipo", name: "tipo", placeholder: "Ex: Carro", type: "text" },
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
                  type={field.type}
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
                  type={field.type}
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                />
              ))}
              <div className={styles.selectContainer}>
                <label htmlFor="marca-select">Marca</label>
                <Select
                  id="marca-select"
                  options={marcas}
                  onChange={handleSelectChange}
                  placeholder="Selecione uma marca"
                  isClearable
                />
              </div>
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
                  type={field.type}
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
