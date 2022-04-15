import React from 'react'
import axios from 'axios'

import { Stack } from '@mui/material'

import Header from './../../Components/Header'
import Context from './../../../Contexts/context'
import RecordsView from './Components/RecordsView.js'

const Records = () => {
    const [context, setContext] = React.useContext(Context)
    const [allUsers, setAllUsers] = React.useState([])
    let userInfo = []

    if(context.isUserLogged === 'false') {
        window.location = '/'
    }

    React.useEffect(() => {
        axios.get('https://emc-web-panel.herokuapp.com/api/user/info').then(res => {
            setAllUsers(res.data)
        })
    }, [])

    allUsers.map((user, key) => {
        if(user.id.toString() === context.userUsername) {
            userInfo = user
            if(user.admin === 1 || user.rpriv >= 10 || user.rankid >= 1) {
                
            } else {
                window.location = '/'
            }
        }
    })   


    return(
        <Stack sx={{ width: '100vw', minHeight: '100vh' }} direction="column">
            <Header site="Kartoteki" />
            <RecordsView />
        </Stack>
    )
}

export default Records