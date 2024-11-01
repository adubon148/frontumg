import { Grid, Container, Paper, Avatar, Typography, TextField,Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import {makeStyles} from '@mui/styles';
import fondo from '../recursos/fondo.png';
import {LockOutlined as LockOutlinedIcon} from '@mui/icons-material'
import { Form, useNavigate, } from 'react-router-dom';


const useStyles = makeStyles (theme=>({
    root:{
       backgroundImage:`url(${fondo})`,
        backgroundSize: 'cover',          // Hace que la imagen cubra todo el área
        backgroundPosition: 'center',     // Centra la imagen
        backgroundRepeat: 'no-repeat',    // Evita que se repita
        height: '100vh',                  // Ocupa toda la altura del viewport
        width: '100%'
    },
    container:{
        opacity:'0.8',
        height: '60%',                  // Ocupa toda la altura del viewport
        marginTop: theme.spacing(5),
        [theme.breakpoints.down(400+theme.spacing(2)+2)]:{
            marginTop:0,
            width:'100%',
            height:'100%'
        }
    },
    div:{
        marginTop: theme.spacing(8),
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    Avatar:{
        margin: theme.spacing(5),
        backgroundColor: theme.palette.primary.main
    },
    form:{
        width:'100%',
        marginTop: theme.spacing(1)

    },
    Button:{
        margin:theme.spacing(3,0,2)
    }
}))




const Login= () =>{

    const navigate =useNavigate();
    const [error, setError] = useState('');
    const [open,setOpen]=useState(false);
    const classes = useStyles()
    const [body,setBody]=useState({Username:'',password:'',nombre:''});

    const abrirCerrarDialogo =()=>{
        
        setOpen(!open);
        
    }

    const handleChange=e=>{
       
        setBody({
            ...body,
            [e.target.name]:e.target.value
        })
    }
    const handleLogin = async () => {
        try {
            const response = await axios.get(`https://apibooks-6xo2.onrender.com/api/users/onebyid/${body.Username}`);
            const user = response.data.usuarios;
            // Verificamos si el usuario existe
            if (!user) {
                // Si el usuario no existe
                setError('Usuario no existe');
                abrirCerrarDialogo();
                return; // Salimos para no ejecutar el siguiente bloque
            }

            // Si el usuario existe, verificamos la contraseña
            if (user.password === body.password) {
                // Si la autenticación es exitosa, navega a la página de inicio
                navigate('/home');
            } else {
                // Si la contraseña es incorrecta
                setError('Contraseña incorrecta');
                abrirCerrarDialogo();
            }
        } catch (error) {
            // Maneja el error de la solicitud
            setError('Ocurrió un error al intentar iniciar sesión');
            abrirCerrarDialogo();
            console.log(error);
        }

            
    };



    return (
        <Grid container component='main' className={classes.root}>
            <Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
                <div className={classes.div}>
                    <Avatar className={classes.Avatar}>
                       <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component='h2' variant='h5'>Iniciar Sesion</Typography>
                    <Form className={classes.form}>
                        <TextField
                            fullWidth
                            autoFocus
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Usuario'
                            name='Username'
                            value={body.Username}
                            onChange={handleChange}
                           
                        />
                        <TextField
                            fullWidth
                            autoFocus
                            type='password'
                            color='primary'
                            margin='normal'
                            variant='outlined'
                            label='Password'
                            name='password'
                            value={body.password}
                            onChange={handleChange}
                        />
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            className={classes.Button}
                            onClick={handleLogin}
                        >Iniciar Sesion</Button>
                    </Form>

                </div>

            </Container>
            <Dialog open={open}>
                <DialogTitle>Error Iniciando Sesion</DialogTitle>
                <DialogContent>
                    <Typography>{error}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={abrirCerrarDialogo} color='primary'>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )

}


export default Login