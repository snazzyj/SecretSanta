import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

class Pairs extends Component {

    static contextType = SecretSantaContext;

    state = {
        error: null,
        pairs: []
    }

    componentDidMount() {
        const {new_pool_id} = this.context  
        let url = `${config.API_ENDPOINT}/pairings/${new_pool_id}`

        fetch(url, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Something went wrong during Get Pairs')
            }
            return res.json();
        })
        .then(data => {
            this.setState({
                pairs: data
            })
        })
        .catch(error => {
            this.setState({
                error
            })
        })
    }

render() {

    const { pairs } = this.state
    console.log({pairs})


    return (
        <section>
            {pairs.map((user) => (
                <li key={user.id}>{user.gifter} has: <span>{user.giftee}</span></li>
            ))} 
        </section>
    )
}

}

export default Pairs;