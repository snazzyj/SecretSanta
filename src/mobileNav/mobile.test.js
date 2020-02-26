import React from 'react';
import ReactDOM from 'react-dom';
import Mobile from './mobile.js';
import App from '../App';

describe("Mobile NavBar Component", () => {
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
                <Mobile />
            </App>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });  
    
});







