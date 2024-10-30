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
    data_nascimento: "",
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();

  const handleAssociadoChange = (field: string, value: string) => {
    setAssociado({ ...associado, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/associados/cadastrar",
        associado,
        { headers: { "Content-Type": "application/json" } }
      );
      setShowModal(true);
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
            <p>{message}</p>
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
