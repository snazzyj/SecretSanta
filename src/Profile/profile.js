import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

class Profile extends Component {

    state = {
        error: null,
        giftee: '',
        gifteeEmail: ''
    }

    static contextType = SecretSantaContext;

    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/pairings/${this.context.user.pool_id}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong')
                }
                return res.json()
            })
            .then(res => {
                const data = res;
                const { email } = this.context.user
                data.map((user) => {
                    console.log(user)
                    if (user.email === email) {
                        this.setState({
                            gifteeEmail: user.giftee
                        })
                    
                    }

                })
        fetch(`${config.API_ENDPOINT}/users/email/${this.state.gifteeEmail}`, {
            method: 'GET'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Something went wrong fetching the giftee's name`)
                }
               return res.json()
            })
            .then(res => {
                this.setState({
                    giftee: res[0].name
                })
                
            })
        })
    }

    handleAddInterest = (e) => {
        e.preventDefault();
    }

    render() {

        const {
            //allInterests, //needed for autocomplete later    
            addUserInterest,
            removeUserInterest,
            user
        } = this.context



        const { userInterests } = this.context.user;
        const {giftee} = this.state

        return (
            <section>
                <h1>Profile</h1>

                <form>
                    <label>Add Interests</label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button onClick={(e) => { this.handleAddInterest(e); addUserInterest(this.input.value) }}>Add</button>
                </form>

                <h3>Interests</h3>
                <ul>
                    {this.context.user.userInterests.map((interest, i) => (
                        <li key={`${interest}${i}`}>
                            {interest}
                            <a href="/" onClick={(e) => {
                                e.preventDefault();
                                removeUserInterest(interest);
                            }}>(X)</a>
                        </li>
                    ))}
                </ul>

                <h3>Current Partner</h3>
                <a href='/'>{giftee}</a>

            </section>

        )
    }

}

export default Profile;