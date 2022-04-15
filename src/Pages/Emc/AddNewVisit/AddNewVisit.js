import React from 'react'

import { Stack } from '@mui/material'

import Context from './../../../Contexts/context'
import Header from './../../Components/Header'
import NewVisitForm from './Components/NewVisitForm'

const AddNewVisit = () => {
    const [context, setContext] = React.useContext(Context)

    if(context.isUserLogged === 'false') {
        window.location = '/'
    }

    return (
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Dodawanie wizyty" />
            <NewVisitForm accID={context.userUsername} />
        </Stack>
    )
}

export default AddNewVisit