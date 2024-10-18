import { useState } from "react";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";

function NovoAssociado() {
  const [associado, setAssociado] = useState({
    nome: "",
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
    data_nascimento: ""
  });

  const [message, setMessage] = useState("");

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
      setMessage("Associado cadastrado com sucesso!");
    } catch (error) {
      console.log(associado);
      console.log("Error details: ", error);

      setMessage("Erro ao cadastrar associado. Tente novamente.");
    }
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
          />

          <button onClick={handleSubmit}>Cadastrar Associado</button>

          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default NovoAssociado;
