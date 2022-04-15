import React from 'react'
import axios from 'axios'

import { Stack, TextField, Button, Typography, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, Snackbar, Alert } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const [regData, setRegData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const authRegister = () => {
        if(!regData.username || !values.password || !regData.discord) {
            setOpen(true)
        } else {
            axios.post('https://emc-web-panel.herokuapp.com/api/auth/register', { username: regData.username, password: values.password, discord: regData.discord}).then(res => {
            })
            window.location = '/auth'
        }
    }

    return(
        <Stack sx={{ width: '100%' }}>
            <Stack sx={{ width: '100%' }} justifyContent="center" align="center" direction="column">
                <Typography variant="h6">
                    Zarejestruj nowe konto w systemie
                </Typography>
                <TextField onChange={(e) => setRegData({ username: e.target.value, password: regData.password, discord: regData.discord })}sx={{ margin: '20px 0px' }} label="Nazwa użytkownika" size="small" />
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
                <TextField onChange={(e) => setRegData({ username: regData.username, password: regData.password, discord: e.target.value })} sx={{ marginTop: '20px' }} label="Discord ID" type="text" size="small" />
                <Button onClick={() => authRegister()} variant="contained" sx={{ marginTop: '20px', fontSize: '1rem', padding: '7px' }} >Zarejestruj się</Button>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Nie wszystkie pola zostały uzupełnione
                    </Alert>
                </Snackbar>
            </Stack>
        </Stack>
    )
}

export default Register