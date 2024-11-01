import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Modal,TextField, Button } from '@mui/material';
import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {Edit, Delete} from '@mui/icons-material';
import {makeStyles} from '@mui/styles';


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


function Autores(){
    const baseurl = "https://apibooks-6xo2.onrender.com/api/autor/";
    const styles =useStyles();
    const [data, setData] = useState([]);
    const [modalModificar,setModalModificar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalElimiar,setModalEliminar]=useState(false);
    const getautores = async () => {
      await axios.get(baseurl+"all")
        .then(response => {
          setData(response.data.autores); // Actualiza el estado
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error); // Manejo de errores
        });
    }

    const [nuevoAutor,setNuevoAutor]=useState({
        
        Nombre:'',
        Nacionalidad:'',
        FechaNac:''
    })

    const [selectAutor,setSelctAutor]=useState({
        id:'',
        Nombre:'',
        Nacionalidad:'',
        FechaNac:''
    })

    const handeChange=e=>{
        const {name,value}= e.target;
        setNuevoAutor(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(nuevoAutor)
    }

    const handeChangeEdit=e=>{
        const {name,value}= e.target;
        setSelctAutor(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(selectAutor)
    }

    const peticionPost=async()=>{
        await axios.post(baseurl+"crear",nuevoAutor)
        .then(response=>{
            getautores();
            abrirCerrarModalInsertar();
        }
            
        )
    }

    const peticionDelete=async()=>{
        await axios.delete(baseurl+"delete/"+selectAutor.id)
        .then(response=>{
            setData(data.filter(autor=>autor.ID!==selectAutor.id))
        })
        abrirCerrarModalEliminar();
        getautores();
    }

    const peticionPut=async()=>{
        await axios.put(baseurl+"update/"+selectAutor.id,selectAutor)
        .then(response=>{
            var datanueva=data;
            datanueva.map(autor=>{
                if(selectAutor.id===autor.id){
                    autor.Nombre=selectAutor.Nombre;
                    autor.Nacionalidad=selectAutor.Nacionalidad;
                    autor.FechaNac=selectAutor.FechaNac;
                    
                }
            })
            setData(datanueva);
            abrirCerrarModaModificar();
        })
        getautores();
    }

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
    const abrirCerrarModalEliminar=()=>{
        setModalEliminar(!modalElimiar);
    }

    const abrirCerrarModaModificar=()=>{
        setModalModificar(!modalModificar)
    }

    const selAutor=(autor, tipo)=>{
        setSelctAutor(autor);
        (tipo==='Edit')?abrirCerrarModaModificar():abrirCerrarModalEliminar();
    }


  
    useEffect(() => {
      const fetchData = async () => {
        await getautores();
      };
      fetchData();
    }, []);

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo autor</h3>
            <TextField name='Nombre' className={styles.inputMaterial} label="Nombre"onChange={handeChange}/>
            <br/>
            <TextField name='Nacionalidad' className={styles.inputMaterial} label="Nacionalidad"onChange={handeChange}/>
            <br/>
            <TextField name='FechaNac' className={styles.inputMaterial} label="FechaNac"onChange={handeChange} />
            <br/><br/>
            <div align="right">
                <button color="primary" onClick={()=>peticionPost()}>Insertar</button>
                <button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
            </div>
        </div>

    )

    const bodyEditar=(
        <div className={styles.modal}>
        <h3>Editar autor</h3>
        <TextField name='Nombre' className={styles.inputMaterial} label="Nombre"onChange={handeChangeEdit} value={selectAutor&&selectAutor.Nombre}/>
        <br/>
        <TextField name='Nacionalidad' className={styles.inputMaterial} label="Nacionalidad"onChange={handeChangeEdit} value={selectAutor&&selectAutor.Nacionalidad}/>
        <br/>
        <TextField name='FechaNac' className={styles.inputMaterial} label="FechaNac"onChange={handeChangeEdit}value={selectAutor&&selectAutor.FechaNac}/>
        <br/><br/>
        <div align="right">
            <button color="primary" onClick={()=>peticionPut()}>Editar</button>
            <button onClick={()=>abrirCerrarModaModificar()}>Cancelar</button>
        </div>
    </div>
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro de querer elinar el autor:<b>{selectAutor&&selectAutor.Nombre}</b>?</p>
        <div align="right">
            <button color="secondary" onClick={()=>peticionDelete()}>Si</button>
            <button onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </div>
    </div>
    )

    return (
        <div className="App">
        <h1>Lista de Autores</h1>
        <br />
       <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button> 
        <br /><br />
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Nacionalidad</TableCell>
        <TableCell>Acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((autor) => (
        <TableRow key={autor.id}>
          <TableCell>{autor.id}</TableCell>
          <TableCell>{autor.Nombre}</TableCell>
          <TableCell>{autor.Nacionalidad}</TableCell>
          <TableCell>
            <Edit className={styles.iconos} onClick={()=>selAutor(autor,'Edit')}/>
            &nbsp;&nbsp;&nbsp;
            <Delete className={styles.iconos } onClick={()=>selAutor(autor,'Elim')}/>
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
open={modalModificar}
onClose={()=>abrirCerrarModaModificar()}>
{bodyEditar}
</Modal>

<Modal 
open={modalElimiar}
onClose={()=>abrirCerrarModalEliminar()}>
{bodyEliminar}
</Modal>
      </div>
    );
}

export default Autores;
