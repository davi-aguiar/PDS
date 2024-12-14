import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";
import PopupEvento from "../../components/removeEvento/page";

function EditarEvento() {
  const location = useLocation();
  const { evento: eventoData } = location.state; // Pega os dados passados pela navegação
  const [evento, setEvento] = useState(eventoData);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Carrega dados do evento ao montar o componente
  useEffect(() => {
    async function fetchEvento() {
      try {
        const response = await axios.get(
          `http://localhost:3000/eventos/buscar/${eventoData.protocolo}`
        );
        setEvento(response.data);
      } catch (error) {
        setMessage("Erro ao carregar os dados do evento.");
        console.error("Erro ao buscar evento:", error);
      }
    }
    fetchEvento();
  }, [eventoData.protocolo]);

  const handleEventoChange = (field: string, value: string) => {
    setEvento({ ...evento, [field]: value });
  };

  const handleSubmit = async () => {
    // Filtra apenas os dados necessários para a rota PATCH
    const eventoFiltrado = {
      protocolo: evento.protocolo,
      data_evento: evento.data_evento,
      tipo_ocorrencia: evento.tipo_ocorrencia,
      endereco_evento: evento.endereco_evento,
      chassi: evento.chassi,
      matriculaAssociado: evento.matriculaAssociado,
      matriculaFuncionario: evento.matriculaFuncionario,
    };

    try {
      await axios.patch(
        `http://localhost:3000/eventos/atualizar/${eventoData.protocolo}`,
        eventoFiltrado,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowModal(true);
      setMessage("");
    } catch (error) {
      setMessage("Erro ao atualizar evento. Tente novamente.");
      console.error("Detalhes do erro: ", error);
    }
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/eventos");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Editar Evento</h1>

          <DropDown
            title="Dados do Evento"
            type="evento"
            onChange={handleEventoChange}
            formData={evento}
          />

          {message && <p>{message}</p>}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>CANCELAR</button>
          <PopupEvento
            type="!icon"
            protocolo={evento.protocolo}
            descricaoEvento={evento.tipo_ocorrencia}
          />
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <p>{message}</p>
            <h2>Evento atualizado com sucesso!</h2>
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

export default EditarEvento;
