import React from 'react'

import Context from '../../Contexts/context'

const Home = () => {
    const [context, setContext] = React.useContext(Context)

    if(context.isUserLogged === 'false') {
        window.location = '/auth'
    } else {
        window.location = '/emc'
    }
}

export default Home