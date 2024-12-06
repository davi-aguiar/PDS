import { useState, useEffect } from "react";
import Select from "react-select";
import "./styles.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropDownInput from "../dropdownInput/page";
import React from "react";
import Autocomplete from "../select/page";
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
    esp_renavam?: string;
    placa?: string;
    esp_cor?: string;
    esp_numero_motor?: string;
    cod_fipe?: string;
    mensalidade?: string;
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

  const handleSelectChange = (
    selectedOption: { value: number; label: string } | null
  ) => {
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
          const formattedOptions = data.map(
            (marca: { codMarca: number; nomeMarca: string }) => ({
              value: marca.codMarca,
              label: marca.nomeMarca,
            })
          );
          setMarcas(formattedOptions);
        })
        .catch((error) => console.error("Erro ao buscar marcas:", error));
    }
  }, [type]);

  const associadosData = [
    {
      label: "Nome",
      name: "nome",
      placeholder: "Ex: Antônio Nunes",
      type: "text",
    },
    {
      label: "CPF/CNPJ",
      name: "cpf_cnpj",
      placeholder: "Ex: 897.234.123-32",
      type: "text",
    },
    {
      label: "Data de Nascimento",
      name: "data_nascimento",
      placeholder: "Ex: 13/05/2000",
      type: "date",
    },
    { label: "CNH", name: "cnh", placeholder: "Ex: 38348213128", type: "text" },
    { label: "RG", name: "rg", placeholder: "Ex: 8839992341", type: "text" },
    {
      label: "Telefone",
      name: "telefone",
      placeholder: "Ex: (77) 98832-3243",
      type: "tel",
    },
    {
      label: "CEP",
      name: "end_cep",
      placeholder: "Ex: 45077-100",
      type: "text",
    },
    {
      label: "Complemento",
      name: "end_complemento",
      placeholder: "Ex: Casa",
      type: "text",
    },
    {
      label: "Logradouro",
      name: "end_logradouro",
      placeholder: "Ex: Rua das Flores",
      type: "text",
    },
    {
      label: "Cidade",
      name: "end_cidade",
      placeholder: "Ex: Brumado",
      type: "text",
    },
    {
      label: "Bairro",
      name: "end_bairro",
      placeholder: "Ex: Vila Serrana",
      type: "text",
    },
    { label: "N°", name: "end_numero", placeholder: "Ex: 28", type: "number" },
  ];

  const veiculosData = [
    {
      label: "Chassi",
      name: "chassi",
      placeholder: "Ex: 4aDsu5mZLFRyz3353",
    },
    { label: "Renavam", name: "esp_renavam", placeholder: "Ex: 144003058" },
    { label: "Placa", name: "placa", placeholder: "Ex: BRA2E19" },
    { label: "Cor", name: "esp_cor", placeholder: "Ex: Azul" },
    {
      label: "Num. Motor",
      name: "esp_numero_motor",
      placeholder: "Ex: 52WVC10338",
    },
    { label: "Cod. Fipe", name: "cod_fipe", placeholder: "Ex: 005418-6" },
    { label: "Mensalidade", name: "mensalidade", placeholder: "Ex: R$ 120,00" },
  ];

  const modVeiculosData = [
    {
      label: "Código do Modelo",
      name: "codModelo",
      placeholder: "Ex: 1",
      type: "number",
    },
    {
      label: "Nome do Modelo",
      name: "nomeModelo",
      placeholder: "Ex: Corolla",
      type: "text",
    },
    { label: "Tipo", name: "tipo", placeholder: "Ex: Carro", type: "text" },
  ];

  const data = ["Apple", "Banana", "Cherry", "Date", "Fig", "Grapes", "Orange"];

  const handleSelect = (value: string) => {
    console.log("Valor selecionado:", value);
  };

  return (
    <>
      <div className="dropDown" onClick={handleClick}>
        <h1>{title}</h1>
      </div>
      <div className={`form ${clicked ? "show" : "hide"}`}>
        <div>
          {type === "associado" && (
            <div className="inputsFlex">
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
              <div className="info2">
                <p>Upload Documentação</p>
                <div className="uploadInput">
                  <input type="file" id="file-input" />
                  <label htmlFor="file-input">
                    <IoCloudUploadOutline size={60} />
                  </label>
                </div>
              </div>
            </div>
          )}
          {type === "modelo_veiculo" && (
            <div className="inputsFlex">
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
              <div className="selectContainer">
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
            <>
              <div className="inputsFlex">
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
                <Autocomplete
                  data={data}
                  title="Modelo"
                  placeholder="Digite o Modelo"
                  onSelect={handleSelect}
                />
                <div className="info2">
                  <p>Imagens</p>
                  <div className="uploadInput">
                    <input type="file" id="file-input" />
                    <label htmlFor="file-input">
                      <IoCloudUploadOutline size={60} />
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
