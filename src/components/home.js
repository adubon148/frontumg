import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Add, PersonAdd, Book, AssignmentReturn } from '@mui/icons-material';

function Home() {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={4}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a la Biblioteca
        </Typography>
        <Typography variant="body1" gutterBottom>
          Selecciona una opción para comenzar
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Book />}
          >
            Agregar Libro
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<PersonAdd />}
            href='https://frontumg.onrender.com/clientes'
          >
            Agregar Cliente
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Realizar Préstamo
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<AssignmentReturn />}
          >
            Recepción de Libros
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;