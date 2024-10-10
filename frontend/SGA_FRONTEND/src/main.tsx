import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Associado from './pages/associado/Associado.tsx';
import NovoAssociado from './pages/novoAssociado/NovoAssociado.tsx';

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
    path: "/novo-associado",
    element: <NovoAssociado/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
