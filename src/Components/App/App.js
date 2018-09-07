import '@atlaskit/css-reset';
import './App.css';

import React, { Component } from 'react';
import Page from '@atlaskit/page';

import PageHome from '../../Pages/Home'
import GithubRibbon from '../GithubRibbon/GithubRibbon'

class App extends Component {
  render() {
    return (
      <Page className='app-wrapper'>
        <GithubRibbon href='https://github.com/fidelisrafael/esperanto-analyzer-react/' />
        <PageHome {...this.props} />
      </Page>
    );
  }
}

export default App;
