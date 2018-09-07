import React from 'react';
import ReactDOM from 'react-dom';
import { Word, InlineWord } from './Word';

it('renders <Word /> without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<Word />, div);
  ReactDOM.unmountComponentAtNode(div);
})


it('renders <InlineWord /> without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<InlineWord />, div);
  ReactDOM.unmountComponentAtNode(div);
})

