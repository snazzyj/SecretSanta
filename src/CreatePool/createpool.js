import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';
import config from '../config';
const uuid = require('uuid/v4')

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )

class CreatePool extends Component {

    static contextType = SecretSantaContext;

    constructor(props) {
        super(props);
        this.state = {
            users: [{
                name: "",
                email: "",
                id: uuid()
            }]
        };
    }

    createUI = () => {
        return this.state.users.map((_, i) => (
            i = 1 + i,
            <div key={i}>{i}
            <label htmlFor="name"></label>
          <input name="name" onChange={(e) => this.handleInputChange(i,e)}/>
          <label htmlFor="email"></label>
          <input name="email" onChange={(e) => this.handleInputChange(i,e)}/>
          <input type="button" value="Remove" onClick={(i) => this.removeField(i)} />
            </div>
        ))
    };

    addField = () => {
        this.setState(prevState => ({
            users: [...prevState.users, {name: "", email:""}]
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
        const {name, value} = e.target;
        let users =[...this.state.users];
        users[i] = {...users[i], [name] : value, id: uuid()};
        this.setState({
            users
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {users} = this.state
        users.splice(0,1)
        this.context.setPool(users)
        this.props.history.push('/pairs')
    }

    render() {
        return(
        <div>

        <h1>Create Pool</h1>

        <form onSubmit={this.handleSubmit}>
            <div>
                <p>Name{''}<Required /></p>

                <p>Email</p>
            </div>
            {this.createUI()}
            <input type="button" value="Add More"onClick={() => this.addField()} />
            <input type="submit" value="Get Pairs" />
        </form>
      </div>
      )}

}

export default CreatePool;