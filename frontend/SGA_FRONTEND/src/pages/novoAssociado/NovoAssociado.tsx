import { useState } from "react";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NovoAssociado() {
  const [associado, setAssociado] = useState({
    nome: "",
    cpf_cnpj: "",
    end_cep: "",
    end_logradouro: "",
    end_cidade: "",
    end_bairro: "",
    end_numero: "",
    end_complemento: "",
    cnh: "",
    tipo: "FISICA",
    rg: "",
    telefone: "",
    data_nascimento: "", // Data no formato DD/MM/YYYY
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  // Função para converter a data para o formato YYYY/MM/DD
  const convertToServerDate = (date: string) => {
    const [day, month, year] = date.split("/"); // Divide a data no formato DD/MM/YYYY
    return `${year}/${month}/${day}`; // Retorna no formato YYYY/MM/DD
  };

  const handleAssociadoChange = (field: string, value: string) => {
    setAssociado({ ...associado, [field]: value });
  };

  const handleErrorsChange = (errors: Record<string, string>) => {
    setFormErrors(errors);
  };

  const handleSubmit = async () => {
    // Verifica se há erros no formulário
    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    if (hasErrors) {
      setMessage("Por favor, corrija os erros no formulário antes de enviar.");
      return;
    }

    try {
      // Converte a data de nascimento antes de enviar os dados
      const associadoParaEnviar = {
        ...associado,
        data_nascimento: associado.data_nascimento
          ? convertToServerDate(associado.data_nascimento)
          : "",
      };

      await axios.post(
        "http://localhost:3000/associados/cadastrar",
        associadoParaEnviar,
        { headers: { "Content-Type": "application/json" } }
      );

      setShowModal(true);
      setMessage("");
    } catch (error) {
      console.log("Error details: ", error);
      setMessage("Erro ao cadastrar associado. Tente novamente.");
    }
  };

  const handleNavigate = () => {
    navigate("/associado");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Cadastrar Novo Associado</h1>

          <DropDown
            title="Dados do Associado"
            type="associado"
            onChange={handleAssociadoChange}
            formData={associado}
            onErrorsChange={handleErrorsChange}
          />
          {message && <p>{message}</p>}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>CANCELAR</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <h2>Associado cadastrado com sucesso!</h2>
            <button onClick={handleNavigate}>Voltar à Página Inicial</button>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="modal">
          <div className="modalContent2">
            <p>{message}</p>
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

export default NovoAssociado;
