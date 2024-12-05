import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import ModeloTable from "../../components/modeloTable/page";
function ModeloVeiculo() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className="container">
      <Dash />
      <div className="content">
        <button
          className="newBtn"
          onClick={() => handleNavigate("novo-modelo")}
        >
          NOVO MODELO
        </button>
        <ModeloTable />
      </div>
    </div>
  );
}
export default ModeloVeiculo;
