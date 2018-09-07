import React, { Component } from 'react';
import Spinner from '@atlaskit/spinner';
import { ToggleStateless } from '@atlaskit/toggle'
import EditFilledIcon from '@atlaskit/icon/glyph/edit-filled';
import SearchIcon from '@atlaskit/icon/glyph/search';

import SentenceAnalyzeResult from './SentenceAnalyzeResult'
import SentenceTextArea from './SentenceTextArea'

const styles = {
  spinner: {
    margin: '20px 0',
    background: '#f3eedd',
    padding: '10px 5px',
    borderRadius: '5px'
  },
  spinner_text: {
    marginLeft: '5px',
    fontWeight: 500
  },
  status: {
    margin: '20px 0',
    background: '#f3eedd',
    padding: '10px 5px',
    borderRadius: '5px'
  }
}

// Just the view implementation without state
const SentenceAnalyzerView = (props) => {
  const {
    isLoading,
    isEditing,
    sentence,
    onSubmit,
    canSubmit,
    onsentenceChange,
    onToggleChange,
    toggleIsDisabled,
    analyzesResults
  } = props

  return (
    <div>
      {isLoading && <div style={styles.spinner}>
        <Spinner size='medium' /><span style={styles.spinner_text}>Analyzing...</span>
      </div>}

      {!isLoading && <div style={styles.status}>
        <ToggleStateless
          label="Change Visualization"
          size="large"
          onChange={onToggleChange}
          isChecked={isEditing}
          isDisabled={toggleIsDisabled}
          isDefaultChecked={isEditing}
        />
        <span>
          {isEditing && <span><EditFilledIcon /> Write Mode</span>}
          {!isEditing && <span>&nbsp;<SearchIcon /> Inspection Mode</span>}
        </span>
      </div>}

      {isEditing && <SentenceTextArea
        sentence={sentence}
        onSubmit={onSubmit}
        onChange={onsentenceChange}
        canSubmit={canSubmit}
      />}

      {!isEditing &&
        <SentenceAnalyzeResult
          onBackClick={onToggleChange}
          result={analyzesResults}
      />}
    </div>
  )
}

export default SentenceAnalyzerView
