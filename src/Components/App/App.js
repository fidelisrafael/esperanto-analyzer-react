import React, { Component } from 'react';
import '@atlaskit/css-reset';
import './App.css';

import Page from '@atlaskit/page';

import SentenceAnalyzer from '../SentenceAnalyzer/SentenceAnalyzer'
import GithubRibbon from '../GithubRibbon/GithubRibbon'

class App extends Component {
  render() {
    return (
      <Page className='app-wrapper'>
        <GithubRibbon href='https://github.com/fidelisrafael/esperanto-analyzer-react/' />
        <SentenceAnalyzer />
      </Page>
    );
  }
}

export default App;
