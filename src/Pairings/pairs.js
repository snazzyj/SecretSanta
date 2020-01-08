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
        const {pool_id} = this.context.user  
        let url = `${config.API_ENDPOINT}/pairings/${pool_id}`

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
            console.log({data})
        })
        .catch(error => {
            this.setState({
                error
            })
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')        
    }


render() {

    const { pairs } = this.state
    console.log({pairs})


    return (
        <section>
            {pairs.map((user) => (
                <li key={user.id}>{user.gifter} has: <span>{user.giftee}</span></li>
            ))}


            <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </section>
    )
}

}

export default Pairs;