import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import "./styles.css";
import DropDown from "../../components/dropdown/page";

function NovoAssociado() {

  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Cadastrar Novo Associado</h1>
          <DropDown title="Dados Do Associado" content="AAAAAAAAAAAAAAA"/>
        </div>
      </div>
    </div>
  );
}

export default NovoAssociado;
