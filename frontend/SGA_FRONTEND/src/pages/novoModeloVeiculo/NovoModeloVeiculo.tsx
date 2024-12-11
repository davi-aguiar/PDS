import React, { useState } from "react";
import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useNavigate } from "react-router-dom";

// Definindo os tipos para os dados do formulário
interface ModeloVeiculoForm {
  codModelo?: number;
  nomeModelo: string;
  tipo: string;
  codMarca?: number;
}

const NovoModeloVeiculo: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
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
  const handleNavigate = () => {
    navigate("/modelos-veiculos");
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
        return;
      }

      console.log("Resposta do servidor:", response.data);
      setFormData({
        codModelo: undefined,
        nomeModelo: "",
        tipo: "",
        codMarca: undefined,
      });
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao cadastrar Veiculo. Tente novamente.");
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
          {message}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>Cancelar</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modalContent">
              <h2>Modelo cadastrado com sucesso!</h2>
              <button onClick={handleNavigate}>Voltar à Página Inicial</button>
            </div>
          </div>
        )}
        {showModal2 && (
          <div className="modal">
            <div className="modalContent2">
              <h2>Certeza que deseja sair?</h2>
              <p>Qualquer mudança não salva será perdida!</p>
              <button onClick={() => setShowModal2(false)}>Cancelar</button>
              <button onClick={handleNavigate}>Voltar à Página Inicial</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NovoModeloVeiculo;
