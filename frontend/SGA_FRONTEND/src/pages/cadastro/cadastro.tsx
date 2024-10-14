import alpha from "../../assets/Forma 4.png";
import "./styles.css";

function Cadastro() {
  return (
    <main className={"main"}>
      <div className={"cardd"}>
        <img src={alpha} alt={"logo"} />
        <div className="solidao">
          <div className={"inputDiv"}>
            <p className="label">Nome do usuário</p>
            <input type="text" className={"input"} />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Seu e-mail</p>
            <input type="text" className={"input"} />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Sua senha</p>
            <input type="text" className={"input"} />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Confirme sua senha</p>
            <input type="text" className={"input"} />
          </div>
          <button>Registre-se</button>
          <a href="/">Já possuo uma conta</a>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;
