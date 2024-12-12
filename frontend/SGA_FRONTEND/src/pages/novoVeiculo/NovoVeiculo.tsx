import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useEffect, useState } from "react";
import "./styles.css";
import Autocomplete from "../../components/select/page";
import { useNavigate } from "react-router-dom";

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
}

interface VeiculoForm {
  chassi?: string;
  esp_renavam?: string;
  placa?: string;
  esp_cor?: string;
  esp_numero_motor?: string;
  cod_fipe?: string;
  codModelo?: number;
  mensalidade?: string;
}
interface VeiculoAssForm {
  chassi?: string;
  matricula?: string;
  matriculaFuncionario?: number;
  taxaAdesao?: string;
}

interface ModeloVeiculo {
  codModelo: number;
  nomeModelo: string;
  tipo: string;
  marca: {
    codMarca: number;
    nomeMarca: string;
  };
}

function NovoVeiculo() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VeiculoForm>({
    chassi: "",
    esp_renavam: "",
    placa: "",
    esp_cor: "",
    esp_numero_motor: "",
    cod_fipe: "",
    mensalidade: "",
    codModelo: undefined,
  });
  const [formDataAss, setFormDataAss] = useState<VeiculoAssForm>({
    matricula: "",
    chassi: "",
    matriculaFuncionario: 1,
    taxaAdesao: "123",
  });

  const handleVeiculoChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/modelo/buscar");
        const modelosData = response.data;

        const sortedModelos = modelosData.sort(
          (a: ModeloVeiculo, b: ModeloVeiculo) =>
            a.nomeModelo.localeCompare(b.nomeModelo)
        );

        setModelos(sortedModelos);
      } catch (error) {
        console.error("Erro ao buscar modelos:", error);
      }
    };

    fetchModelos();
  }, []);
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/veiculos/register",
        formData
      );

      if (response.status !== 201) {
        console.error("Erro na resposta do servidor:", response.data);
        return;
      }

      const updatedFormDataAss = { ...formDataAss, chassi: formData.chassi };

      await associate(updatedFormDataAss);
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao cadastrar Veiculo. Tente novamente.");
    }
  };

  const associate = async (formData: typeof formDataAss) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/veiculos/associar",
        formData
      );

      if (response.status !== 201) {
        console.error("Erro na resposta do servidor:", response.data);
        return;
      }
      setShowModal(true);
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao cadastrar Veiculo. Tente novamente.");
    }
  };

  const data = associados.map((associado) => associado.nome);
  const nomesModelos = modelos.map((modelo) => modelo.nomeModelo);

  const handleAssociado = (value: string) => {
    const associadoEncontrado = associados.find(
      (associado) => associado.nome.toLowerCase() === value.toLowerCase()
    );

    if (associadoEncontrado) {
      setFormDataAss({
        ...formDataAss,
        matricula: associadoEncontrado.matricula,
      });
    } else {
      console.log("Associado não encontrado.");
    }
  };

  const handleModelo = (value: string) => {
    const modeloEncontrado = modelos.find(
      (associado) => associado.nomeModelo.toLowerCase() === value.toLowerCase()
    );

    if (modeloEncontrado) {
      setFormData({ ...formData, codModelo: modeloEncontrado.codModelo });
    } else {
      console.log("Associado não encontrado.");
    }
  };

  const handleNavigate = () => {
    navigate("/veiculos");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <h1>Cadastrar Novo Modelo de Veículo</h1>
        <div className="register VeicCont">
          <DropDown
            title="Dados do Veículo"
            type="veiculo"
            onChange={handleVeiculoChange}
            formData={formData}
          />
          <br />
          <div className="searchAssDiv">
            <div>
              <p>Selecione um associado.</p>
              <Autocomplete
                data={data}
                title=""
                placeholder="Digite para buscar..."
                onSelect={handleAssociado}
              />
            </div>
            <div>
              <p>Selecione um modelo.</p>
              <Autocomplete
                data={nomesModelos}
                title=""
                placeholder="Digite o Modelo"
                onSelect={handleModelo}
              />
            </div>
          </div>
          <br />
          {message}
        </div>
        <div className="divButtons">
          <button onClick={() => setShowModal2(true)}>CANCELAR</button>
          <button onClick={handleSubmit}>SALVAR</button>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modalContent">
              <h2>Veiculo cadastrado com sucesso!</h2>
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
}

export default NovoVeiculo;
