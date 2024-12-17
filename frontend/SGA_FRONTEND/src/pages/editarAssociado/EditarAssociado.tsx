import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  // Função para formatar a data para DD/MM/YYYY
  const formatDateToDDMMYYYY = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  // Carrega dados do associado ao montar o componente
  useEffect(() => {
    async function fetchAssociado() {
      try {
        const response = await axios.get(
          `http://localhost:3000/associados/${associadoData.matricula}`
        );

        // Formata a data_nascimento para DD/MM/YYYY
        const associadoComDataFormatada = {
          ...response.data,
          data_nascimento: formatDateToDDMMYYYY(response.data.data_nascimento),
        };

        setAssociado(associadoComDataFormatada);
      } catch (error) {
        setMessage("Erro ao carregar os dados do associado.");
        console.error("Erro ao buscar associado:", error);
      }
    }
    fetchAssociado();
  }, [associadoData.matricula]);

  // Função de alteração do campo do associado
  const handleAssociadoChange = (field: string, value: string) => {
    setAssociado({ ...associado, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      // Converte a data_nascimento para o formato ISO antes de salvar
      const [day, month, year] = associado.data_nascimento.split('/');
      const isoDate = `${year}-${month}-${day}`;

      // Atualiza o estado com a data formatada para ISO
      const associadoComDataISO = { ...associado, data_nascimento: isoDate };

      await axios.put(
        `http://localhost:3000/associados/atualizar/${associadoData.matricula}`,
        associadoComDataISO,
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
          {/* <DropDown
            title="Dados do Veículo"
            type="veiculo"
            onChange={handleVeiculoChange}
            formData={veiculo}
          /> */}

          {message && <p>{message}</p>}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>CANCELAR</button>
          <Popup
            type="!icon"
            matricula={associado.matricula}
            name={associado.nome}
          />
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
