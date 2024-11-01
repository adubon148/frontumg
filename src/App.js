import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Autores from './components/autores';
import Login from './components/login';
import Clientes from './components/clientes';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/autores',
    element: <Autores />,
  },
  {
    path: '/clientes',
    element: <Clientes />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
