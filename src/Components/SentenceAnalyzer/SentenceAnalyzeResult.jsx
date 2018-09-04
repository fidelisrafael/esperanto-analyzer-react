import React, { Component } from 'react';
import Tag from '@atlaskit/tag';
import InlineDialog from '@atlaskit/inline-dialog';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';

import './Word.css'

const COLOR_BY_GRAMMAR_CLASS = {
  'adjective': 'green',
  'adverb': 'blue',
  'article': 'redLight',
  'conjunction': 'purple',
  'interjection': 'grey',
  'preposition': 'teal',
  'pronoun': 'red',
  'noun': 'purpleLight',
  'numeral': 'blueLight',
  'verb': 'yellow',
  'undefined': 'grey'
}


class Word extends Component {
  constructor() {
    super()
    this.state = {
      dialogIsOpen: false
    }
  }

  render() {
    const {
      grammarClass = '',
      content = '',
      placement = 'bottom-start'
    } = this.props

    return (
      <InlineDialog
        isOpen={this.state.dialogIsOpen}
        placement={placement}
        content={grammarClass}
        onContentClick={() => {
          this.setState({ dialogIsOpen: !this.state.dialogIsOpen });
        }}
      >
        <span
          onClick={() => {
            this.setState({dialogIsOpen: !this.state.dialogIsOpen})
          }}
        >
          <Tag
            text={content}
            color={COLOR_BY_GRAMMAR_CLASS[grammarClass.toLowerCase()] || 'standard'}
            className={`word word-${grammarClass.toLowerCase()}`}
          />
        </span>
      </InlineDialog>
    )
  }
}


class SentenceAnalyzeResult extends Component {
  COLORS = {
    'Pronoun': 'red',
    'Noun': 'yellow'
  }

  render() {
    const { result = [], onClick } = this.props

    const wordsToRender = []

    if (!result.length) {
      return (
        <div className='no-analyzes-results'>
          No analyzes results to show. <br />
          Switch to Writing Mode (<EditFilledIcon/>) to type some Esperanto sentences.
        </div>
      )
    }

    for (var i = 0; i < result.length; i++) {
      const current = result[i]
      const word = <Word
                      key={i}
                      grammarClass={current['value']}
                      content={current['word']}
                    />

      wordsToRender.push(word)
    }

    return (
      <div className='sentence-analyze-result-wrapper' onClick={onClick}>
        {wordsToRender}
      </div>
    );
  }
}

export default SentenceAnalyzeResult;
