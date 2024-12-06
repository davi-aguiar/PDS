import React, { useState } from "react";
import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";

// Definindo os tipos para os dados do formulário
interface ModeloVeiculoForm {
  codModelo?: number;
  nomeModelo: string;
  tipo: string;
  codMarca?: number;
}

const NovoModeloVeiculo: React.FC = () => {
  const [formData, setFormData] = useState<ModeloVeiculoForm>({
    codModelo: undefined,
    nomeModelo: "",
    tipo: "",
    codMarca: undefined,
  });

  const handleChange = (field: keyof ModeloVeiculoForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Dados enviados antes da conversão:", formData);

    // Converte campos específicos para números
    const convertedData = {
      ...formData,
      codModelo: formData.codModelo ? Number(formData.codModelo) : undefined,
      codMarca: formData.codMarca ? Number(formData.codMarca) : undefined,
    };

    console.log("Dados enviados após conversão:", convertedData);

    try {
      const response = await axios.post(
        "http://localhost:3000/modelo/cadastrar",
        convertedData
      );

      if (response.status !== 201) {
        console.error("Erro na resposta do servidor:", response.data);
        alert(`Erro ao criar modelo: ${response.data.message}`);
        return;
      }

      console.log("Resposta do servidor:", response.data);
      alert("Modelo criado com sucesso!");
      setFormData({
        codModelo: undefined,
        nomeModelo: "",
        tipo: "",
        codMarca: undefined,
      });
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      alert("Erro ao se conectar com o servidor.");
    }
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <div className="register">
          <h1>Cadastrar Novo Modelo de Veículo</h1>
          <DropDown
            title="Modelo de Veículo"
            type="modelo_veiculo"
            onChange={(field, value) =>
              handleChange(field as keyof ModeloVeiculoForm, value)
            }
            formData={formData}
          />
        </div>
        <div className="divButtons">
          <button onClick={() => alert("Cancelado")}>CANCELAR</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>
    </div>
  );
};

export default NovoModeloVeiculo;
