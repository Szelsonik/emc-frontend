import React from 'react'
import axios from 'axios'

import { Stack, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material'
import Add from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';


import Context from './../../../Contexts/context'

const PatientsView = () => {
    const [context, setContext] = React.useContext(Context)
    const [search, setSearch] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [patients, setPatients] = React.useState([])
    const [currentUser, setCurrentUser] = React.useState([])
    const [oldUser, setOldUser] = React.useState([])
    const [modifyUser, setModifyUser] = React.useState([])

    const handleClickOpen = () => {
        setOpen(true)
      }


    React.useEffect(() => {
        axios.get('http://localhost:3001/api/user/info').then(res => {
            setPatients(res.data)
            res.data.map(user => {
                if(user.id.toString() === context.userUsername) {
                    setCurrentUser(user)
                }
            })
        })
    }, [])

    const modUser = (acc) => {
        setOldUser(acc)
        setModifyUser(acc)

    }

    const updateUser = (content, newContent) => {
        console.log(content, newContent)
    }

    return(
        <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center" direction="column">
            <Stack sx={{ width: '95%', maxWidth: '1000px', flexWrap: 'wrap' }} justifyContent="space-between" alignItems="center" direction="row">
                <TextField onChange={(e) => setSearch(e.target.value)} sx={{ margin: '15px 0', width: '100%' }} variant="outlined" size="small" label="Szukaj pacjenta" />
                <Button onClick={() => handleClickOpen()} sx={{ width: '100%', marginBottom: '15px' }} align="center" variant="contained" startIcon={<Add />}>
                    dodaj pacjenta
                </Button>
            </Stack>
            <Stack sx={{ width: '95%', maxWidth: '1000px' }}>
                <TableContainer component={Paper} sx={{ width: '95vw', maxWidth: '1000px' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Imię nazwisko</TableCell>
                                <TableCell align="right">Data urodzenia</TableCell>
                                <TableCell align="right">Ranga</TableCell>
                                <TableCell align="right">Nick OOC</TableCell>
                                <TableCell align="right">Discord</TableCell>
                                {
                                    currentUser.rpriv >= 80 ? <TableCell align="right">Doktor</TableCell> : ''
                                }
                                {
                                    currentUser.rpriv >= 99 ? <TableCell align="right">Admin</TableCell> : ''
                                }
                                {
                                    currentUser.rpriv >= 99 ? <TableCell align="right">Zmień dane</TableCell> : ''
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                patients.map((patient, key) => {
                                    if((patient.firstName.toLowerCase().includes(search.toLowerCase()) || patient.lastName.toLowerCase().includes(search.toLowerCase()) ||patient.discord.toLowerCase().includes(search.toLowerCase()) ||patient.username.toLowerCase().includes(search.toLowerCase()) || search.toLowerCase().includes(`${patient.firstName.toLowerCase()} ${patient.lastName.toLowerCase()}`)))
                                    return(
                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={patient.username}>
                                            <TableCell component="th" scope="row">{patient.firstName ? `${patient.firstName} ${patient.lastName}` : `-`}</TableCell>
                                            <TableCell align="right">{patient.birthdate ? `${patient.birthdate}` : `-`}</TableCell>
                                            <TableCell align="right">{patient.rname}</TableCell>
                                            <TableCell align="right">{patient.username}</TableCell>
                                            <TableCell align="right">{patient.discord}</TableCell>
                                            {
                                                currentUser.rpriv >= 80 ? <TableCell align="right">{patient.doctor === 1 ? <CheckIcon /> : <RemoveIcon />}</TableCell> : ''
                                            }
                                            {
                                                currentUser.rpriv >= 99 ? <TableCell align="right">{patient.admin === 1 ? <CheckIcon /> : <RemoveIcon />}</TableCell> : ''
                                            }
                                            {
                                                currentUser.rpriv >= 99 ? <TableCell align="right">
                                                    <IconButton color="warning" onClick={() => modUser(patient)}>
                                                        <ModeEditOutlineOutlinedIcon />
                                                    </IconButton>
                                                </TableCell> : ''
                                            }
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </Stack>
    )
}

export default PatientsView