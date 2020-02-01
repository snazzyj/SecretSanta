import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// user = {
//   name: 'Alex',
//   email: '123@gmail.com',
//   id: 1,
//   pairData: [],
//   userInterests: [],
//   poolData: [],
// }

it('renders without crashing', () => {

  const div = document.createElement('div');

  ReactDOM.shallow(<App />, div);

  ReactDOM.unmountComponentAtNode(div);
});

