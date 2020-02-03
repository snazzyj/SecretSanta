import React from 'react';

const SecretSantaContext = React.createContext({
    users: [],
    user: {},
    setPool: () => {},
    setPoolData: () => {},
    setPairData: () => {},
    setUserLogin: () => {},
    setUserLogout: () => {},
    addUserInterest: () => {},
    removeUserInterest: () => {},
})

export default SecretSantaContext