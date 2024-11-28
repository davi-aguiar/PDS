import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
function Eventos() {
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
          onClick={() => handleNavigate("novo-evento")}
        >
          NOVO EVENTO
        </button>
      </div>
    </div>
  );
}
export default Eventos;
