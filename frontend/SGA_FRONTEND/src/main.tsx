import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Associado from './pages/associado/Associado.tsx';
<<<<<<< HEAD
import Cadastro from './pages/cadastro/cadastro.tsx';
=======
import NovoAssociado from './pages/novoAssociado/NovoAssociado.tsx';
import EditarAssociado from './pages/editarAssociado/EditarAssociado.tsx';
>>>>>>> 553ed980378d7f56eec4532d9b497b772fb57370

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/associado",
    element: <Associado/>,
  },
  {
<<<<<<< HEAD
    path: "/cadastro",
    element: <Cadastro/>,
  },
=======
    path: "/novo-associado",
    element: <NovoAssociado/>
  },
  {
    path: "/editar-associado",
    element: <EditarAssociado/>
  }
>>>>>>> 553ed980378d7f56eec4532d9b497b772fb57370
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
