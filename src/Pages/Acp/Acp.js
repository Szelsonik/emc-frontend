import React from 'react'
import axios from 'axios'

import { Stack } from '@mui/material'

import Context from './../../Contexts/context'
import Header from './../Components/Header'

const Acp = () => {
    const [context, setContext] = React.useContext(Context)
    const [allUsers, setAllUsers] = React.useState([])
    let userInfo = []

    React.useEffect(() => {
        axios.get('https://emc-web-panel.herokuapp.com/api/user/info').then(res => {
            setAllUsers(res.data)
        })
    }, [])

    allUsers.map((user, key) => {
        if(user.id.toString() === context.userUsername) {
            userInfo = user
            if(user.admin === 1 || user.rpriv >= 99) {
                
            } else {
                window.location = '/'
            }
        }
    })   


    return(
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Admin Control Panel" />
        </Stack>
    )
}

export default Acp