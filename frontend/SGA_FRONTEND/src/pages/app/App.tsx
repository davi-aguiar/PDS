import './App.css'
import { useNavigate } from 'react-router-dom'
import alpha from '../../assets/Forma 4.png'

function App() {
  const navigate = useNavigate()

  // const handleClick = () => {
  //   navigate("/associado");
  // }

  return (
    <main className={"main"}>
      <div className={"card"}>
        <img src={alpha} alt={"logo"} width={120}/>
        <div className={"inputDiv"}>
          <p>Seu e-mail</p>
          <input type="text" className={"input"} />
        </div>
        <div className={"inputDiv"}>
          <p>Sua senha</p>
          <input type="text" className={"input"} />
        </div>
        <button>Acessar</button>
        <a href="/associado">Esqueci Minha Senha</a>
      </div>
    </main>
  )
}

export default App
