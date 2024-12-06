import { useState } from "react";
import "./styles.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import DropDownInput from "../dropdownInput/page";
import React from "react";
import Autocomplete from "../select/page";

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
    esp_renavam?: string;
    placa?: string;
    esp_cor?: string;
    codModelo?: string;
    esp_numero_motor?: string;
    cod_fipe?: string;
    mensalidade?: string;
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
                  value={formData[field.name as keyof typeof formData] || ""}
                  onChange={handleInputChange}
                />
              ))}
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
