import React from 'react'
import axios from 'axios'

import { Stack, TextField, Typography, Button, Snackbar, Alert } from '@mui/material'

const AddNewVisit = (props) => {
    const [formData, setFormData] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)

    const accID = props.accID

    const addVisit = () => {
        if( !formData.firstName || !formData.lastName || !formData.age || !formData.cel || !formData.date ) {
            setOpen(true)
        } else {
            axios.post('https://emc-web-panel.herokuapp.com/api/visits/add', {formData, accID}).then(res => {
            })
            setOpen2(true)
            setTimeout(() => {
                window.location = '/'
            }, 4000)
        } 
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

      const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen2(false);
      };

    return (
        <Stack sx={{ width: '100vw', marginTop: '20px'}} direction="column" justifyContent="center" alignItems="center" >
            <Stack sx={{ width: '90%', maxWidth: '400px' }}>
                <Typography variant="h6" sx={{ marginBottom: '20px', fontSize: '1rem' }} textAlign="justify" >
                    Umawianie wizyty on-line jeszcze nigdy nie było takie proste!
                </Typography>
                <TextField onChange={(e) => setFormData({...formData, firstName: e.target.value})} size="small" label="Imię" variant="outlined" sx={{ marginBottom: '10px' }} />
                <TextField onChange={(e) => setFormData({...formData, lastName: e.target.value})} size="small" label="Nazwisko" variant="outlined" sx={{ marginBottom: '10px' }} />
                <TextField onChange={(e) => setFormData({...formData, age: e.target.value})} size="small" label="Wiek" type="number" variant="outlined" sx={{ marginBottom: '10px' }} />
                <TextField onChange={(e) => setFormData({...formData, cel: e.target.value})} size="small" variant="outlined" label="Cel wizyty" sx={{ marginBottom: '10px' }} multiline />
                Preferowana data wizyty
                <TextField onChange={(e) => setFormData({...formData, date: e.target.value})} size="small" type="date" variant="outlined" sx={{ marginBottom: '20px' }} />
                <Button onClick={() => addVisit()} variant="contained" color="primary">Umów wizytę</Button>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        Nie wszystkie pola zostały uzupełnione
                    </Alert>
                </Snackbar>
                <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose2} >
                    <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                        Pomyślnie dodano wizytę! Zaraz powrócisz do strony głównej
                    </Alert>
                </Snackbar>
            </Stack>
        </Stack>
    )
}

export default AddNewVisit