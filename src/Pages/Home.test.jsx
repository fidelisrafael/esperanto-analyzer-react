import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';

it('renders <Home /> without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Home />, div);
  ReactDOM.unmountComponentAtNode(div);
});
