import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';



class Pairs extends Component {

    static defaultProps = {
        users: []
    }
    static contextType = SecretSantaContext;

    state = {
        pool: [],
        pool_id: null,
        error: null
    }

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/pools`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Something went wrong')
            }
            return res.json()
        })
        .then(res => {
            console.log(res)
            const { pool_name } = this.context.user;
            const data = res;
            
            data.map((pool) => {
                if (pool.pool_name === pool_name) {

                    this.context.setPoolId(pool.pool_id)

                    return this.setState({
                        pool_id: pool.pool_id
                    })
                }
            })
        })
        .catch(res => {
                this.setState({
                    error: res.error
                })
            })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')
        const {email, pool_name} = this.context.user;
        // fetch(`${config.API_ENDPOINT}/pools`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         admin_email: email,
        //         pool_name : pool_name
        //     })
        // })
        // .then(res => {
        //     (!res.ok)
        //         ? res.json().then(e => Promise.reject(e))
        //         : res.json()
        // })
        // .catch(res => {
        //     this.setState({
        //         error: res.error
        //     })
        // })

        //fetch
        //post req
    }

    render() {

        const { users } = this.context;


        return (
            <section>
                {users.map((user) => (
                    <li key={user.id}>{user.name} has: <span>{user.pairName}</span></li>
                ))}


                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;