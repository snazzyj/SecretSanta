import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';
import CreatePoolService from './createpool-service';

const Required = () => (
    <span className='required'>*</span>
  )

async function postPoolData (users, pool_name, email) {
    console.log({users})
    console.log({pool_name})
    console.log({email})
    const postUsers = CreatePoolService.postUsers(users);
    const postPool = CreatePoolService.postPool(pool_name, email);
    return [postUsers, postPool]
    // const postPairs = await CreatePoolService.postPairs(users, postPool.pool_id)
}

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
            error: null
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
        users[i] = {...users[i], [name] : value};
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
        const {users, pool_name} = this.state
        const {email} = this.context.user
        users.splice(0,1)
        this.context.setPool(users)

        postPoolData(users, pool_name, email)
        console.log({postData})

    }
    
    render() {
        const {users} = this.state;
        return(
        <div>

        <h1>Create Pool</h1>

        <form onSubmit={this.handleSubmit}>
            <label htmlFor="Pool__Name">Pool Name</label>
            <input type="text" onChange={e => this.handlePoolName(e)}/>
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