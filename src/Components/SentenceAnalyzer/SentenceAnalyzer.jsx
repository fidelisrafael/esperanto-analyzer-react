import React, { Component } from 'react';
import ToggleStateless from '@atlaskit/toggle';
import Spinner from '@atlaskit/spinner';
import QueuesIcon from '@atlaskit/icon/glyph/queues';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';

import PageHeader from '@atlaskit/page-header'

import SentenceAnalyzeResult from './SentenceAnalyzeResult'
import SentenceTextArea from './SentenceTextArea'

import API from '../../Lib/API'

const SAMPLE_SENTENCE = 'Antaŭ la alveno de portugaloj, multaj homoj loĝis tie kie hodiaŭ estas Brazilo.'
const styles = {
  spinner: {
    margin: '20px 0',
    background: '#f3eedd',
    padding: '10px 5px',
    borderRadius: '5px'
  },
  status: {
    margin: '20px 0',
    background: '#f3eedd',
    padding: '10px 5px',
    borderRadius: '5px'
  },
  spinner_text: {
    marginLeft: '5px',
    fontWeight: 500
  },
  sentenceWrapper: {
    width: '75%',
    margin: '25px auto',
    background: '#fff9eb66',
    padding: '10px 20px',
    borderRadius: '10px',
    h1: {
      textAlign: 'center'
    }
  },

  bottomBar: {
    textDecoration: 'underline',
    cursor: 'pointer'
  }
}

class SentenceAnalyzer extends Component {
	constructor() {
    super()

    this.state = {
      analyzes_result: [],
      sentence: '',
      requestSent: false,
      loading: false,
      isEditing: true
    }

    this.handleSentenceChange = this.handleSentenceChange.bind(this)
    this.requestSentenceAnalyze = this.requestSentenceAnalyze.bind(this)
    this.activateEditing = this.activateEditing.bind(this)
    this.setSampleSentence = this.setSampleSentence.bind(this)
	}

  setSampleSentence(event) {
    // Already visualizing test sentence results
    if((this.state.sentence === SAMPLE_SENTENCE) && !this.state.isEditing) {
      return false
    }

    this.setState({ sentence: SAMPLE_SENTENCE }, () => (this.requestSentenceAnalyze()))
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

    this.setState({ loading: true })

    API.analyzeSentence(sentence).then((response) => {
      return response.json()
    }).then((json) => {
      self.setState({ analyzes_result: json, isEditing: false, requestSent: true, loading: false })
    })
  }

  toggleIsDisabled() {
    return (!this.hasMinimumSentence() || !this.state.requestSent)
  }

  hasMinimumSentence() {
    return this.state.sentence && this.state.sentence.length >= 2
  }

	render() {
    const { isEditing } = this.state

		return (
      <div style={styles.sentenceWrapper} className='sentenceWrapper'>
        <PageHeader
          bottomBar ={
            <span>
              Type any text in Esperanto in the field below and click in the button 'Analyze' to perform a simple morphological analyses on it. <br />
              You can click <span onClick={this.setSampleSentence} style={styles.bottomBar}>here</span> to try a sample text.
            </span>}
        >
          <span style={styles.sentenceWrapper.h1}><QueuesIcon /> Esperanto Sentence Analyzer</span>
        </PageHeader>

        <div>
          {this.state.loading && <div style={styles.spinner}>
            <Spinner size='medium' /><span style={styles.spinner_text}>Analyzing...</span>
          </div>}

          {!this.state.loading && <div style={styles.status}>
            <ToggleStateless
              label="Change Visualization"
              size="large"
              onChange={this.activateEditing}
              isChecked={isEditing}
              isDisabled={this.toggleIsDisabled()}
              isDefaultChecked={isEditing}
            />
            <span>
              {isEditing && <span><EditFilledIcon /> Write Mode</span>}
              {!isEditing && <span>&nbsp;<SearchIcon /> Inspection Mode</span>}
            </span>
          </div>}
        </div>

        {isEditing && <SentenceTextArea
          sentence={this.state.sentence}
          onSubmit={this.requestSentenceAnalyze}
          onChange={this.handleSentenceChange}
          canSubmit={this.hasMinimumSentence()}
        />}

        {!isEditing &&
          <SentenceAnalyzeResult
            onBackClick={this.activateEditing}
            result={this.state.analyzes_result}
        />}
      </div>
    )
	}
}

export default SentenceAnalyzer;
