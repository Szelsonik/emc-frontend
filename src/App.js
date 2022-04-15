import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import axios from 'axios'

import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Emc from './Pages/Emc/Emc'
import Records from './Pages/Emc/Records/Records'
import Patients from './Pages/Emc/Patients/Patients'
import AddNewVisit from './Pages/Emc/AddNewVisit/AddNewVisit'
import Settings from './Pages/Emc/Profile/Settings/Settings'
import MyVisits from './Pages/Emc/Profile/MyVisits/MyVisits'
import Acp from './Pages/Acp/Acp'

import Context from './Contexts/context'

const App = () => {
    const startingContext = {
        isUserLogged: localStorage.getItem('isUserLogged') ? localStorage.getItem('isUserLogged') : 'false',
        userUsername: localStorage.getItem('userUsername') ? localStorage.getItem('userUsername') : 'false',
    }

    const [context, setContext] = useState(startingContext)

    return(
        <Context.Provider value={[context, setContext]}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/auth" element={<Auth />} />

                    <Route path="/emc" element={<Emc />} />
                    <Route path='emc/add-new-visit' element={<AddNewVisit />} />
                    <Route path='emc/records' element={<Records />} />
                    <Route path='emc/patients' element={<Patients />} />
                    <Route path="/emc/profile/settings" element={<Settings />} />
                    <Route path="/emc/profile/my-visits" element={<MyVisits />} />
                    
                    <Route path="/acp" element={<Acp />} />
                </Routes>
            </BrowserRouter>
        </Context.Provider>
    )
}

export default App