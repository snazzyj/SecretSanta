import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';

class Profile extends Component {

    static contextType = SecretSantaContext;

    componentDidUpdate(prevState) {
        if (this.context.user.userInterests !== prevState.userInterests) {}
    }

    addUserInterest = (interest, e) => {
        e.preventDefault();
        this.context.addUserInterest(interest)
    }

    removeUserInterest = interest => {
        this.context.removeUserInterest(interest)
    }

    compareIdToParamsPairData = (id, giftee) => {
        let userId = id.toString()
        if(userId === this.props.match.params.userId) {
        return giftee.map((giftee, i) => {
            let id = giftee.giftee_id.toString()

            return <li key={i}><Link to={id} key={i}>{giftee.giftee}</Link></li>
        }) 
        } else {
            return "It wouldn't be very secretive to see these pairs"
        }
    }

    compareIdToParamsPoolData = (id, poolData) => {
        let userId = id.toString()

        if(userId === this.props.match.params.userId) {

            if(poolData.length === 0) {
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

    render() {
        const { userInterests, id, pairData, poolData } = this.context.user;
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