import React, { Component } from 'react';
import FieldTextArea, { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import Button from '@atlaskit/button';
import { Toggle, ToggleStateless } from '@atlaskit/toggle';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import QueuesIcon from '@atlaskit/icon/glyph/queues';
import MediaServicesTextIcon from '@atlaskit/icon/glyph/media-services/text';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';

import Form, {
  Field,
  FieldGroup,
  FormHeader,
  FormSection,
  FormFooter,
} from '@atlaskit/form';

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
      isEditing: true
    }

    this.handleSentenceChange = this.handleSentenceChange.bind(this)
    this.requestSentenceAnalyze = this.requestSentenceAnalyze.bind(this)
    this.activatedEditing = this.activatedEditing.bind(this)
    this.setSampleSentence = this.setSampleSentence.bind(this)
	}

  setSampleSentence(event) {
    event.preventDefault()

    this.setState({ sentence: SAMPLE_SENTENCE })
  }

  handleSentenceChange(event) {
    this.setState({sentence: event.target.value});
  }

  activatedEditing(value) {
    this.setState({ isEditing: !this.state.isEditing })
  }

  requestSentenceAnalyze() {
    const self = this
    const sentence = this.state.sentence

    API.analyzeSentence(sentence).then((response) => {
      return response.json()
    }).then((json) => {
      self.setState({ analyzes_result: json, isEditing: false })
    })
  }

	render() {
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
            onChange={this.activatedEditing}
            isChecked={this.state.isEditing}
          />
          <span>
            {this.state.isEditing && <span><EditFilledIcon /> Write Mode</span>}
            {!this.state.isEditing && <span>&nbsp;<SearchIcon /> Inspection Mode</span>}
          </span>
        </div>

        {this.state.isEditing && <SentenceTextArea
          sentence={this.state.sentence}
          onSubmit={this.requestSentenceAnalyze}
          onChange={this.handleSentenceChange}
        />}

        {!this.state.isEditing &&
          <SentenceAnalyzeResult
            result={this.state.analyzes_result}
        />}
      </div>
    )
	}
}

export default SentenceAnalyzer;
