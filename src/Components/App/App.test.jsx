import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders <App /> without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
