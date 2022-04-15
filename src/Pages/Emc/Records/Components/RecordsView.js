import React from 'react'
import axios from 'axios'
import Draggable from 'react-draggable'

import { Stack, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Paper, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Snackbar, Alert } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Add from '@mui/icons-material/Add'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const PaperComponent = props => {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    )
  }

const RecordsView = () => {
    const [records, setRecords] = React.useState([])
    const [recordss, setRecordss] = React.useState([])
    const [search, setSearch] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [temps, setTemps] = React.useState([])
    const [selectedUser, setSelectedUser] = React.useState('')
    const [users, setUsers] = React.useState([])
    const [oldRecord, setOldRecord] = React.useState([])
    const [modRecord, setModRecord] = React.useState([])

    React.useEffect(() => {
        axios.get('https://emcserver.ct8.pl:59999/api/user/info').then(res => {
            setRecords(res.data)
        })

        axios.get('https://emcserver.ct8.pl:59999/api/records/get').then(res => {
            setRecordss(res.data)
        })
    }, [])

    const handleClose3 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen3(false);
      };

    const handleClickOpen = () => {
        setOpen(true)
      }
      const handleChange3 = (event) => {
          setChecked2(event.target.checked);
          setModRecord({...modRecord, insurance: event.target.checked})
      };

      const handleClickOpen2 = (acc) => {
        setOpen2(true)
        setOldRecord(acc)
        setModRecord(acc)
        setChecked2(acc.insurance)
      }

    const handleClose = () => {
    setOpen(false)
    }
    const handleClose2 = () => {
        setOpen2(false)
        }

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };

    const addRecord = (content) => {
        const insurance = temps.insurance === true ? 1 : 0
        if(!content.accID || !content.phone || !content.insurance) {
            setOpen3(true)
        } else {
            axios.post('https://emcserver.ct8.pl:59999/api/records/add', {accID: temps.accID, phone: temps.phone, insurance: insurance}).then(res => {
                setUsers(res.data)
                
            })
            window.location = '/emc/records'
        }
    } 

    const modifyRecord = (content, newContent) => {
        if(!newContent.firstName || !newContent.lastName) {
            setOpen3(true)
        } else {
            axios.post('https://emcserver.ct8.pl:59999/api/records/modify', {content, newContent}).then(res => {

            })
            window.location = '/emc/records'
        }
    }

    const [checked, setChecked] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);

    const handleChange2 = (event) => {
        setChecked(event.target.checked);
        setTemps({...temps, insurance: event.target.checked})
    };


    return(
        <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center" direction="column">
            <Stack sx={{ width: '95%', maxWidth: '1000px', flexWrap: 'wrap' }} justifyContent="space-between" alignItems="center" direction="row">
                <TextField onChange={(e) => setSearch(e.target.value)} sx={{ margin: '15px 0', width: '100%' }} variant="outlined" size="small" label="Szukaj pacjenta" />
                <Button onClick={() => handleClickOpen()} sx={{ width: '100%', marginBottom: '15px' }} align="center" variant="contained" startIcon={<Add />}>
                    DODAJ KARTOTEKĘ
                </Button>
            </Stack>
            <Stack sx={{ width: '95%', maxWidth: '1000px' }}>
                {
                    recordss.map((record, key) => {
                        if((record.firstName.toLowerCase().includes(search.toLowerCase()) || record.lastName.toLowerCase().includes(search.toLowerCase()) ||record.discord.toLowerCase().includes(search.toLowerCase()) ||record.username.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(`${record.firstName.toLowerCase()} ${record.lastName.toLowerCase()}`)))
                        return(
                            <Accordion sx={{ margin: '5px 0' }} key={key}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" >
                                <Typography>{record.firstName} {record.lastName} ({record.username}) - {record.rname}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Stack direction="column" spacing={2}>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Imię i nazwisko: {record.firstName} {record.lastName}</Typography>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Data urodzenia: {record.birthdate}</Typography>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Numer telefonu: {record.phone}</Typography>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Ubezpieczony w Eugenics: {record.insurance === 0 ? 'Nie' : 'Tak'}</Typography>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Nick OOC: {record.username}</Typography>
                                        <Typography variant="h7" sx={{fontSize: '1rem'}}>Discord: {record.discord}</Typography>
                                        <Button onClick={() => handleClickOpen2(record)} sx={{width: '100%', maxWidth: '500px'}} startIcon={<ModeEditOutlineOutlinedIcon />} variant="contained" color="warning">Zmień dane</Button>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Stack>
            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title" >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Dodawanie kartoteki
                </DialogTitle>
                <DialogContent sx={{width: '90vw', maxWidth: '600px'}}>
                    <DialogContentText spacing={1} justifyContent="center" alignItems="center">
                        <FormControl size="small" sx={{ marginTop: '10px' }} fullWidth>
                            <InputLabel id="select-label">Pacjent</InputLabel>
                            <Select labelId="select-label" value={selectedUser} label="Pacjent" onChange={handleChange} >
                                {
                                    records.map((record, key) => {
                                        return(
                                            <MenuItem value={key} key={key} onClick={() => setTemps({...temps, accID: record.id})}>{record.firstName} {record.lastName} ({record.username})</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <TextField fullWidth sx={{ margin: '20px 0' }} onChange={(e) => setTemps({...temps, phone: e.target.value})} label="Numer telefonu" type="number" size="small" variant="outlined" />
                        <FormGroup>
                            <FormControlLabel control={ <Checkbox checked={checked} onChange={handleChange2} /> } label="Ubezpieczony w Eugenics" />
                        </FormGroup>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => addRecord(temps)}>Dodaj</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open2} onClose={handleClose2} PaperComponent={PaperComponent}>
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Zmiana danych pacjenta
                </DialogTitle>
                <DialogContent sx={{width: '90vw', maxWidth: '600px'}}>
                    <DialogContentText >
                        <TextField sx={{marginTop: '20px'}} onChange={(e) => setModRecord({...modRecord, firstName: e.target.value})} variant="outlined" size="small" label="Imię" value={modRecord.firstName} fullWidth/>
                        <TextField sx={{marginTop: '20px'}} onChange={(e) => setModRecord({...modRecord, lastName: e.target.value})} variant="outlined" size="small" label="Nazwisko" value={modRecord.lastName} fullWidth/>
                        <TextField sx={{marginTop: '20px'}} onChange={(e) => setModRecord({...modRecord, phone: e.target.value})} type="number" variant="outlined" size="small" value={modRecord.phone} label="Numer telefonu" fullWidth/>
                        <FormGroup>
                            <FormControlLabel control={ <Checkbox checked={ checked2 } onChange={handleChange3} /> } label="Ubezpieczony w Eugenics" />
                        </FormGroup>
                        <Typography variant="h7" sx={{ marginTop: '20px' }}>Data urodzenia</Typography>
                        <TextField size="small" onChange={(e) => setModRecord({...modRecord, birthdate: e.target.value})} value={modRecord.birthdate} type="date" variant="outlined" sx={{marginBottom: '20px'}} fullWidth/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => modifyRecord(oldRecord, modRecord)}>Dodaj</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={open3} autoHideDuration={4000} onClose={handleClose3} >
                <Alert onClose={handleClose3} severity="error" sx={{ width: '100%' }}>
                    Nie wszystkie pola zostały uzupełnione
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default RecordsView