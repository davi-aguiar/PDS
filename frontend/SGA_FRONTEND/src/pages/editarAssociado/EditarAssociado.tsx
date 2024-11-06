import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/remove/page";

function EditAssociado() {
  const location = useLocation();
  const { associado: associadoData } = location.state; // Pega os dados passados pela navegação
  const [associado, setAssociado] = useState(associadoData);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Carrega dados do associado ao montar o componente
  useEffect(() => {
    async function fetchAssociado() {
      try {
        const response = await axios.get(
          `http://localhost:3000/associados/${associadoData.matricula}`
        );
        setAssociado(response.data);
      } catch (error) {
        setMessage("Erro ao carregar os dados do associado.");
        console.error("Erro ao buscar associado:", error);
      }
    }
    fetchAssociado();
  }, [associadoData.matricula]);

  const handleAssociadoChange = (field: string, value: string) => {
    setAssociado({ ...associado, [field]: value });
  };

  const handleCancel = () => {
    navigate("/associado");
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/associados/atualizar/${associadoData.matricula}`,
        associado,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowModal(true);
      setMessage("");
    } catch (error) {
      setMessage("Erro ao atualizar associado. Tente novamente.");
      console.error("Detalhes do erro: ", error);
    }
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/associado");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Editar Associado</h1>

          <DropDown
            title="Dados do Associado"
            type="associado"
            onChange={handleAssociadoChange}
            formData={associado}
          />

          {message && <p>{message}</p>}
        </div>
        <div className="divButtons">
          <button onClick={handleCancel}>CANCELAR</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>{message}</p>
            <h2>Associado atualizado com sucesso!</h2>
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

export default EditAssociado;
