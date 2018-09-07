import React, { Component } from 'react';
import Button from '@atlaskit/button';
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';

import { InlineWord } from './Word'

const styles = {
  noResults: {
    marginTop: '20px',
    marginBottom: '10px'
  },
  wrapper: {
    margin: '20px 0',
    borderTop: '2px solid #e4dcca66',
    paddingTop: '20px',
    paddingBottom: '20px'
  },
  backBtn: {
    marginTop: '50px'
  }
}

class SentenceAnalyzeResult extends Component {
  render() {
    const {
      result = [],
      onBackClick,
    } = this.props

    const wordsToRender = []

    const BackButton = <Button appearance={'primary'} onClick={onBackClick}>Back</Button>

    if (!result.length) {
      return (
        <div style={styles.noResults} >
          <span className='text'>
            No analyzes results to show. <br />
            Switch to Writing Mode (<EditFilledIcon/>) to type some Esperanto sentences.
          </span><br />
          <p style={styles.backBtn}>{BackButton}</p>
        </div>
      )
    }

    for (var i = 0; i < result.length; i++) {
      const current = result[i]
      const word = <InlineWord
                      key={i}
                      grammarClass={current['value']}
                      content={current['word']}
                    />

      wordsToRender.push(word)
    }

    return (
      <div style={styles.wrapper} className='sentence-analyze-result-wrapper'>
        <div>
          <strong><i>Analyze Results:</i> </strong>

          <p className='words-list'>{wordsToRender}</p>
        </div>

        <p style={styles.backBtn}>{BackButton}</p>
      </div>
    )
  }
}

export default SentenceAnalyzeResult;
