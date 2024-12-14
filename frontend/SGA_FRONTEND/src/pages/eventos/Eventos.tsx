import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
import EventoTable from "../../components/eventoTable/page";
import SearchEvento from "../../components/searchEvento/page";
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
        <button
          className="newBtn"
          onClick={() => handleNavigate("novo-evento")}
        >
          NOVO EVENTO
        </button>
        <EventoTable />
      </div>
    </div>
  );
}
export default Eventos;
