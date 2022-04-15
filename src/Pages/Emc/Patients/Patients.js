import React from 'react'

import {Stack} from '@mui/material'

import Header from './../../Components/Header'
import PatientsView from './PatientsView'

const Patients = () => {
    return(
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Lista pacjentów" />
            <PatientsView />
        </Stack>
    )
}

export default Patients