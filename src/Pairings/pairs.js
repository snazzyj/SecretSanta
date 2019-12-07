import React, { Component } from 'react';
import SecretSantaContext from '../SecretSantaContext';

class Pairs extends Component {

    static defaultProps = {
        users: []
    }

    static contextType = SecretSantaContext;

    render() {

        // const shuffle = (userList) => {
        //     userList.sort(() => Math.random() - .5);
        // };

        const { users } = this.context;
        // const userList = users.map(obj => {
        //     let newObject = {};
            
        //     Object.keys(obj).forEach(properyKey => {
        //         newObject[properyKey] = obj[properyKey]
        //     });
            
        //     return newObject;
        // })
        // userList.map(obj => obj.pairName = "")
        // shuffle(userList);
        // console.log(userList);
        
        // let left = userList.slice(0, userList.length/2);
        // let right = userList.slice(Math.ceil(userList.length/2))

        // console.log(right)
        
        // left.forEach( (leftItem, leftIndex) =>
        // userList
        // .find(listUser => leftItem.name === listUser.name)
        // .pairName = right[leftIndex].name
        // );
        
        // console.log(left)
        
        const poolOfNames = users.map(obj => {
            let newObject = {};

            Object.keys(obj).forEach(properyKey => {
                newObject[properyKey] = obj[properyKey]
            });

            return newObject;
        })
        poolOfNames.map(obj => obj.pairName = "")
        
        let array2 = [];

        while(poolOfNames.length !== 0) {
            let randomIndex;
            randomIndex = Math.floor(Math.random() * poolOfNames.length);
            array2.push(poolOfNames[randomIndex]);
            poolOfNames.splice(randomIndex, 1);
        }
        console.log(array2)

         let left = array2.slice(0, array2.length/2);
         let right = array2.slice(Math.ceil(array2.length/2))

         left.forEach( (leftItem, leftIndex) => 
            array2
            .find(user => leftItem.id === user.id)
            .pairName = right[leftIndex].name
         )

         right.forEach( (rightItem, rightIndex) =>
            array2
            .find(user => rightItem.id === user.id)
            .pairName = left[rightIndex].name
         )

         console.log(left);
         console.log(right);
         console.log(array2);

        return (
            <section>
                {array2.map(usr => (
                    <li key={usr.id}>{usr.name} has: <span>{usr.pairName}</span></li>
                    ))}
            </section>
        )
    }

}

export default Pairs;