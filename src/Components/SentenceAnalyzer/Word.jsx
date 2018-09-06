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
          className='wordSpan'
        >
          <Tag
            text={content}
            color={COLOR_BY_GRAMMAR_CLASS[grammarClass.toLowerCase()] || 'standard'}
            style={styles.word}
          />
        </span>
      </InlineDialog>
    )
  }
}

export default Word;
