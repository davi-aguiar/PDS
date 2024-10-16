import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/app/App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Associado from "./pages/associado/Associado.tsx";
import Cadastro from "./pages/cadastro/cadastro.tsx";
import NovoAssociado from "./pages/novoAssociado/NovoAssociado.tsx";
import EditarAssociado from "./pages/editarAssociado/EditarAssociado.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/associado",
    element: <Associado />
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/novo-associado",
    element: <NovoAssociado />
  },
  {
    path: "/editar-associado",
    element: <EditarAssociado />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
