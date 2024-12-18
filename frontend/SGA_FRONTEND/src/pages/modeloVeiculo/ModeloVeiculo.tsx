import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import ModeloTable from "../../components/modeloTable/page";
import SearchModelo from "../../components/searchModelo/page";
import Filter from "../../components/filter/page";
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
        <div className="inside">
          <Filter />
          <div>
            <button
              className="newBtn"
              onClick={() => handleNavigate("novo-modelo")}
            >
              NOVO MODELO
            </button>
            <ModeloTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModeloVeiculo;
