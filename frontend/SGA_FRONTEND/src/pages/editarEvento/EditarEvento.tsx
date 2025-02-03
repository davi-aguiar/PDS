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
  const [placa, setPlaca] = useState(""); // Placa do primeiro veículo
  const [associado, setAssociado] = useState(""); // Nome do associado
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Função para formatar a data para DD/MM/YYYY
  const formatDateToDDMMYYYY = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Carrega dados do evento ao montar o componente
  useEffect(() => {
    async function fetchEvento() {
      try {
        const response = await axios.get(
          `http://localhost:3000/eventos/buscar/${eventoData.protocolo}`
        );
        console.log(response.data);

        // Extrair nome do associado
        setAssociado(response.data.associado.nome);

        // Extrair placa do primeiro veículo
        if (response.data.veiculos && response.data.veiculos.length > 0) {
          setPlaca(response.data.veiculos[0].veiculo.placa);
        } else {
          setPlaca("N/A"); // Caso não haja veículos associados
        }

        // Formata a data_evento para DD/MM/YYYY
        const eventoComDataFormatada = {
          ...response.data,
          data_evento: formatDateToDDMMYYYY(response.data.data_evento),
        };
        setEvento(eventoComDataFormatada);
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
    try {
      // Converte a data_evento para o formato ISO
      const [day, month, year] = evento.data_evento.split("/");
      const isoDate = `${year}-${month}-${day}T00:00:00Z`;

      // Filtra apenas os campos aceitos pela API
      const eventoFiltrado = {
        data_evento: isoDate,
        tipo_ocorrencia: evento.tipo_ocorrencia,
        endereco_evento: evento.endereco_evento,
        chassi: evento.chassi,
        matriculaAssociado: evento.matriculaAssociado,
        matriculaFuncionario: evento.matriculaFuncionario,
      };

      await axios.patch(
        `http://localhost:3000/eventos/atualizar/${eventoData.protocolo}`, // Protocolo na URL
        eventoFiltrado, // Dados no corpo
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
        <h1>Editar Evento</h1>
        <div className="register VeicCont">
          <DropDown
            title="Dados do Evento"
            type="evento"
            onChange={handleEventoChange}
            formData={evento}
          />
          <br />
          <div className="searchAssDiv">
            <div>
              <p>Associado responsável pelo veículo: {associado}</p>
            </div>
            <div>
              <p>Placa do Veículo: {placa}.</p>
            </div>
          </div>
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