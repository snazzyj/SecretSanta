import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';

class Profile extends Component {

    static contextType = SecretSantaContext;

    componentDidUpdate(prevState) {
        if (this.context.user.userInterests !== prevState.userInterests) { }
    }

    addUserInterest = (interest, e) => {
        e.preventDefault();
        this.context.addUserInterest(interest)
    }

    removeUserInterest = interest => {
        this.context.removeUserInterest(interest)
    }

    compareIdToParamsPairData = (id, giftee) => {
        let userId = id.toString();
        if (userId === this.props.match.params.userId) {
            return giftee.map((giftee, i) => {
                let id = giftee.giftee_id.toString()

                return <li key={i}><Link to={id} key={i}>{giftee.giftee}</Link></li>
            })
        } else {
            return "It wouldn't be very secretive to see these pairs"
        }
    }

    compareIdToParamsPoolData = (id, poolData) => {
        let userId = id.toString();

        if (userId === this.props.match.params.userId) {

            if (poolData.length === 0) {
                return `You haven't created any pools`
            }
            return poolData.map((pool) => {
                let url = `/pairs/${pool.pool_id}`
                return <li key={pool.pool_id}><Link to={url}>{pool.pool_name}</Link></li>
            })
        } else {
            return "It wouldn't be very secretive to see these pools"
        }
    }

    compareIdToParamsAddUserInterests = (id) => {
        let userId = id.toString();

        if (userId === this.props.match.params.userId) {
            return (
                <form>
                    <label>Add Interests</label>
                    <input ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button onClick={(e) => {
                        this.addUserInterest(this.input.value, e)
                    }}>Add</button>
                </form>
            )
        }
    }

    compareIdToParamsUserInterest = (id, userInterests) => {
        let userId = id.toString();

        if (userId === this.props.match.params.userId) {
            if(userInterests !== undefined) {
                return userInterests.map((interest, i) => (
                    <li key={`${interest}${i}`}>
                        {interest.interest}
                        <a href="/" onClick={(e) => {
                            e.preventDefault();
                            this.removeUserInterest(interest);
                        }}>(X)</a>
                    </li>
                ))
            }
        } else {
            fetch(`${config.API_ENDPOINT}/interests/${this.props.match.params.userId}`, {
                method: 'GET',
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error (`Something went wrong`)
                }

                return res.json()
            })
            .then(userInt => {
                return userInt.map((interest, i) => (
                    <li key={`${interest}${i}`}>
                        {interest.interest}
                    </li>
                ))
            })
        }
    }

    render() {
        const { userInterests, id, pairData, poolData } = this.context.user;
        return (
            <section>
                <h1>Profile</h1>


                {this.compareIdToParamsAddUserInterests(id)}
                <h3>Interests</h3>
                <ul>
                    {this.compareIdToParamsUserInterest(id, userInterests)}
                </ul>
                <h3>Pairs</h3>
                <ul>
                    {this.compareIdToParamsPairData(id, pairData)}
                </ul>

                <h3>Pools</h3>
                <ul>
                    {this.compareIdToParamsPoolData(id, poolData)}
                </ul>


            </section>

        )
    }

}

export default Profile;