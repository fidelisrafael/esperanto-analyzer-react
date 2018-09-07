import React, { Component } from 'react';
import Tag from '@atlaskit/tag';
import InlineDialog from '@atlaskit/inline-dialog';

const styles = {
  word: {
    padding: '5px',
  }
}

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

// Word with `state` and on top of Atlaskit `<InlineDialog />`
class InlineWord extends Component {
  constructor() {
    super()
    this.state = {
      dialogIsOpen: false
    }
  }

  render() {
    const { content, grammarClass, placement = 'bottom-start' } = this.props

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
          className='wordSpan'
        >
          <Word content={content} grammarClass={grammarClass} />
        </span>
      </InlineDialog>
    )
  }

}

// Most basic representation of Word
const Word = ({ content, grammarClass = ''}) => (
  <Tag
    text={content}
    color={COLOR_BY_GRAMMAR_CLASS[grammarClass.toLowerCase()] || 'standard'}
    style={styles.word}
  />
)

export { InlineWord, Word }
