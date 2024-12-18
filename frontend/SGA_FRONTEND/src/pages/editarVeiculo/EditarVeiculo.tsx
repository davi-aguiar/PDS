import axios from "axios";
import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";
import { useEffect, useState } from "react";
import "./styles.css";
import { useLocation, useNavigate } from "react-router-dom";
import PopupVeiculo from "../../components/removeVeiculo/page";

interface Associado {
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
}

interface Associado2 {
  nome: string;
  matricula: string;
  cpf_cnpj: string;
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

interface VeiculoEncontrado {
  chassi?: string;
  esp_renavam?: string;
  placa?: string;
  esp_cor?: string;
  esp_numero_motor?: string;
  cod_fipe?: string;
  codModelo?: number;
  mensalidade?: string;
  associado?: Associado2;
}

function EditVeiculo() {
  const location = useLocation();
  const { chassi } = location.state; // Pega os dados passados pela navegação
  const [associados, setAssociados] = useState<Associado[]>([]);
  const [modelos, setModelos] = useState<ModeloVeiculo[]>([]);
  const [activeModal, setActiveModal] = useState<
    "none" | "success" | "confirmExit"
  >("none");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VeiculoForm>({});
  const [sla, setsla] = useState<VeiculoEncontrado>({});
  const [formDataAss, setFormDataAss] = useState<VeiculoAssForm>({
    matriculaFuncionario: 1,
    taxaAdesao: "123",
  });

  const handleVeiculoChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchData = async () => {
    try {
      const [modelosResponse, associadosResponse, veiculoResponse] =
        await Promise.all([
          axios.get("http://localhost:3000/modelo/buscar"),
          axios.get("http://localhost:3000/associados/listar"),
          axios.get(
            `http://localhost:3000/veiculos/associados-veiculos/${chassi}`
          ),
        ]);

      setModelos(
        modelosResponse.data.sort((a: ModeloVeiculo, b: ModeloVeiculo) =>
          a.nomeModelo.localeCompare(b.nomeModelo)
        )
      );
      setAssociados(associadosResponse.data.associados);
      await setsla(veiculoResponse.data.veiculo);
      const selectedMarca = await modelos.find(
        (marca) => marca.codModelo === sla.codModelo
      );
      const veiculoEncontrado: VeiculoEncontrado = veiculoResponse.data.veiculo;
      if (veiculoEncontrado) {
        setFormData({
          chassi: veiculoEncontrado.chassi,
          esp_renavam: veiculoEncontrado.esp_renavam,
          placa: veiculoEncontrado.placa,
          esp_cor: veiculoEncontrado.esp_cor,
          esp_numero_motor: veiculoEncontrado.esp_numero_motor,
          cod_fipe: veiculoEncontrado.cod_fipe,
          mensalidade: veiculoEncontrado.mensalidade,
          codModelo: veiculoEncontrado.codModelo,
        });

        if (veiculoEncontrado.associado) {
          setFormDataAss((prevState) => ({
            ...prevState,
            matricula: veiculoEncontrado.associado.matricula,
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/veiculos/atualizar/${chassi}`,
        formData
      );

      if (response.status !== 200) {
        console.error("Erro na resposta do servidor:", response.data);
        return;
      }
      setActiveModal("success");
    } catch (err) {
      console.error("Erro ao conectar com o servidor:", err);
      setMessage("Erro ao cadastrar Veiculo. Tente novamente.");
    }
  };

  const handleNavigate = () => {
    navigate("/veiculos");
  };

  const hasUnsavedChanges =
    JSON.stringify(formData) !== JSON.stringify({}) ||
    JSON.stringify(formDataAss) !== JSON.stringify({});

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setActiveModal("confirmExit");
    } else {
      handleNavigate();
    }
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <h1>Editar Veículo</h1>
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
              <p>
                Associado responsável pelo veículo:{" "}
                {sla.chassi ? sla.associado[0].nome : ""}.
              </p>
            </div>
            <div>
              <p>
                Modelo do veículo:{" "}
                {
                  modelos.find((marca) => marca.codModelo === sla.codModelo)
                    ?.nomeModelo
                }
                .
              </p>
            </div>
          </div>
          {message}
        </div>
        <div className="divButtons">
          <button onClick={handleCancel}>CANCELAR</button>
          <PopupVeiculo type="button" chassi={sla.chassi} placa={sla.placa} />
          <button onClick={handleSubmit}>SALVAR</button>
        </div>

        {activeModal === "success" && (
          <div className="modal">
            <div className="modalContent">
              <h2>Veiculo atualizado com sucesso!</h2>
              <button onClick={handleNavigate}>Voltar à Página Inicial</button>
            </div>
          </div>
        )}
        {activeModal === "confirmExit" && (
          <div className="modal">
            <div className="modalContent2">
              <h2>Certeza que deseja sair?</h2>
              <p>Qualquer mudança não salva será perdida!</p>
              <button onClick={() => setActiveModal("none")}>Cancelar</button>
              <button onClick={handleNavigate}>Voltar à Página Inicial</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditVeiculo;
