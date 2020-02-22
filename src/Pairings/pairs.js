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
        const { poolId } = this.props.match.params
        let url = `${config.API_ENDPOINT}/pairings/${poolId}`
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
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

                data.forEach(pair => {
                    if(pair.id === this.context.user.id) {
                        this.context.setPairData(pair)
                    }
                })

            })
            .catch(error => {
                this.setState({
                    error
                })
            })
    }

    verificationStatus = (boolean) => {
        return (boolean) ? '\u2713' : '\u0058'
     }

    render() {
        const { pairs } = this.state
        return (
            <section className="pairsList">
                <ul>
                {pairs.map((user) => (
                    <li key={user.id}>
                        <p>{user.gifter} has: <span>{user.giftee}</span>{' '}
                        </p>
                        <p className="confirmationStatus">Confirmed? {this.verificationStatus(user.confirmation)}</p>
                    </li>
                ))}
                </ul>
            </section>
        )
    }

}

export default Pairs;