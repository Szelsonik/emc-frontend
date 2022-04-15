import React from 'react'

import { Stack, Button } from '@mui/material'

import Context from './../../../../Contexts/context'
import Header from './../../../Components/Header'
import SettingsView from './SettingsView'

const Settings = () => {
    const [context, setContext] = React.useContext(Context)

    if(context.isUserLogged === 'false') {
        window.location = '/'
    }

    return(
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Ustawienia konta" />
            <SettingsView userID={context.userUsername} />
        </Stack>
    )
}

export default Settings