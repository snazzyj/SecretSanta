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
                <input type="button" value="Remove" onClick={(i) => this.removeField(i)} className="removeButton"/>
            </div>
        ))
    };

    addField = () => {
        this.setState(prevState => ({
            users: [...prevState.users, { name: "", email: "" }]
        }))
    }

    removeField = (i) => {
        let users = [...this.state.users];
        users.splice(i, 1)
        this.setState({
            users
        })
    }

    handleInputChange = (i, e) => {
        const { name, value } = e.target;
        let users = [...this.state.users];
        users[i] = { ...users[i], [name]: value };
        this.setState({
            users
        })
    }

    handlePoolName = e => {
        this.setState({
            pool_name: e.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const { users, pool_name } = this.state
        const { email } = this.context.user
        let userList = users.filter(user => {
            if(user.name !== "") {
                return user
            }
        })
        CreatePoolService.postUsers(userList)
        CreatePoolService.postPoolData(userList, pool_name, email)
        .then(poolIdNumber => {
            const {pool_id} = poolIdNumber
            this.context.setPoolData(pool_name, pool_id)
            this.props.history.push(`/pairs/${pool_id}`)
        })
    }


    render() {

        const {error} = this.state;

        return (
            <section className="poolForm">

                <h1 className="header">Create Pool</h1>
                <form onSubmit={this.handleSubmit} >
                    <div className="poolName">
                    <label htmlFor="Pool__Name">Pool Name</label>
                    <input type="text" onChange={e => this.handlePoolName(e)} required/>
                    </div>
                    {this.createUI()}
                    <div className="bottomBtns">
                    <input type="submit" value="Get Pairs" className="getPairsButton"/>
                    <input type="button" value="Add More" onClick={() => this.addField()} className="addMorePairs"/>
                    </div>
                </form>

                <p>{error}</p>
            </section>
        )
    }

}

export default CreatePool;