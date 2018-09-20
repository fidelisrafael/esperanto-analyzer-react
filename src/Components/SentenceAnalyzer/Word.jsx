import React, { Component } from 'react';

import Tag from '@atlaskit/tag';
import InlineDialog from '@atlaskit/inline-dialog';

export const STYLES = {
  word: {
    padding: '5px',
  }
}

export const COLOR_BY_GRAMMAR_CLASS = {
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
  'undefined': 'grey',
}

// Most basic representation of Word
const Word = ({ content, grammarClass = ''}) => (
  <Tag
    text={content}
    color={COLOR_BY_GRAMMAR_CLASS[grammarClass.toLowerCase()] || 'standard'}
    style={STYLES.word}
  />
)


// Word with `state` and on top of Atlaskit `<InlineDialog />`
class InlineWord extends Component {
  constructor() {
    super()
    this.state = {
      dialogIsOpen: false
    }
  }

  toggleDialogOpen() {
    this.setState({dialogIsOpen: !this.state.dialogIsOpen})
  }

  render() {
    const { content, grammarClass, placement = 'bottom-start' } = this.props

    return (
      <InlineDialog
        isOpen={this.state.dialogIsOpen}
        placement={placement}
        content={grammarClass}
        onContentClick={this.toggleDialogOpen.bind(this)}
      >
        <span
          onClick={this.toggleDialogOpen.bind(this)}
          className='wordSpan'
        >
          <Word content={content} grammarClass={grammarClass} />
        </span>
      </InlineDialog>
    )
  }

}

export { InlineWord, Word }
