import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import ModeloTable from "../../components/modeloTable/page";
import SearchModelo from "../../components/searchModelo/page";
function ModeloVeiculo() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className="container">
      <Dash />
      <div className="content">
        <SearchModelo />
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
