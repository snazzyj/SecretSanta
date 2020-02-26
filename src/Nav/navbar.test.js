import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './navbar.js';
import App from '../App';

describe("Navbar Component", () => {
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
                <NavBar />
            </App>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });  
    
});







