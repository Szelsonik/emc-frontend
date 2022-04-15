import React from 'react'
import axios from 'axios'

import { Stack, TextField, Button, Snackbar, Alert } from '@mui/material'

const SettingsView = (props) => {
    const [cUser, setCUser] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [modUser, setModUser] = React.useState([])
    const userID = props.userID

    React.useEffect(() => {
        axios.get('http://emcserver.ct8.pl:59999/api/records/get').then(res => {
            (res.data).map(user => {
                if(user.id.toString() === userID) {
                    setCUser(user)
                    setModUser(user)
                }
            })
        })
    }, [])

    const updateUser = (content, newContent) => {
        if(!newContent.firstName || !newContent.lastName || !newContent.discord) {
            setOpen(true)
        } else {
            axios.post('http://emcserver.ct8.pl:59999/api/records/modify', { content, newContent }).then(res => {

            })
            window.location.reload()
        }
    }

    const handleClose = () => {
        setOpen(false)
    }

    return(
        <Stack direction="column" justifyContent="center" alignItems="center" >
            <Stack sx={{ width: '90%', maxWidth: '400px', marginTop: '40px' }}>
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: '20px' }} label="Imię" value={modUser.firstName ? modUser.firstName : 'Imię'} onChange={e => setModUser({...modUser, firstName: e.target.value})} />
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: '20px' }} label="Nazwisko" value={modUser.lastName ? modUser.lastName : 'Nazwisko'} onChange={e => setModUser({...modUser, lastName: e.target.value})} />
                <TextField fullWidth variant="outlined" type="number" size="small" sx={{ marginBottom: '20px' }} label="Numer telefonu" value={modUser.phone ? modUser.phone : '000-000'} onChange={e => setModUser({...modUser, phone: e.target.value})} />
                <TextField fullWidth variant="outlined" size="small" sx={{ marginBottom: '20px' }} label="Discord" value={modUser.discord ? modUser.discord : 'Discord'} onChange={e => setModUser({...modUser, discord: e.target.valuetarget.value})} />
                Data urodzenia
                <TextField fullWidth variant="outlined" type="date" size="small" sx={{ marginBottom: '20px' }} value={modUser.birthdate} onChange={e => setModUser({...modUser, birthdate: e.target.value})} />
                <Button variant="contained" size="small" onClick={() => updateUser(cUser, modUser)} >Zapisz</Button>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} >
                    <Alert onClose={handleClose} severity="error" sx={{ width: '90%' }}>
                        Upewnij się, że wszystkie pola zostały uzupełnione
                    </Alert>
                </Snackbar>
            </Stack>
        </Stack>
    )
}

export default SettingsView