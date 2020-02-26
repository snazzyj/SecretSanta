import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup.js';
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
        ReactDOM.render(
            <App>
                <Signup />
            </App>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });  
    
});







