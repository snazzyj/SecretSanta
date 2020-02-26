import config from '../config';
const usersUrl = `${config.API_ENDPOINT}/users`;
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
                if (!res.ok) {
                    throw new Error(res.error)
                }
                return res.json()

            })
            .then(data => {
                return data;
            })
            .catch(error => {
                alert(error)
            });

    },
    postPoolData(users, pool_name, admin_email) {
        return fetch(pairsUrl, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                users,
                pool_name,
                admin_email
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.error)
            }
            return res.json()
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            alert(error)
        });
    }
}

export default CreatePoolService;