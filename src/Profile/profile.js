import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

const url = config.API_ENDPOINT;

class Profile extends Component {

    state = {
        error: null,
        gifteeName: [],
        gifteeId: [],
        giftee: [],
        userInterests: []
    }

    static contextType = SecretSantaContext;

    componentDidMount() {
        const { email, pool_id} = this.context.user

        if(pool_id !== undefined) {
            pool_id.map((id) => {
                return fetch(`${url}/pairings/${id.pool_id}`, {
                    method: 'GET'
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Something went wrong')
                        }
                        return res.json()
                    })
                    .then(res => {
                        const {id} = this.context.user
                        res.map((user) => {
                            if( user.id === id ) {
                                return this.setState({
                                    giftee: [...this.state.giftee, 
                                    {
                                        gifteeName: user.giftee,
                                        gifteeId: user.giftee_id
                                    }],
                                })
                            }
                            return '';
                        })
                    })
                    .catch(error => {
                        this.setState({
                            error
                        })
                    })
            })
        }

        fetch(`${url}/interests/${email}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Something went wrong fetching user interests`)
                }
                return res.json()
            })
            .then(res => {
                this.setState({
                    userInterests: res
                })
            })
            .catch(error => {
                this.setState({
                    error
                })
            })
    }

    componentDidUpdate(prevState) {
        if (this.state.userInterests !== prevState.userInterests) {
        }
    }

    addUserInterest = (interest, e) => {
        e.preventDefault();
        const { email } = this.context.user
        let newInterest = { interest, email }

        this.setState({
            userInterests: this.state.userInterests.concat(newInterest)
        })

        fetch(`${url}/interests/${email}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                interest,
                email
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Something went wrong posting interest`)
                }
                return res.json()
            })
            .catch(error => {
                this.setState({
                    error
                })
            })
    }

    removeUserInterest = interest => {
        const { email } = this.context.user
        this.setState({
            userInterests: this.state.userInterests.filter((item) => {
                return item !== interest
            })
        })

        fetch(`${url}/interests/${email}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                interest
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Something went wrong deleting interest`)
                }
                return res.json()
            })
            .catch(error => {
                this.setState({
                    error
                })
            })
    }

    render() {
        const { userInterests, giftee } = this.state;
        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button onClick={(e) => {
                        this.addUserInterest(this.input.value, e)
                    }}>Add</button>
                </form>

                <h3>Interests</h3>
                <ul>
                    {userInterests.map((interest, i) => (
                        <li key={`${interest}${i}`}>
                            {interest.interest}
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                                this.removeUserInterest(interest);
                            }}>(X)</a>
                        </li>
                    ))}
                </ul>

                <h3>Who you've been paired up with: </h3>
                {giftee.map((giftee) => {
                    let id = giftee.gifteeId
                    console.log(id)
                    return <Link to={giftee.gifteeId} key={id}>{giftee.gifteeName}</Link>
                    // return <Link to={id} key={giftee.gifteeId}>{giftee.gifteeName}</Link>
                })}

            </section>

        )
    }

}

export default Profile;