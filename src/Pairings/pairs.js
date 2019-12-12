import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submited')

        //fetch
        //post req
    }

    shuffle = (array) => {
        let poolOfNames = [];
        while (array.length !== 0) {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * array.length);
            poolOfNames.push(array[randomIndex]);
            array.splice(randomIndex, 1);
        }

        this.getPairings(poolOfNames);

        return poolOfNames;

    }

    getPairings = (array) => {
        let pool = [...array];
        let left = array.slice(0, array.length / 2);
        let right = array.slice(Math.ceil(array.length / 2));
        let leftCopy = [...left];
        let rightCopy = [...right];

        left.forEach((leftItem) => {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * rightCopy.length)

            pool
                .find(user => leftItem.id === user.id)
                .pairName = rightCopy[randomIndex].name
            
                rightCopy.splice(randomIndex, 1)
        })

        right.forEach((rightItem) => {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * leftCopy.length)

            pool
                .find(user => rightItem.id === user.id)
                .pairName = leftCopy[randomIndex].name
            
                leftCopy.splice(randomIndex, 1)
        })

        let res = left.concat(right);
        return res;
    }

    render() {

        const { users } = this.context;
        let userList = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        userList.map(obj => obj.pairName = "")
        console.log(userList)
        let poolList = this.shuffle(userList);
        console.log(poolList)

        return (
            <section>
                {poolList.map((user) => (
                    <li key={user.id}>{user.name} has: <span>{user.pairName}</span></li>
                ))}


                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;