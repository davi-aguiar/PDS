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

    // evento
    data_evento?: string;
    tipo_ocorrencia?: string;
    endereco_evento?: string;
  };
}
interface ModeloVeiculo {
  codModelo: number;
  nomeModelo: string;
  tipo: string;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
  onDelete: (codModelo: number) => Promise<void>;
}

export default function DropDown({ title, type, onChange, formData }: Props) {
  const [clicked, setClicked] = useState(false);
  const [marcas, setMarcas] = useState<{ value: number; label: string }[]>([]);
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [tiposDeOcorrencia] = useState<string[]>([
    "Colisão leve",
    "Colisão média",
    "Colisão grave",
    "Roubo",
    "Incêndio",
    "Fenômeno natural",
  ]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const marcasLabels = marcas.map((marca) => marca.label);
  const nomesModelos = modelos.map((modelo) => modelo.nomeModelo);

  const handleSelectMarca = (value: string) => {
    const selectedMarca = marcas.find((marca) => marca.label === value);

    if (selectedMarca) {
      onChange("codMarca", selectedMarca.value);
    }
  };

  const handleSelectChange = (field: string, selectedOption: string) => {
    onChange(field, selectedOption);
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

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/modelo/buscar");
        const modelosData = response.data;

        const sortedModelos = modelosData.sort(
          (a: ModeloVeiculo, b: ModeloVeiculo) =>
            a.nomeModelo.localeCompare(b.nomeModelo)
        );

        setModelos(sortedModelos);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    };

    fetchModelos();
  }, []);

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
    { label: "Mensalidade", name: "mensalidade", placeholder: "Ex: R$ 120,00" },
  ];

  const modVeiculosData = [
    {
      label: "Código Fipe",
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

  const eventoData = [
    {
      label: "Data do Evento",
      name: "data_evento",
      placeholder: "Selecione a data",
      type: "datetime-local",
    },
    {
      label: "Endereço do Evento",
      name: "endereco_evento",
      placeholder: "Ex: Rua das Palmeiras, 123",
      type: "text",
    },
  ];

  return (
    <>
      <div className="dropDown" onClick={handleClick}>
        <h1>{title}</h1>
      </div>
      <div className={`form ${clicked ? "hide" : "show"}`}>
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
              <Autocomplete
                data={marcasLabels}
                title="Marca"
                placeholder="Selecione uma marca"
                onSelect={handleSelectMarca}
                initialValue={formData.marca.nomeMarca}
              />
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
          {type === "evento" && (
            <div className="inputsFlex">
              {eventoData.map((field, index) => (
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
              <div className="selectInput">
                <Autocomplete
                  data={tiposDeOcorrencia}
                  title="Tipo de Ocorrência"
                  placeholder="Selecione o tipo de ocorrência"
                  onSelect={(value) =>
                    handleSelectChange("tipo_ocorrencia", value)
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
