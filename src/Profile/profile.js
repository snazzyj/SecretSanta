import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

const url = config.API_ENDPOINT;

class Profile extends Component {

    state = {
        error: null,
        giftee: [],
    }

    static contextType = SecretSantaContext;

    componentDidUpdate(prevState) {
        if (this.state.userInterests !== prevState.userInterests) {}
    }

    addUserInterest = (interest, e) => {
        e.preventDefault();
        this.context.addUserInterest(interest)
    }

    removeUserInterest = interest => {
        this.context.removeUserInterest(interest)
    }

    compareIdToParams = (id, giftee) => {
        let userId = id.toString()
        if(userId === this.props.match.params.userId) {
        return giftee.map((giftee) => {
            let id = giftee.gifteeId.toString()

            return <Link to={id} key={id}>{giftee.gifteeName}</Link>
        }) 
        } else {
            return "It wouldn't be very secretive to see these pairs"
        }
    }

    render() {
        const { userInterests } = this.context.user;
        const {giftee} = this.state
        const {id} = this.context.user
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
                <h3>Pairs</h3>
                {this.compareIdToParams(id, giftee)}


            </section>

        )
    }

}

export default Profile;