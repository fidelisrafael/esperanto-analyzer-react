import React, { Component } from 'react';
import Button from '@atlaskit/button';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';

import Word from './Word'

class SentenceAnalyzeResult extends Component {
  COLORS = {
    'Pronoun': 'red',
    'Noun': 'yellow'
  }

  render() {
    const {
      result = [],
      onBackClick,
    } = this.props

    const wordsToRender = []

    const BackButton = <Button appearance={'primary'} onClick={onBackClick}>Back</Button>

    if (!result.length) {
      return (
        <div className='no-analyzes-results'>
          <span className='text'>
            No analyzes results to show. <br />
            Switch to Writing Mode (<EditFilledIcon/>) to type some Esperanto sentences.
          </span><br />
          <p className='back-btn'>{BackButton}</p>
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
      <div className='sentence-analyze-result-wrapper'>
        <div>
          <strong><i>Analyze Results:</i> </strong>

          <p className='words-list'>{wordsToRender}</p>
        </div>

        <p className='back-btn'>{BackButton}</p>
      </div>
    )
  }
}

export default SentenceAnalyzeResult;
