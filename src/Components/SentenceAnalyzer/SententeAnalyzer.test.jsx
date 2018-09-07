import React from 'react'
import ReactDOM from 'react-dom'
import SentenceAnalyzeResult, { NoResultsFoundView } from './SentenceAnalyzeResult'
import SentenceTextArea from './SentenceTextArea'
import SentenceAnalyzerView from './SentenceAnalyzerView'

it('renders <NoResultsFoundView /> without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<NoResultsFoundView />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders <SentenceAnalyzeResult /> without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<SentenceAnalyzeResult />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders <SentenceTextArea /> without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<SentenceTextArea />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders <SentenceAnalyzerView /> without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(<SentenceAnalyzerView />, div)
  ReactDOM.unmountComponentAtNode(div)
})
