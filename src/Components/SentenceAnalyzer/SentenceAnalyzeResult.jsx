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

const NoResultsFoundView = (props) => (
  <div style={styles.noResults}>
    <span className='text'>
      No analyzes results to show for you query. <br />
      Switch to Writing Mode (<EditFilledIcon/>) to type some Esperanto sentences.
    </span>
  </div>
)

class SentenceAnalyzeResult extends Component {

  renderWords(words) {
    const wordsToRender = []

    for (var i = 0; i < words.length; i++) {
      const current = words[i]
      const word = <InlineWord
                      key={i}
                      grammarClass={current['value']}
                      content={current['word']}
                    />

      wordsToRender.push(word)
    }

    return wordsToRender
  }

  render() {
    const {
      result = [],
      onBackClick,
    } = this.props

    const BackButton = <Button appearance={'primary'} onClick={onBackClick}>Back</Button>

    if (!result.length) {
      return (<span><NoResultsFoundView /><span style={styles.backBtn}>{BackButton}</span></span>)
    }

    return (
      <div style={styles.wrapper} className='sentence-analyze-result-wrapper'>
        <div>
          <strong><i>Analyze Results:</i> </strong>

          <div className='words-list'>
            {this.renderWords(result)}
          </div>
        </div>

        <p style={styles.backBtn}>{BackButton}</p>
      </div>
    )
  }
}

export {NoResultsFoundView}
export default SentenceAnalyzeResult;
