import React from 'react';

const SecretSantaContext = React.createContext({
    users: [],
    setPool: () => {},
    setUserLogin: () => {}
})

export default SecretSantaContext