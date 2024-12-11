import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import DenseTable from "../../components/table/page";
import "./styles.css";
import Filter from "../../components/filter/page";

function Associado() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/novo-associado");
  };

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="inside">
          <Filter />
          <div>
            <button className="newBtn" onClick={handleNavigate}>
              NOVO ASSOCIADO
            </button>
            <DenseTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Associado;
