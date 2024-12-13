import React, { useState } from "react";
import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useNavigate } from "react-router-dom";

// Definindo os tipos para os dados do formulário
interface EventoForm {
  data_evento: string;
  tipo_ocorrencia: string;
  endereco_evento: string;
  chassi: string;
  matriculaAssociado: string;
  matriculaFuncionario: number | undefined;
}

const NovoEvento: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<EventoForm>({
    data_evento: "",
    tipo_ocorrencia: "",
    endereco_evento: "",
    chassi: "",
    matriculaAssociado: "",
    matriculaFuncionario: undefined,
  });

  const handleChange = (field: keyof EventoForm, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNavigate = () => {
    navigate("/eventos");
  };

  const handleSubmit = async () => {
    try {
      // Converte a data no formato dd/mm/yyyy para yyyy-mm-dd
      const [day, month, year] = formData.data_evento.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}`).toISOString();

      // Garante que 'matriculaFuncionario' seja um número
      const matriculaFuncionario = formData.matriculaFuncionario ? Number(formData.matriculaFuncionario) : undefined;

      const convertedData = {
        ...formData,
        data_evento: formattedDate,
        matriculaFuncionario, // Garantindo que matriculaFuncionario é um número
      };

      console.log("Dados enviados:", convertedData);

      const response = await axios.post(
        "http://localhost:3000/eventos/cadastrar",
        convertedData
      );

      if (response.status !== 201) {
        console.error("Erro na resposta do servidor:", response.data);
        return;
      }

      console.log("Resposta do servidor:", response.data);
      // Reseta o formulário após o sucesso
      setFormData({
        data_evento: "",
        tipo_ocorrencia: "",
        endereco_evento: "",
        chassi: "",
        matriculaAssociado: "",
        matriculaFuncionario: undefined,
      });
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao cadastrar evento. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <div className="register">
          <h1>Cadastrar Novo Evento</h1>
          <DropDown
            title="Evento"
            type="evento"
            onChange={(field, value) =>
              handleChange(field as keyof EventoForm, value)
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
              <h2>Evento cadastrado com sucesso!</h2>
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

export default NovoEvento;
