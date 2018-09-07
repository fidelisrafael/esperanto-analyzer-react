import React, { Component } from 'react';
import ToggleStateless from '@atlaskit/toggle';
import QueuesIcon from '@atlaskit/icon/glyph/queues';

import PageHeader from '@atlaskit/page-header'

import SentenceAnalyzerView from './../Components/SentenceAnalyzer/SentenceAnalyzerView'
import API from './../Lib/API'


const styles = {
  sentenceWrapper: {
    width: '75%',
    margin: '25px auto',
    background: '#fff9eb66',
    padding: '10px 20px',
    borderRadius: '10px',
  },
  sentenceWrapper_h1: {
    textAlign: 'center'
  },
  bottomBar: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}

// Kind of Controller that integrates data and view
class PageHome extends Component {
  SAMPLE_SENTENCE = 'Antaŭ la alveno de portugaloj, multaj homoj loĝis tie kie hodiaŭ estas Brazilo.'

  constructor() {
    super()

    this.state = {
      analyzesResults: [],
      sentence: '',
      isLoading: false,
      isEditing: true
    }

    // Instance property (not a state)
    this.requestSent = false
    this.setSampleSentence = this.setSampleSentence.bind(this)
  }

  setSampleSentence(event) {
    // Already visualizing test sentence results
    if((this.state.sentence === this.SAMPLE_SENTENCE) && !this.state.isEditing) {
      return false
    }

    this.setState({ sentence: this.SAMPLE_SENTENCE }, () => (this.requestSentenceAnalyze()))
  }

  handleSentenceChange(event) {
    this.setState({sentence: event.target.value});
  }

  activateEditing(value) {
    this.setState({ isEditing: !this.state.isEditing })
  }

  requestSentenceAnalyze() {
    const self = this
    const sentence = this.state.sentence

    this.setState({ isLoading: true })

    API.analyzeSentence(sentence).then((response) => {
      return response.json()
    }).then((json) => {
      self.requestSent = true
      self.setState({ analyzesResults: json, isEditing: false, isLoading: false })
    })
  }

  toggleIsDisabled() {
    return (!this.hasMinimumSentence() || !this.requestSent)
  }

  hasMinimumSentence() {
    return this.state.sentence && this.state.sentence.length >= 2
  }

  render() {
    const {
      isEditing,
      isLoading,
      sentence,
      analyzesResults
    } = this.state

    return (
      <div style={styles.sentenceWrapper} className='sentenceWrapper'>
        <PageHeader
          bottomBar ={
            <span>
              Type any text in Esperanto in the field below and click in the button 'Analyze' to perform a simple morphological analyses on it. <br />
              You can click <span onClick={this.setSampleSentence} style={styles.bottomBar}>here</span> to try a sample text.
            </span>}
        >
          <span style={styles.sentenceWrapper_h1}><QueuesIcon /> Esperanto Sentence Analyzer</span>
        </PageHeader>

        <SentenceAnalyzerView
          isLoading={isLoading}
          isEditing={isEditing}
          sentence={sentence}
          canSubmit={this.hasMinimumSentence()}
          onSubmit={this.requestSentenceAnalyze.bind(this)}
          onsentenceChange={this.handleSentenceChange.bind(this)}
          onToggleChange={this.activateEditing.bind(this)}
          toggleIsDisabled={this.toggleIsDisabled()}
          analyzesResults={analyzesResults}
        />
    </div>
    )
  }
}

export default PageHome;
