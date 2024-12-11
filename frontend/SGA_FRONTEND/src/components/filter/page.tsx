import { FaBullhorn, FaCar, FaUsers } from "react-icons/fa6";

export default function Filter() {
  return (
    <div className="filter">
      <div className="amount">
        <FaUsers size={18} color="black" />
        <p>232 Associados</p>
      </div>
      <div className="amount">
        <FaCar size={18} color="black" />
        <p>283 Veículos</p>
      </div>
      <div className="amount">
        <FaBullhorn size={18} color="black" />
        <p>23 Sinistros</p>
      </div>
      <div className={"line"}></div>
      <p>Filtrar por:</p>
      <p className="pLabel">Data de Contrato:</p>
      <div className="dateFilter">
        <input type="text" placeholder="DD/MM/YYYY" />
        <p>Até</p>
        <input type="text" placeholder="DD/MM/YYYY" />
      </div>
      <p className="pLabel">Cidade</p>
      <input
        type="text"
        placeholder="Vitória da Conquista"
        style={{ height: "25px", width: "100%" }}
      />
      <div className="lastInputs">
        <div>
          <p className="pLabel">Categoria</p>
          <input type="text" placeholder="AB" />
        </div>
        <div>
          <p className="pLabel">Automóvel</p>
          <input type="text" placeholder="Carro" />
        </div>
      </div>
    </div>
  );
}
