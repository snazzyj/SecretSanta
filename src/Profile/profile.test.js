import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import App from '../App';

describe("Test", () => {
    beforeAll(() => {  
      Object.defineProperty(window, "matchMedia", {
        value: jest.fn(() => { 
          return { 
            matches: true,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn()
          } 
        })
      });
    });
  
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const user = {
            name: '',
            email: '',
            id: 1,
            isLoggedIn: false,
            pairData: [],
            userInterests: [],
            poolData: []
          }
        ReactDOM.render(
            <App user={user}>
                <Profile />
            </App>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });  
    
});




