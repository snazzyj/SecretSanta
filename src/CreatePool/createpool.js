import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';

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
                email: ""
            }]
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    createUI() {
        return this.state.users.map((el, i) => (
            <div key={i}>
            <label htmlFor="name">Name{''}<Required /></label>
          <input name="name" onChange={this.handleInputChange.bind(this, i)}/>
          <label htmlFor="email">Email</label>
          <input name="email" onChange={this.handleInputChange.bind(this, i)}/>
          <input type="button" value="Remove" onClick={this.removeField.bind(this,i)} />
            </div>
        ))
    };

    addField() {
        this.setState(prevState => ({
            users: [...prevState.users, {name: "", email:""}]
        }))
    }

    removeField(i) {
        let users = [...this.state.users];
        users.splice(i, 1)
        this.setState({
            users
        })
    }

    handleInputChange(i, e) {
        const {name, value} = e.target;
        let users =[...this.state.users];
        users[i] = {...users[i], [name] : value};
        this.setState({
            users
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // alert('Users entered: ' + JSON.stringify(this.state.users))
        const {users} = this.state
        this.context.setPool(users)
        this.props.history.push('/pairs')
    }

    render() {
        return(
        <div>

        <h1>Create Pool</h1>

        <form onSubmit={this.handleSubmit}>
            {this.createUI()}
            <input type="button" value="Add More"onClick={this.addField.bind(this)} />
            <input type="submit" value="Submit" />
        </form>
      </div>
      )}

}

export default CreatePool;