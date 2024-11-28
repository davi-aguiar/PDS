import { useNavigate } from "react-router-dom";
import Dash from "../../components/dashboard/page";
function Financeiros() {
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
          onClick={() => handleNavigate("novo-financeiro")}
        >
          NOVO FINANCEIRO
        </button>
      </div>
    </div>
  );
}
export default Financeiros;
