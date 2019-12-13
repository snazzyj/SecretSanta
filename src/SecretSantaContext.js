import React from 'react';

const SecretSantaContext = React.createContext({
    users: [],
    user: {},
    setPool: () => {},
    setUserLogin: () => {},
    addUserInterest: () => {},
    removeUserInterest: () => {}
})

export default SecretSantaContext