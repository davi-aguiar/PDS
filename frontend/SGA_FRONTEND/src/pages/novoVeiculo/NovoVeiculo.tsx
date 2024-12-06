import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useEffect, useState } from "react";
import "./styles.css";
import Autocomplete from "../../components/select/page";

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
}

function NovoVeiculo() {
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [veiculo, setVeiculo] = useState({
    chassi: "",
    esp_renavam: "",
    placa: "",
    esp_cor: "",
    codModelo: "",
    esp_numero_motor: "",
    cod_fipe: "",
    mensalidade: "",
  });

  const handleVeiculoChange = (field: string, value: string) => {
    setVeiculo({ ...veiculo, [field]: value });
  };

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

  const data = associados.map((associado) => associado.nome);

  const handleAssociado = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <div className="register">
          <h1>Cadastrar Novo Modelo de Veículo</h1>
          <Autocomplete
            data={data}
            title="Selecione um associado."
            placeholder="Digite para buscar..."
            onSelect={handleAssociado}
          />
          <DropDown
            title="Dados do Veículo"
            type="veiculo"
            onChange={handleVeiculoChange}
            formData={veiculo}
          />
        </div>
        <div className="divButtons">
          <button>CANCELAR</button>
          <button>SALVAR</button>
        </div>
      </div>
    </div>
  );
}

export default NovoVeiculo;
