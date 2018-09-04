import React, { Component } from 'react';
import '@atlaskit/css-reset';
import './App.css';

import Page from '@atlaskit/page';

import SentenceAnalyzer from '../SentenceAnalyzer/SentenceAnalyzer'

class App extends Component {
  render() {
    return (
      <Page>
        <SentenceAnalyzer />
      </Page>
    );
  }
}

export default App;
