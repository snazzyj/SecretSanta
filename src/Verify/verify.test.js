import React from 'react';
import ReactDOM from 'react-dom';
import Verify from './verify.js';
import App from '../App';

describe("Verify Component", () => {
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
                <Verify />
            </App>, 
            div);
        ReactDOM.unmountComponentAtNode(div);
    });  
    
});







