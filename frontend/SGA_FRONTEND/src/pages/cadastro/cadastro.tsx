import alpha from "../../assets/Forma 4.png";
import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/funcionarios/register",
        {
          nome: nome,
          email: email,
          senha: password
        }
      );

      if (response.status === 201 || response.data.message) {
        navigate("/");
      } else {
        setError("Erro ao criar a conta, tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro no servidor, tente novamente mais tarde.");
    }
  };

  return (
    <main className={"main"}>
      <div className={"cardd"}>
        <img src={alpha} alt={"logo"} />
        <div className="solidao">
          <div className={"inputDiv"}>
            <p className="label">Nome do usuário</p>
            <input
              type="text"
              className={"input"}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Seu e-mail</p>
            <input
              type="text"
              className={"input"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Sua senha</p>
            <input
              type="password"
              className={"input"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={"inputDiv"}>
            <p className="label">Confirme sua senha</p>
            <input
              type="password"
              className={"input"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleRegister}>Registre-se</button>
          {error && <p className="error">{error}</p>}
          <a href="/">Já possuo uma conta</a>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;
