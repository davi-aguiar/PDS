import Dash from "../../components/dashboard/page";
import DropDown from "../../components/dropdown/page";

function NovoModeloVeiculo() {
  return (
    <div className="container">
      <Dash />
      <div className="content">
        <div className="register">
        <h1>Cadastrar Novo Modelo de Veículo</h1>
          <DropDown
            title="Modelo de Veículo"
            type="modelo_veiculo"
            onChange={(field, value) => console.log(field, value)}
            formData={{
              modelo_nome: "",
              modelo_marca: "",
              modelo_fipe: "",
              modelo_ano: "",
              modelo_combustivel: "",
              modelo_transmissao: "",
              modelo_portas: "",
            }}
          />
        </div>
        <div className="divButtons">
          <button>CANCELAR</button>
          <button>SALVAR</button>
        </div>
      </div>
    </div>
  );
}

export default NovoModeloVeiculo;
