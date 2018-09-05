import React, { Component } from 'react';
import { ToggleStateless } from '@atlaskit/toggle';
import QueuesIcon from '@atlaskit/icon/glyph/queues';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';

import PageHeader from '@atlaskit/page-header'

import './SentenceAnalyzer.css'

import SentenceAnalyzeResult from './SentenceAnalyzeResult'
import SentenceTextArea from './SentenceTextArea'

import API from '../../Lib/API'

const SAMPLE_SENTENCE = 'Antaŭ la alveno de portugaloj, multaj homoj loĝis tie kie hodiaŭ estas Brazilo.'

class SentenceAnalyzer extends Component {
	constructor() {
    super()

    this.state = {
      analyzes_result: [],
      sentence: '',
      requestSent: false,
      isEditing: true
    }

    this.handleSentenceChange = this.handleSentenceChange.bind(this)
    this.requestSentenceAnalyze = this.requestSentenceAnalyze.bind(this)
    this.activateEditing = this.activateEditing.bind(this)
    this.setSampleSentence = this.setSampleSentence.bind(this)
	}

  setSampleSentence(event) {
    // Already visualizing test sentence results
    if((this.state.sentence == SAMPLE_SENTENCE) && !this.state.isEditing) {
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

    API.analyzeSentence(sentence).then((response) => {
      return response.json()
    }).then((json) => {
      self.setState({ analyzes_result: json, isEditing: false, requestSent: true })
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

      <div className='sentence-wrapper'>
        <PageHeader
          bottomBar={
            <span>
              Type any text in Esperanto in the field below and click in the button 'Analyze' to perform a simple morphological analyses on it. <br />
              You can click <span onClick={this.setSampleSentence} style={ { 'text-decoration': 'underline', 'cursor': 'pointer' } }>here</span> to try a sample text.
            </span>}
        >
          <QueuesIcon /> Esperanto Sentence Analyzer
        </PageHeader>

        <div>
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
