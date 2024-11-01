import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Autores from './components/autores';
import Login from './components/login';
import Clientes from './components/Clientes.js';
import Home from './components/home.js';
import Libro from './components/Libro.js';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme({
  spacing: 4,  // Ajuste de separación base
  palette: {
    primary: {
      main: '#1976d2', // Azul por defecto
    },
    secondary: {
      main: '#dc004e', // Color secundario
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/libro',
    element: <Libro />,
  },
  {
    path: '/home',
    element: <Home />,
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
  <ThemeProvider theme={theme}>
    <CssBaseline />  {/* Resetea el CSS para que Material UI tome el control */}
    <RouterProvider router={router} />
  </ThemeProvider>
);
}

export default App;