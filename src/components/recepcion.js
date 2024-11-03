import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Modal, Button} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {CheckCircle } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));


function Recepcion(){
    const baseurl = "https://apibooks-6xo2.onrender.com/api/pretm/";
    const styles =useStyles();
    const [data, setData] = useState([]);
    const [modalRecepcionar, setModalRecepcionar]=useState(false);
    const [clientes,setClientes]=useState([]);
    const [libros,setLibros]=useState([]);

    const getPrestamos = async () => {
      await axios.get(baseurl+"all")
        .then(response => {
          setData(response.data.prestamos.filter(prestamo=>prestamo.idestado===1)); 
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error); // Manejo de errores
        });
    }

    const getCombosData = async () => {
        try {
          const clientesResponse = await axios.get("https://apibooks-6xo2.onrender.com/api/cliente/all");
          const librosResponse = await axios.get("https://apibooks-6xo2.onrender.com/api/libro/all");
          setClientes(clientesResponse.data.clientes);
          setLibros(librosResponse.data.libros);
        } catch (error) {
          console.error("Error al obtener clientes y libros:", error);
        }
      };

    const [prestamoSelect,setPrestamoSelect]=useState({
      id:'',
      fechaprestamo:'',
      idlibro:'',
      idcliente:''
    })

    const abrirCerrarModalRecepcionar=()=>{
        setModalRecepcionar(!modalRecepcionar);
    }

    const seleccionarPrestamoRecepcionar = (prestamo) => {
        setPrestamoSelect(prestamo); // Actualiza el préstamo seleccionado
        abrirCerrarModalRecepcionar(); // Abre el modal de eliminación
    };

    const confirmarRecepcion = async () => {
        try {
            // Realiza la actualización del estado en la API
            await axios.put(`${baseurl}update/${prestamoSelect.id}`, { idestado: 2 });
    
            // Cierra el modal de recepción
            abrirCerrarModalRecepcionar();
    
            // Vuelve a cargar los préstamos para actualizar la lista con el nuevo estado
            getPrestamos();
        } catch (error) {
            console.error("Error al actualizar el estado del préstamo:", error);
        }
    };


  
    useEffect(() => {
        getCombosData();
        getPrestamos();        
      }, []);

      const bodyRecepcionar = (
        <div className={styles.modal}>
            <h3>¿Estás seguro de recepcionar este préstamo?</h3>
            <p>
                Préstamo ID: <b>{prestamoSelect.id}</b> <br />
                Cliente: <b>{clientes.find(cliente => cliente.dpi === prestamoSelect.idcliente)?.nombre}</b> <br />
                Libro: <b>{libros.find(libro => libro.id === prestamoSelect.idlibro)?.Titulo}</b>
            </p>
            <div align="right">
                <Button color="primary" onClick={() => confirmarRecepcion()}>Confirmar</Button>
                <Button onClick={() => abrirCerrarModalRecepcionar()}>Cancelar</Button>
            </div>
        </div>
    );


    return (
        <div className="App">
        <h1>Lista de Prestamos</h1>
        <br /><br />
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Fecha</TableCell>
        <TableCell>Libro</TableCell>
        <TableCell>Cliente</TableCell>
        <TableCell>Recepcionar</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
  {data.map((prestamo) => (
    <TableRow key={prestamo.id}>
      <TableCell>{prestamo.id}</TableCell>  
      <TableCell>{prestamo.fechaprestamo}</TableCell>
      <TableCell>{libros.find(libro => libro.id === prestamo.idlibro)?.Titulo}</TableCell>
      <TableCell>{clientes.find(cliente => cliente.dpi === prestamo.idcliente)?.nombre}</TableCell>
      <TableCell>
        <CheckCircle className={styles.iconos} onClick={() => seleccionarPrestamoRecepcionar(prestamo)}/>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>

<Modal 
open={modalRecepcionar}
onClose={()=>abrirCerrarModalRecepcionar()}>
{bodyRecepcionar}
</Modal>
      </div>
    );
}

export default Recepcion;
