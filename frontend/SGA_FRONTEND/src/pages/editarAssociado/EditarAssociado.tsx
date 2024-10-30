import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DropDown from "../../components/dropdown/page";
import "./styles.css";
import axios from "axios";

function EditAssociado() {
  const { id } = useParams(); // Obter o id do associado da URL
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

  // Carregar dados do associado ao montar o componente
  useEffect(() => {
    async function fetchAssociado() {
      try {
        const response = await axios.get(`http://localhost:3000/associados/${id}`);
        setAssociado(response.data);
      } catch (error) {
        setMessage("Erro ao carregar os dados do associado.");
        console.error("Erro ao buscar associado:", error);
      }
    }
    fetchAssociado();
  }, [id]);

  const handleAssociadoChange = (field: string, value: string) => {
    setAssociado({ ...associado, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/associados/atualizar/${id}`,
        associado,
        { headers: { "Content-Type": "application/json" } }
      );
      setMessage("Associado atualizado com sucesso!");
    } catch (error) {
      setMessage("Erro ao atualizar associado. Tente novamente.");
      console.error("Error details: ", error);
    }
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
          <button>CANCELAR</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>
      </div>
    </div>
  );
}

export default EditAssociado;
