import React from 'react'
import axios from 'axios'

import { Stack, TextField, Button, Typography, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Snackbar, Alert } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Context from '../../Contexts/context'

const Login = () => {
    const [loginData, setLoginData] = React.useState([])
    const [context, setContext] = React.useContext(Context)
    const [open, setOpen] = React.useState(false)
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });
    
    const handleClose = () => {    
        setOpen(false);
      };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const authLogin = () => {
        axios.post('http://localhost:3001/api/auth/login', { username: loginData.username, password: values.password }).then(res => {
            if (res.data.status === 'success') {
                setContext({ isUserLogged: 'true', userUsername: loginData.username })
                localStorage.setItem('isUserLogged', 'true')
                localStorage.setItem('userUsername', res.data.msg)
                window.location = '/'
            } else {
                setOpen(true)
            }
        })
    }

    return (
        <Stack sx={{ width: '100%' }}>
            <Stack sx={{ width: '100%' }} justifyContent="center" align="center" direction="column">
                <Typography variant="h6">
                    Zaloguj się na swoje konto
                </Typography>
                <TextField onChange={(e) => setLoginData({ username: e.target.value, password: loginData.password })} sx={{ margin: '20px 0px' }} label="Nazwa użytkownika" size="small" />
                <FormControl sx={{ width: '100%' }} variant="outlined">  
                    <InputLabel size="small" htmlFor="outlined-adornment-password">Hasło</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        label="Hasło"
                        size='small'
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>  
                <Button onClick={() => authLogin()} variant="contained" sx={{ marginTop: '20px', fontSize: '1rem', padding: '7px' }} >Zaloguj się</Button>
            </Stack>
            <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)} >
                <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                    Podane dane nie są prawidłowe
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default Login