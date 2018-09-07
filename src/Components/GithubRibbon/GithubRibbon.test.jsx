import React from 'react';
import ReactDOM from 'react-dom';
import GithubRibbon from './GithubRibbon';

it('renders <GithubRibbon /> without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<GithubRibbon />, div);
  ReactDOM.unmountComponentAtNode(div);
});
