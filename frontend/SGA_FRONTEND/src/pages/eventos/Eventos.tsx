import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import EventoTable from "../../components/eventoTable/page";
import SearchEvento from "../../components/searchEvento/page";
import Filter from "../../components/filter/page";
import "./styles.css";
function Eventos() {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <div className="container">
      <Dash />
      <div className="content">
        <SearchEvento />
        <div className="inside">
          <Filter />
          <div>
            <button
              className="newBtn"
              onClick={() => handleNavigate("novo-evento")}
            >
              NOVO EVENTO
            </button>
            <EventoTable />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Eventos;
