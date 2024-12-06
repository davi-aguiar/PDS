import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Associado from "./pages/associado/Associado.tsx";
import Cadastro from "./pages/cadastro/cadastro.tsx";
import NovoAssociado from "./pages/novoAssociado/NovoAssociado.tsx";
import EditarAssociado from "./pages/editarAssociado/EditarAssociado.tsx";
import ModeloVeiculo from "./pages/modeloVeiculo/ModeloVeiculo.tsx";
import NovoModeloVeiculo from "./pages/novoModeloVeiculo/NovoModeloVeiculo.tsx";
import Veiculos from "./pages/veiculo/Veiculos.tsx";
import Cadastros from "./pages/cadastros/Cadastros.tsx";
import Eventos from "./pages/eventos/Eventos.tsx";
import Ferramentas from "./pages/ferramentas/Ferramentas.tsx";
import Financeiros from "./pages/financeiros/Financeiros.tsx";
import EditarModeloVeiculo from "./pages/editarModeloVeiculo/EditarModeloVeiculo.tsx";
import NovoVeiculo from "./pages/novoVeiculo/NovoVeiculo.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/associado",
    element: <Associado />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/novo-associado",
    element: <NovoAssociado />,
  },
  {
    path: "/editar-associado",
    element: <EditarAssociado />,
  },
  {
    path: "/modelos-veiculos",
    element: <ModeloVeiculo />,
  },
  {
    path: "/novo-modelo",
    element: <NovoModeloVeiculo />,
  },
  {
    path: "/veiculos",
    element: <Veiculos />,
  },
  {
    path: "/novo-veiculo",
    element: <NovoVeiculo />,
  },
  {
    path: "/cadastros",
    element: <Cadastros />,
  },
  {
    path: "/eventos",
    element: <Eventos />,
  },
  {
    path: "/ferramentas",
    element: <Ferramentas />,
  },
  {
    path: "/financeiros",
    element: <Financeiros />,
  },
  {
    path: "/editar-modelo",
    element: <EditarModeloVeiculo />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
