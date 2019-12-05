import React, {Component} from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    
    render(){
        const {users} = this.context;
        return(
            <section>
                <h2>Hi Pairs!</h2>
            </section>
        )
    }

}

export default Pairs;