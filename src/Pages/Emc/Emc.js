import React from 'react'

import { Stack, Button } from '@mui/material'

import Context from './../../Contexts/context'
import Header from '../Components/Header'

// EMC - MAIN PAGE

const Emc = () => {
    const [context, setContext] = React.useContext(Context)

    if(context.isUserLogged === 'false') {
        window.location = '/'
    }

    return(
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Strona główna" />
        </Stack>
    )
}

export default Emc