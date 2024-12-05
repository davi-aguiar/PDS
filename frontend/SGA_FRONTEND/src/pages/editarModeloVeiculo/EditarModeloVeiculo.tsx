import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";
import Popup from "../../components/remove/page";

function EditarModeloVeiculo() {
  const location = useLocation();
  const { modelo: modeloData } = location.state; // Pega os dados passados pela navegação
  const [modelo, setModelo] = useState(modeloData);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Carrega dados do modelo ao montar o componente
  useEffect(() => {
    async function fetchModelo() {
      try {
        const response = await axios.get(
          `http://localhost:3000/modelo/buscar/${modeloData.codModelo}`
        );
        setModelo(response.data);
      } catch (error) {
        setMessage("Erro ao carregar os dados do modelo.");
        console.error("Erro ao buscar modelo:", error);
      }
    }
    fetchModelo();
  }, [modeloData.codModelo]);

  const handleModeloChange = (field: string, value: string) => {
    setModelo({ ...modelo, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/modelo/atualizar/${modeloData.codModelo}`,
        modelo,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowModal(true);
      setMessage("");
    } catch (error) {
      setMessage("Erro ao atualizar modelo. Tente novamente.");
      console.error("Detalhes do erro: ", error);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/modelos-veiculos");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Editar Modelo de Veículo</h1>

          <DropDown
            title="Dados do Modelo"
            type="modelo_veiculo"
            onChange={handleModeloChange}
            formData={modelo}
          />

          {message && <p>{message}</p>}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>CANCELAR</button>
          <Popup
            type="!icon"
            codModelo={modelo.codModelo}
            nomeModelo={modelo.nomeModelo}
          />
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>{message}</p>
            <h2>Modelo atualizado com sucesso!</h2>
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
  );
}

export default EditarModeloVeiculo;
