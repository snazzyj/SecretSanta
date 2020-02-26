import React from 'react';
import ReactDOM from 'react-dom';
import CreatePool from './createpool.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CreatePool />, div);
    ReactDOM.unmountComponentAtNode(div);
});



