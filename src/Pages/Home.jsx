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
  MINIMUM_VALID_SENTENCE_LENGTH = 2
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

    this.setState({ sentence: this.SAMPLE_SENTENCE }, () => (this.onSubmit()))
  }

  handleSentenceChange(event) {
    this.setState({sentence: event.target.value});
  }

  onSubmit(updateLoading=true) {
    const self = this

    self.setState({ isLoading: true })

    return self.requestSentenceAnalyze(self.state.sentence, (response) => {
      self.requestSent = true
      self.updateAnalyzesResults(response, updateLoading)
    })
  }

  updateAnalyzesResults(results = [], updateLoading=true) {
    const loadingValue = updateLoading ? { isLoading: false } : {}

    this.setState({ analyzesResults: results, isEditing: false, ...loadingValue })
  }

  requestSentenceAnalyze(sentence, callback = (json) => (json)) {
    return this.analyzeSentenceAPIRequest(sentence, (response) => {
      return callback(response)
    })
  }

  toggleEditing() {
    this.setState({ isEditing: !this.state.isEditing })
  }

  toggleIsDisabled() {
    return (!this.hasMinimumSentence() || !this.requestSent)
  }

  hasMinimumSentence() {
    return this.state.sentence.length >= this.MINIMUM_VALID_SENTENCE_LENGTH
  }

  analyzeSentenceAPIRequest(sentence, callback=((json) => (json))) {
    return API.analyzeSentence(sentence).then((response) => (callback(response.json())))
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
          onSubmit={this.onSubmit.bind(this)}
          onSentenceChange={this.handleSentenceChange.bind(this)}
          onToggleChange={this.toggleEditing.bind(this)}
          toggleIsDisabled={this.toggleIsDisabled()}
          analyzesResults={analyzesResults}
        />
    </div>
    )
  }
}

export default PageHome;
