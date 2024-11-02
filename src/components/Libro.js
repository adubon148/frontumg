import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Modal,TextField, Button , MenuItem, InputLabel} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {Edit, Delete} from '@mui/icons-material';
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


function Libro(){
    const baseurl = "https://apibooks-6xo2.onrender.com/api/libro/";
    const styles =useStyles();
    const [data, setData] = useState([]);
    const [modalModificar,setModalModificar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalElimiar,setModalEliminar]=useState(false);
    const [autores, setAutores] = useState([]);
    const [tipos, setTipos] = useState([]);



    const getLibros = async () => {
      await axios.get(baseurl+"all")
        .then(response => {
          setData(response.data.libros); // Actualiza el estado
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error); // Manejo de errores
        });
    }

    const getAutoresYTipos = async () => {
        try {
          const autoresResponse = await axios.get("https://apibooks-6xo2.onrender.com/api/autor/all");
          const tiposResponse = await axios.get("https://apibooks-6xo2.onrender.com/api/tipolibro/all");
          setAutores(autoresResponse.data.autores);
          setTipos(tiposResponse.data.tipos);
        } catch (error) {
          console.error("Error al obtener autores y tipos:", error);
        }
      };

    const [libroSelect,setLibroselect]=useState({
      id:'',
      Titulo:'',
      AñoPublicacion:'',
      descrpcion:'',
      autorId:'',
      tipoid:''
    })

    const handeChange=e=>{
        const {name,value}= e.target;
        setLibroselect(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(libroSelect)
    }

    const peticionPost=async()=>{
        await axios.post(baseurl+"crear",libroSelect)
        .then(response=>{
            
            abrirCerrarModalInsertar();
        }  
        )
        getLibros();
    }

    const peticionDelete=async()=>{
        await axios.delete(baseurl+"delete/"+libroSelect.id)
        .then(response=>{
            setData(data.filter(libro=>libro.id!==libroSelect.id))
        })
        abrirCerrarModalEliminar();
        getLibros();
    }

    const peticionPut=async()=>{
        await axios.put(baseurl+"update/"+libroSelect.id,libroSelect)
        .then(response=>{
            var datanueva=data;
            datanueva.map(libro=>{
                if(libroSelect.id===libro.id){
                    libro.Titulo=libroSelect.Titulo
                    libro.AñoPublicacion=libroSelect.AñoPublicacion
                    libro.descrpcion=libroSelect.descrpcion
                    libro.autorId=libroSelect.autorId
                    libro.tipoid=libroSelect.tipoid                    
                }
                return libro;
            })
            setData(datanueva);
            abrirCerrarModaModificar();
        })
        getLibros();
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

    const selctLibro=(libro, tipo)=>{
        setLibroselect(libro);
        (tipo==='Edit')?abrirCerrarModaModificar():abrirCerrarModalEliminar();
    }


  
    useEffect(() => {
        getAutoresYTipos();
        getLibros();
        
      }, []);

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo Libro</h3>
            <TextField name='Titulo' className={styles.inputMaterial} label="Titulo"onChange={handeChange}/>
            <br/>
            <TextField name='AñoPublicacion' className={styles.inputMaterial} label="AñoPublicacion"onChange={handeChange}/>
            <br/>
            <TextField name='descrpcion' className={styles.inputMaterial} label="descrpcion"onChange={handeChange} />
            <br/>
            {/* Combobox para seleccionar Autor */}
        <InputLabel>Autor</InputLabel>
        <TextField
            select
            name="autorId"
            className={styles.inputMaterial}
            value={libroSelect.autorId}
            onChange={handeChange}
        >
            {autores.map((autor) => (
                <MenuItem key={autor.id} value={autor.id}>
                    {autor.Nombre}
                </MenuItem>
            ))}
        </TextField>
        <br />

        {/* Combobox para seleccionar Tipo */}
        <InputLabel>Tipo</InputLabel>
        <TextField
            select
            name="tipoid"
            className={styles.inputMaterial}
            value={libroSelect.tipoid}
            onChange={handeChange}
        >
            {tipos.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.tipo}
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
    const bodyEditar=(
        <div className={styles.modal}>
        <h3>Editar libro</h3>
        <TextField name='Titulo' className={styles.inputMaterial} label="Titulo"onChange={handeChange} value={libroSelect&&libroSelect.Titulo}/>
        <TextField name='AñoPublicacion'
        className={styles.inputMaterial}label="AñoPublicacion"onChange={handeChange} value={libroSelect&&libroSelect.AñoPublicacion}/>
            <br/>
            <TextField name='descrpcion' className={styles.inputMaterial} label="descrpcion"onChange={handeChange} value={libroSelect&&libroSelect.descrpcion} />
            <br/>
            {/* Combobox para seleccionar Autor */}
        <InputLabel>Autor</InputLabel>
        <TextField
            select
            name="autorId"
            className={styles.inputMaterial}
            value={libroSelect.autorId || ""}
            onChange={handeChange}
        >
            {autores.map((autor) => (
                <MenuItem key={autor.id} value={autor.id}>
                    {autor.Nombre}
                </MenuItem>
            ))}
        </TextField>
        <br />

        {/* Combobox para seleccionar Tipo */}
        <InputLabel>Tipo</InputLabel>
        <TextField
            select
            name="tipoid"
            className={styles.inputMaterial}
            value={libroSelect.tipoid || ""}
            onChange={handeChange}
        >
            {tipos.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.descripcion}
                </MenuItem>
            ))}
        </TextField>
        <br /><br />

        <div align="right">
            <Button color="primary" onClick={() => peticionPut()}>Editar</Button>
            <Button onClick={() => abrirCerrarModaModificar()}>Cancelar</Button>
        </div>
    </div>
);

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro de querer elinar el libro:<b>{libroSelect&&libroSelect.nombre}</b>?</p>
        <div align="right">
            <button color="secondary" onClick={()=>peticionDelete()}>Si</button>
            <button onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </div>
    </div>
    )

    return (
        <div className="App">
        <h1>Lista de libros</h1>
        <br />
       <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button> 
        <br /><br />
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>id</TableCell>
        <TableCell>Titulo</TableCell>
        <TableCell>AñoPublicacion</TableCell>
        <TableCell>descrpcion</TableCell>
        <TableCell>autorId</TableCell>
        <TableCell>tipoid</TableCell>
        <TableCell>acciones</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((libro) => (
        <TableRow key={libro.id}>
          <TableCell>{libro.id}</TableCell>  
          <TableCell>{libro.Titulo}</TableCell>
          <TableCell>{libro.AñoPublicacion}</TableCell>
          <TableCell>{libro.descrpcion}</TableCell>
          <TableCell>{libro.autorId}</TableCell>
          <TableCell>{libro.tipoid}</TableCell>
          <TableCell>
            <Edit className={styles.iconos} onClick={()=>selctLibro(libro,'Edit')}/>
            &nbsp;&nbsp;&nbsp;
            <Delete className={styles.iconos } onClick={()=>selctLibro(libro,'Elim')}/>
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

export default Libro;
