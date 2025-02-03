import React, { useEffect, useState } from "react";
import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../../components/select/page";
import "./styles.css";

// Definindo os tipos para os dados do formulário
interface EventoForm {
  data_evento: string;
  tipo_ocorrencia: string;
  endereco_evento: string;
  chassi: string[]; // <- Agora é um array
  matriculaAssociado: string;
  matriculaFuncionario: number | undefined;
}

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
}
interface Veiculo {
  chassi: string;
  placa: string;
  cor: string;
  modelo: number;
}
interface VeicAssociados {
  matricula: string;
  nome: string;
  veiculos: Veiculo[];
}

const NovoEvento: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [veicAssociados, setVeicAssociados] = useState<VeicAssociados[]>([]);
  const [formData, setFormData] = useState<EventoForm>({
    data_evento: "",
    tipo_ocorrencia: "",
    endereco_evento: "",
    chassi: [], // <- Agora é um array
    matriculaAssociado: "",
    matriculaFuncionario: 1,
  });
  
  const [veiculosFiltrados, setVeiculosFiltrados] = useState<Veiculo[]>([]);

  useEffect(() => {
    const fetchAssociados = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/associados/listar"
        );
        setAssociados(response.data.associados);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchAssociados();
  }, []);

  useEffect(() => {
    const fetchVeiculos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/veiculos/associados-veiculos"
        );

        const associadosComVeiculos = response.data.associados
          .filter(
            (associado: { veiculos: any[] }) => associado.veiculos.length > 0
          )
          .sort((a: { nome: string }, b: { nome: string }) =>
            a.nome.localeCompare(b.nome)
          );

        setVeicAssociados(associadosComVeiculos);
      } catch (error) {
        console.error("Erro ao buscar associados:", error);
      }
    };

    fetchVeiculos();
  }, []);

  const handleChange = (field: keyof EventoForm, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNavigate = () => {
    navigate("/eventos");
  };

  const handleAssociado = (value: string) => {
    const associadoEncontrado = associados.find(
      (associado) => associado.nome.toLowerCase() === value.toLowerCase()
    );

    if (associadoEncontrado) {
      setFormData((prev) => ({
        ...prev,
        matriculaAssociado: associadoEncontrado.matricula,
      }));

      // Filtrar os veículos do associado selecionado
      const veiculos =
        veicAssociados.find(
          (veicAssoc) => veicAssoc.matricula === associadoEncontrado.matricula
        )?.veiculos || [];

      setVeiculosFiltrados(veiculos);
    } else {
      console.log("Associado não encontrado.");
      setVeiculosFiltrados([]); // Resetar os veículos caso nenhum associado seja encontrado
    }
  };

  const handleVeiculo = (value: string) => {
    const veiculoSelecionado = veiculosFiltrados.find(
      (veiculo) => veiculo.placa === value
    );
  
    if (veiculoSelecionado) {
      setFormData((prev) => ({
        ...prev,
        chassi: [...prev.chassi, veiculoSelecionado.chassi], // <- Agora adiciona ao array
      }));
    }
  };
  

  const handleSubmit = async () => {
    try {
      const [day, month, year] = formData.data_evento.split("/");
      const formattedDate = new Date(`${year}-${month}-${day}`).toISOString();
      const matriculaFuncionario = formData.matriculaFuncionario
        ? Number(formData.matriculaFuncionario)
        : undefined;
  
      const convertedData = {
        data_evento: formattedDate,
        tipo_ocorrencia: formData.tipo_ocorrencia,
        endereco_evento: formData.endereco_evento,
        veiculos: Array.isArray(formData.chassi) ? formData.chassi : [formData.chassi], // Renomear para 'veiculos'
        matriculaAssociado: formData.matriculaAssociado,
        matriculaFuncionario,
      };
  
      console.log("Dados enviados ao backend:", convertedData); // Adicione este log
  
      const response = await axios.post(
        "http://localhost:3000/eventos/cadastrar",
        convertedData
      );
  
      if (response.status !== 201) {
        console.error("Erro na resposta do servidor:", response.data);
        return;
      }
  
      console.log("Resposta do servidor:", response.data);
  
      setFormData({
        data_evento: "",
        tipo_ocorrencia: "",
        endereco_evento: "",
        chassi: [], // Limpar o campo 'chassi'
        matriculaAssociado: "",
        matriculaFuncionario: 1,
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
        <h1>Cadastrar Novo Evento</h1>
        <div className="register VeicCont">
          <DropDown
            title="Evento"
            type="evento"
            onChange={(field, value) =>
              handleChange(field as keyof EventoForm, value)
            }
            formData={formData}
          />
          <br />
          <div className="searchAssDiv">
            <div>
              <p>Selecione um associado.</p>
              <Autocomplete
                data={associados.map((associado) => associado.nome)}
                title=""
                placeholder="Digite para buscar..."
                onSelect={handleAssociado}
              />
            </div>
            <div>
              <p>Selecione um veiculo.</p>
              <Autocomplete
                data={veiculosFiltrados.map((veiculo) => veiculo.placa)}
                title=""
                placeholder="Digite o chassi..."
                onSelect={handleVeiculo}
              />
            </div>
          </div>
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
