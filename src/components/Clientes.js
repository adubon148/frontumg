import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Paper, Modal,TextField, Button } from '@material-ui/core';
import React, { act, useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import {Edit, Delete} from '@material-ui/icons';
import {makeStyles} from '@material-ui/core/styles';


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


function Clientes(){
    const baseurl = "https://apibooks-6xo2.onrender.com/api/cliente/";
    const styles =useStyles();
    const [data, setData] = useState([]);
    const [modalModificar,setModalModificar]=useState(false);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalElimiar,setModalEliminar]=useState(false);


    const getClients = async () => {
      await axios.get(baseurl+"all")
        .then(response => {
          setData(response.data.clientes); // Actualiza el estado
          console.log(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error); // Manejo de errores
        });
    }

    const [clientselect,setClientselect]=useState({
      dpi:'',
      nombre:'',
      apellido:'',
      edad:'',
      direccion:'',
      Nacionalidad:'',
      telefono:'',
      email:'',
      estadocivil:'',
      nit:''
    })

    const handeChange=e=>{
        const {name,value}= e.target;
        setClientselect(prevState=>({
            ...prevState,
            [name]:value
        }))
        console.log(clientselect)
    }

    const peticionPost=async()=>{
        await axios.post(baseurl+"crear",clientselect)
        .then(response=>{
            
            abrirCerrarModalInsertar();
        }  
        )
        getClients();
    }

    const peticionDelete=async()=>{
        await axios.delete(baseurl+"delete/"+clientselect.dpi)
        .then(response=>{
            setData(data.filter(cliente=>cliente.dpi!==clientselect.dpi))
        })
        abrirCerrarModalEliminar();
        getClients();
    }

    const peticionPut=async()=>{
        await axios.put(baseurl+"update/"+clientselect.dpi,clientselect)
        .then(response=>{
            var datanueva=data;
            datanueva.map(cliente=>{
                if(clientselect.dpi===cliente.dpi){
                    cliente.nombre=clientselect.nombre
                    cliente.apellido=clientselect.apellido
                    cliente.edad=clientselect.edad
                    cliente.direccion=clientselect.direccion
                    cliente.Nacionalidad=clientselect.Nacionalidad
                    cliente.telefono=clientselect.telefono
                    cliente.email=clientselect.email
                    cliente.estadocivil=clientselect.estadocivil
                    cliente.nit=clientselect.nit                    
                    
                }
            })
            setData(datanueva);
            abrirCerrarModaModificar();
        })
        getClients();
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

    const selCliente=(cliente, tipo)=>{
        setClientselect(cliente);
        (tipo==='Edit')?abrirCerrarModaModificar():abrirCerrarModalEliminar();
    }


  
    useEffect(() => {
      const fetchData = async () => {
        await getClients();
      };
      fetchData();
    }, []);

    const bodyInsertar=(
        <div className={styles.modal}>
            <h3>Agregar Nuevo Cliente</h3>
            <TextField name='dpi' className={styles.inputMaterial} label="DPI"onChange={handeChange}/>
            <br/>
            <TextField name='nombre' className={styles.inputMaterial} label="Nombre"onChange={handeChange}/>
            <br/>
            <TextField name='apellido' className={styles.inputMaterial} label="Apellido"onChange={handeChange} />
            <br/>
            <TextField name='edad' className={styles.inputMaterial} label="Edad"onChange={handeChange} />
            <br/>
            <TextField name='direccion' className={styles.inputMaterial} label="Direccion"onChange={handeChange} />
            <br/>
            <TextField name='Nacionalidad' className={styles.inputMaterial} label="Nacionalidad"onChange={handeChange} />
            <br/>
            <TextField name='telefono' className={styles.inputMaterial} label="telefono"onChange={handeChange} />
            <br/>
            <TextField name='email' className={styles.inputMaterial} label="E-mail"onChange={handeChange} />
            <br/>
            <TextField name='estadocivil' className={styles.inputMaterial} label="estadocivil"onChange={handeChange} />
            <br/>
            <TextField name='nit' className={styles.inputMaterial} label="nit"onChange={handeChange} />
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
        <TextField name='nombre' className={styles.inputMaterial} label="Nombre"onChange={handeChange} value={clientselect&&clientselect.nombre}/>
        <br/>
        <TextField name='apellido' className={styles.inputMaterial} label="Apellido"onChange={handeChange}  value={clientselect&&clientselect.apellido}/>
        <br/>
        <TextField name='edad' className={styles.inputMaterial} label="Edad"onChange={handeChange}  value={clientselect&&clientselect.edad}/>
        <br/>
        <TextField name='direccion' className={styles.inputMaterial} label="Direccion"onChange={handeChange} value={clientselect&&clientselect.direccion} />
        <br/>
        <TextField name='Nacionalidad' className={styles.inputMaterial} label="Nacionalidad"onChange={handeChange} value={clientselect&&clientselect.Nacionalidad} />
        <br/>
        <TextField name='telefono' className={styles.inputMaterial} label="telefono"onChange={handeChange} value={clientselect&&clientselect.telefono} />
        <br/>
        <TextField name='email' className={styles.inputMaterial} label="E-mail"onChange={handeChange}  value={clientselect&&clientselect.email}/>
        <br/>
        <TextField name='estadocivil' className={styles.inputMaterial} label="estadocivil"onChange={handeChange} value={clientselect&&clientselect.estadocivil} />
        <br/>
        <TextField name='nit' className={styles.inputMaterial} label="nit"onChange={handeChange} value={clientselect&&clientselect.nit} />
        <br/><br/>
        <div align="right">
            <button color="primary" onClick={()=>peticionPut()}>Editar</button>
            <button onClick={()=>abrirCerrarModaModificar()}>Cancelar</button>
        </div>
    </div>
    )

    const bodyEliminar=(
        <div className={styles.modal}>
            <p>Estas seguro de querer elinar el Cliente:<b>{clientselect&&clientselect.nombre}</b>?</p>
        <div align="right">
            <button color="secondary" onClick={()=>peticionDelete()}>Si</button>
            <button onClick={()=>abrirCerrarModalEliminar()}>No</button>
        </div>
    </div>
    )

    return (
        <div className="App">
        <h1>Lista de Clientes</h1>
        <br />
       <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button> 
        <br /><br />
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>dpi</TableCell>
        <TableCell>Nombre</TableCell>
        <TableCell>Apellido</TableCell>
        <TableCell>Edad</TableCell>
        <TableCell>Direccion</TableCell>
        <TableCell>Nacionalidad</TableCell>
        <TableCell>Telefono</TableCell>
        <TableCell>email</TableCell>
        <TableCell>estadocivil</TableCell>
        <TableCell>Nit</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((cliente) => (
        <TableRow key={cliente.dpi}>
          <TableCell>{cliente.dpi}</TableCell>
          <TableCell>{cliente.nombre}</TableCell>
          <TableCell>{cliente.apellido}</TableCell>
          <TableCell>{cliente.edad}</TableCell>
          <TableCell>{cliente.direccion}</TableCell>
          <TableCell>{cliente.Nacionalidad}</TableCell>
          <TableCell>{cliente.telefono}</TableCell>
          <TableCell>{cliente.email}</TableCell>
          <TableCell>{cliente.estadocivil}</TableCell>
          <TableCell>{cliente.nit}</TableCell>
          <TableCell>
            <Edit className={styles.iconos} onClick={()=>selCliente(cliente,'Edit')}/>
            &nbsp;&nbsp;&nbsp;
            <Delete className={styles.iconos } onClick={()=>selCliente(cliente,'Elim')}/>
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

export default Clientes;
