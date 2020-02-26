import React from 'react';
import ReactDOM from 'react-dom';
import Homepage from './Homepage';
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
            <Homepage />
        </App>,
         div);
        ReactDOM.unmountComponentAtNode(div);
    });
    
});



