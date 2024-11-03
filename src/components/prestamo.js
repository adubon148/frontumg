import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Modal,TextField, Button , MenuItem, InputLabel} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {Delete} from '@mui/icons-material';
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


function Prestamo(){
    const baseurl = "https://apibooks-6xo2.onrender.com/api/pretm/";
    const styles =useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalElimiar,setModalEliminar]=useState(false);
    const [clientes,setClientes]=useState([]);
    const [libros,setLibros]=useState([]);
    const [userId, setUserId] = useState("");

    const getPrestamos = async () => {
      await axios.get(baseurl+"all")
        .then(response => {
          setData(response.data.prestamos); // Actualiza el estado
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

    const handeChange=e=>{
        const {name,value}= e.target;
        setPrestamoSelect(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(prestamoSelect)
    }

    const peticionPost=async()=>{
        const prestamoData = { ...prestamoSelect, userId };
        await axios.post(baseurl+"crear",prestamoData)
        .then(response=>{
            
            abrirCerrarModalInsertar();
            
        }  
        )
        getPrestamos();
    }

    const peticionDelete=async()=>{
        await axios.delete(baseurl+"delete/"+prestamoSelect.id)
        .then(response=>{
            setData(data.filter(prestamo=>prestamo.id!==prestamoSelect.id))
        })
        abrirCerrarModalEliminar();
        getPrestamos();
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalElimiar);
    }


  
    useEffect(() => {
        getCombosData();
        getPrestamos();
        const storedUserId = sessionStorage.getItem('Username');
        setUserId(storedUserId);
        
      }, []);

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo Libro</h3>
            <TextField name='fechaprestamo' className={styles.inputMaterial} label="fechaprestamo"onChange={handeChange}/>
            <br/>

            {/* Combobox para seleccionar Libro */}
        <InputLabel>Libro</InputLabel>
        <TextField
            select
            name="idlibro"
            className={styles.inputMaterial}
            value={prestamoSelect.idlibro}
            onChange={handeChange}
        >
            {libros.map((libro) => (
                <MenuItem key={libro.id} value={libro.id}>
                    {libro.Titulo}
                </MenuItem>
            ))}
        </TextField>
        <br />


            {/* Combobox para seleccionar Autor */}
        <InputLabel>CLiente</InputLabel>
        <TextField
            select
            name="idcliente"
            className={styles.inputMaterial}
            value={prestamoSelect.idcliente}
            onChange={handeChange}
        >
            {clientes.map((cliente) => (
                <MenuItem key={cliente.dpi} value={cliente.dpi}>
                    {cliente.nombre}
                </MenuItem>
            ))}
        </TextField>
        <br /><br />

        <div align="right">
            <Button color="primary" onClick={() => peticionPost()}>Insertar</Button>
            <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
);


    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro de querer Anular el prestamo de fecha:<b>{prestamoSelect&&prestamoSelect.fechaprestamo}</b>?</p>
        <div align="right">
            <button color="secondary" onClick={()=>peticionDelete()}>Si</button>
            <button onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </div>
    </div>
    )

    return (
        <div className="App">
        <h1>Lista de Prestamos</h1>
        <br />
       <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button> 
        <br /><br />
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Fecha</TableCell>
        <TableCell>idlibro</TableCell>
        <TableCell>idcliente</TableCell>
        <TableCell>Borrar</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((prestamo) => (
        <TableRow key={prestamo.id}>
          <TableCell>{prestamo.id}</TableCell>  
          <TableCell>{prestamo.fechaprestamo}</TableCell>
          <TableCell>{prestamo.idlibro}</TableCell>
          <TableCell>{prestamo.idcliente}</TableCell>
          <TableCell>
            <Delete className={styles.iconos } onClick={()=>abrirCerrarModalEliminar()}/>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

<Modal 
open={modalInsertar}
onClose={()=>abrirCerrarModalInsertar()}>
{bodyInsertar}
</Modal>
<Modal 
open={modalElimiar}
onClose={()=>abrirCerrarModalEliminar()}>
{bodyEliminar}
</Modal>
      </div>
    );
}

export default Prestamo;
