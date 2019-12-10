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
        userList.map(obj => obj.pairId = "")

        let poolOfNames = [];
        while (userList.length !== 0) {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * userList.length);
            poolOfNames.push(userList[randomIndex]);
            userList.splice(randomIndex, 1);
        }
        let left = poolOfNames.slice(0, poolOfNames.length / 2);
        let right = poolOfNames.slice(Math.ceil(poolOfNames.length / 2))

        let rightCopy = [...right];
        let leftCopy = [...left];

        left.forEach((leftItem) => {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * rightCopy.length)
            poolOfNames
                .find(user => leftItem.id === user.id)
                .pairName = rightCopy[randomIndex].name
                .pairId = rightCopy[randomIndex].id

                rightCopy.splice(randomIndex, 1)
        })

        right.forEach((rightItem) => {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * leftCopy.length)
            poolOfNames
                .find(user => rightItem.id === user.id)
                .pairName = leftCopy[randomIndex].name

                leftCopy.splice(randomIndex, 1)
        })

        console.log(left);
        console.log(right);
        console.log(poolOfNames);

        return (
            <section>
                {poolOfNames.map((user) => (
                    <li key={user.id}>{user.name} has: <span>{user.pairName}</span></li>
                ))}


                <button type="submit" onClick={(e) => this.handleSubmit(e)}>Submit</button>
            </section>
        )
    }

}

export default Pairs;