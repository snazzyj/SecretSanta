import React from 'react';

const SecretSantaContext = React.createContext({
    users: [],
    user: {},
    new_pool_id: Number,
    setPool: () => {},
    setUserLogin: () => {},
    setUserLogout: () => {},
    addUserInterest: () => {},
    removeUserInterest: () => {},
    setPoolId: () => {}
})

export default SecretSantaContext