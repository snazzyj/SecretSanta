import config from '../config';
const usersUrl = `${config.API_ENDPOINT}/users`;
const poolsUrl = `${config.API_ENDPOINT}/pools`;
const pairsUrl = `${config.API_ENDPOINT}/pairings`;

const CreatePoolService = {
    postUsers(users) {
        return fetch(usersUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                users
            })
        })
            .then(res => {
                console.log(res)
                if (!res.ok) {
                    throw new Error('Something went wrong during users post request')
                }
                return res.json()

            })
            .then(data => {
                return data;
            })

    },

    postPool(pool_name, email) {
        return fetch(poolsUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                admin_email : email,
                pool_name
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong during pools post request')
                }
                return res.json()
            })
            .then(data => {
                let id = data.pool_id
                return id;
            })
    },

    postPairs(users, pool_id) {
        return fetch(pairsUrl, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                users,
                pool_id
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Something went wrong during pairs post request')
            }
            return res.json()
        })
        .then(data => {
            return data;
        })
    }
}

export default CreatePoolService;