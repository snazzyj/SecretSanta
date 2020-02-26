import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';
import CreatePoolService from './createpool-service';
import './createpool.css'

class CreatePool extends Component {

    static contextType = SecretSantaContext;

    constructor(props) {

        super(props);
        this.state = {
            users: [{
                name: "",
                email: "",
            }],
            pool_name: '',
            error: null,
            disabled: false
        };
    }

    createUI = () => {
        return this.state.users.map((_, i) => (
            i = 1 + i, // eslint-disable-line
            <div key={i} className="formInput">{i}
                <label htmlFor="name"></label>
                <input id="name" name="name" onChange={(e) => this.handleInputChange(i, e)} placeholder="Name"/>
                <label htmlFor="email"></label>
                <input id="email" name="email" onChange={(e) => this.handleInputChange(i, e)} placeholder="Email" />
                <button onClick={(i) => this.removeField(i)} className="removeButton">
                    Remove
                </button>
            </div>
        ))
    };

    addField = () => {
        this.setState(prevState => ({
            users: [...prevState.users, { name: "", email: "" }]
        }));
    }

    removeField = (i) => {
        let users = [...this.state.users];
        users.splice(i, 1)
        this.setState({
            users
        });
    }

    handleInputChange = (i, e) => {
        const { name, value } = e.target;
        let users = [...this.state.users];
        users[i] = { ...users[i], [name]: value };
        this.setState({
            users
        });
    }

    handlePoolName = e => {
        this.setState({
            pool_name: e.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { users, pool_name } = this.state
        const { email } = this.context.user
        let userList = users.filter(user => {
            return user.name !== "";
        });
        CreatePoolService.postUsers(userList);
        CreatePoolService.postPoolData(userList, pool_name, email)
        .then(poolIdNumber => {
            const {pool_id} = poolIdNumber
            this.context.setPoolData(pool_name, pool_id)
            this.props.history.push(`/pairs/${pool_id}`)
        });
    }

    handleClick = (e) => {
        if (this.state.disabled) {
            return;
        }
        this.setState({
            disabled: true
        })
    }

    render() {

        const {error} = this.state;

        return (
            <section className="poolForm">

                <h1 className="header">Create Pool</h1>
                <form>
                    <div className="poolName">
                    <label htmlFor="Pool__Name">Pool Name</label>
                    <input type="text" onChange={e => this.handlePoolName(e)} required/>
                    </div>
                    {this.createUI()}
                    <div className="bottomBtns">
                    <button type="submit" className="getPairsButton" onClick={(e) => {this.handleClick(); this.handleSubmit(e)}} disabled={this.state.disabled}>
                        {this.state.disabled ? 'Fetching Pair Data' : 'Get Pairs'}
                    </button>

                    <button onClick={() => this.addField()} className="addMorePairs">
                        Add More
                    </button>
                    </div>
                </form>

                <p>{error}</p>
            </section>
        )
    }

}

export default CreatePool;