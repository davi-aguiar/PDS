import Dash from "../../components/dashboard/page";
import Search from "../../components/search/page";
import "./styles.css";
import DropDown from "../../components/dropdown/page";
import Popup from "../../components/remove/page";

export default function EditarAssociado() {
  return (
    <div className="container">
      <Dash />
      <div className="content">
        <Search />
        <div className="register">
          <h1>Editar Associado</h1>
          <DropDown title="Dados do Associado" type="associado" />
          <DropDown title="Dados do Veículo" type="" />
          <DropDown title="Dados do Seguro" type="associado" />
          <DropDown title="Informações Financeiras" type="associado" />
        </div>
        <div className="divButtons">
          <Popup type="button"/>
          <button>EDITAR</button>
        </div>
      </div>
    </div>
  );
}
