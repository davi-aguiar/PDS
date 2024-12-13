import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Filter from "../../components/filter/page";
import TableVeic from "../../components/tableVeiculos/page";
import SearchVeiculo from "../../components/searchVeiculo/page";

function Veiculos() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <SearchVeiculo />
        <div className="inside">
          <Filter />
          <div>
            <button
              className="newBtn"
              onClick={() => handleNavigate("novo-veiculo")}
            >
              NOVO VEICULO
            </button>
            <TableVeic />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Veiculos;
