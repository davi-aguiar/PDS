import "./App.css";
import { useNavigate } from "react-router-dom";
import alpha from "../../assets/Forma 4.png";
import { useState } from "react";
import axios from "axios"; // Importando o Axios

function App() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password
      });

      if (response.data.success) {
        navigate("/associado");
      } else {
        setError("Login ou senha inválidos");
      }
    } catch (error) {
      console.log("Erro:", error);
      setError("Erro ao realizar login");
    }
  };
  const handleClick = () => {
    navigate("/associado");
  };

  return (
    <main className={"main"}>
      <div className={"card"}>
        <img src={alpha} alt={"logo"} width={120} />
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
        <button onClick={handleLogin}>Acessar</button>
        {error && <p className="error">{error}</p>}
        <a href="/associado">Esqueci Minha Senha</a>
        <a href="/cadastro">Criar conta</a>
      </div>
    </main>
  );
}

export default App;
