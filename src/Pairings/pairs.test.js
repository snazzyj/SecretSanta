import React from 'react';
import ReactDOM from 'react-dom';
import Pairs from './Pairs';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Pairs match={{params: {poolId: 1}}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});



