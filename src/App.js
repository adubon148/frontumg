import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Autores from './components/autores';
import Login from './components/login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/autores',
    element: <Autores />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
