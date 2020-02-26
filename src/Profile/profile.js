import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';
import './profile.css'

const snowflake = '❆';

class Profile extends Component {

    state = {
        userInt: []
    }

    static contextType = SecretSantaContext;

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.getUserInterest(this.props.match.params.userId);
        };
    }

    addUserInterest = (interest, e) => {
        e.preventDefault();
        this.context.addUserInterest(interest);
    }

    removeUserInterest = interest => {
        this.context.removeUserInterest(interest);
    }

    compareIdToParamsPairData = (id, giftee) => {
        let userId = id.toString();
        if (userId === this.props.match.params.userId) {
            return giftee.map((giftee, i) => {
                let id = giftee.giftee_id.toString()

                return <li key={i}><Link to={id} key={i}><p>
                    {snowflake}
                    {' '}
                    {giftee.giftee}
                    <span>{' '}</span>
                    </p>
                    
                    </Link></li>
                    
            })
        } else {
            return "It wouldn't be very secretive to see these pairs"
        };
    }

    compareIdToParamsPoolData = (id, poolData) => {
        let userId = id.toString();

        if (userId === this.props.match.params.userId) {

            if (poolData.length === 0) {
                return `You haven't created any pools`
            }
            return poolData.map((pool) => {
                let url = `/pairs/${pool.pool_id}`
                return <li key={pool.pool_id}><Link to={url}><p>
                    {snowflake}
                    {' '}
                    {pool.pool_name}
                    </p>
                    </Link></li>
            })
        } else {
            return "It wouldn't be very secretive to see these pools"
        };
    }

    compareIdToParamsAddUserInterests = (id) => {
        let userId = id.toString();

        if (userId === this.props.match.params.userId) {
            return (
                <form>
                    <label htmlFor="addInterest">Add Interests</label>
                    <input className="addInterests" name="addInterest" ref={HTMLInputElement => this.input = HTMLInputElement} />

                    <button className="addInterestBtn plus" onClick={(e) => {
                        this.addUserInterest(this.input.value, e)
                    }}></button>
                </form>
            )
        };
    }

    displayInterests = (interestsList, id, userInterests) => {
        let userId = id.toString()
        if (userId === this.props.match.params.userId && userInterests.length !== 0) {
            return userInterests.map((interest, i) => (
                <li key={`${interest.interest}${i}`}>
                    <p>
                        {snowflake}
                        {' '}
                        {interest.interest}
                    </p>
                    <span>{' '}</span>
                    <a href="/" onClick={(e) => {
                        e.preventDefault();
                        this.removeUserInterest(interest);
                    }}>X</a>
                </li>
            ));
        } else if (userId !== this.props.match.params.userId && interestsList.length !== 0) {
            return interestsList.map((interest, i) => (
                <li key={`${interest.interest}${i}`}>
                    <p>
                        {snowflake}
                        {' '}
                        {interest.interest}
                    </p>
                </li>
            ))
        } else {
            return 'No interests to show'
        };
    }

    getUserInterest = (id) => {
        fetch(`${config.API_ENDPOINT}/interests/${id}`, {
            method: 'GET',
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Something went wrong`)
                }

                return res.json()
            })
            .then(userInt => {
                this.setState({
                    userInt
                })
            });
    }

    render() {
        const { userInterests, id, pairData, poolData } = this.context.user;
        const { userInt } = this.state;

        return (
            <section className="profileSection">
                <h1 className="profileHeader">Profile</h1>

                <section className="interestSection">
                    <h3>Interests</h3>
                    <ul className="userInterests">
                        {this.displayInterests(userInt, id, userInterests)}
                    </ul>
                    {this.compareIdToParamsAddUserInterests(id)}
                </section>
                <section className="pairSection">
                    <h3>Pairs</h3>
                    <ul>
                        {this.compareIdToParamsPairData(id, pairData)}
                    </ul>
                </section>
                <section className="poolSection">
                    <h3>Pools</h3>
                    <ul>
                        {this.compareIdToParamsPoolData(id, poolData)}
                    </ul>
                </section>
            </section>

        )
    }

}

export default Profile;