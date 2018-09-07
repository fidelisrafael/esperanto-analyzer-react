import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import Home from './Home'

const withHome = (callback=(homeComponent, fn) => {fn()}) => {
  const div = document.createElement('div')
  const tearDownFn = () => { ReactDOM.unmountComponentAtNode(div) }

  const homeComponent = ReactDOM.render(<Home />, div)

  callback.apply(homeComponent, [homeComponent, tearDownFn])
}

it('renders <Home /> without crashing', () => {
  withHome((homeComponent, tearDown) => {
    tearDown()
  })
})

it('renders <PageHeader /> as children', () => {
  withHome((homeComponent, tearDown) => {
    const renderedHome = homeComponent.render()
    const pageHeader = renderedHome.props.children[0]

    expect(pageHeader.type.name).toEqual('PageHeader')

    tearDown()
  })
})

it('renders <SentenceAnalyzerView /> as children', () => {
  withHome((homeComponent, tearDown) => {
    const renderedHome = homeComponent.render()
    const sentenceAnalyzerView = renderedHome.props.children[1]

    expect(sentenceAnalyzerView.type.name).toEqual('SentenceAnalyzerView')

    tearDown()
  })
})

it('should renders <PageHeader /> {bottomBar} properties', () => {
  withHome((homeComponent, tearDown) => {
    const renderedHome = homeComponent.render()
    const { bottomBar } = renderedHome.props.children[0].props

    expect(bottomBar).toBeDefined()
    expect(bottomBar.type).toEqual('span')
    expect(bottomBar.props.children).toHaveLength(5)

    tearDown()
  })
})

it('should renders <PageHeader /> {bottomBar} text', () => {
  withHome((homeComponent, tearDown) => {
    const renderedHome = homeComponent.render()
    const { bottomBar } = renderedHome.props.children[0].props

    // We are testing this NOW because we plan to have i18n sonner in the interface
    expect(bottomBar.props.children[0].trim()).toEqual("Type any text in Esperanto in the field below and click in the button 'Analyze' to perform a simple morphological analyses on it.")
    expect(bottomBar.props.children[2].trim()).toEqual("You can click")
    expect(bottomBar.props.children[3].props.children.trim()).toEqual("here")
    expect(bottomBar.props.children[4].trim()).toEqual("to try a sample text.")

    tearDown()
  })
})

describe('<SentenceAnalyzerView /> with default state', () => {
  const testSentenceAnalyzerProp = (prop, expected) => {
    withHome((homeComponent, tearDown) => {
      const renderedHome = homeComponent.render()
      const sentenceAnalyzerView = renderedHome.props.children[1]

      expect(sentenceAnalyzerView.props[prop]).toEqual(expected)

      tearDown()
    })
  }

  it('Should render with empty `analyzesResults`', () => {
    testSentenceAnalyzerProp('analyzesResults', [])
  })

  it('Should render with false `canSubmit`', () => {
    testSentenceAnalyzerProp('canSubmit', false)
  })

  it('Should render with true `isEditing`', () => {
    testSentenceAnalyzerProp('isEditing', true)
  })

  it('Should render with false `isLoading`', () => {
    testSentenceAnalyzerProp('isLoading', false)
  })

  it('Should render with true `toggleIsDisabled`', () => {
    testSentenceAnalyzerProp('toggleIsDisabled', true)
  })

  it('Should render with empty `sentence`', () => {
    testSentenceAnalyzerProp('sentence', '')
  })
})

describe('setSampleSentence()', () => {
  const SAMPLE_SENTENCE_JSON_RESPONSE = [{"word":"Antaŭ","value":"Adverb"},{"word":"la","value":"Article"},{"word":"alveno","value":"Noun"},{"word":"de","value":"Preposition"},{"word":"portugaloj","value":"Noun"},{"word":"multaj","value":"Adjective"},{"word":"homoj","value":"Noun"},{"word":"loĝis","value":"Verb"},{"word":"tie","value":"Adverb"},{"word":"kie","value":"Adverb"},{"word":"hodiaŭ","value":"Adverb"},{"word":"estas","value":"Verb"},{"word":"Brazilo","value":"Noun"}]

  it('Should update state and properties', () => {
    withHome((homeComponent, tearDown) => {
      expect(homeComponent.state.sentence).toEqual('')
      // Override HTTP request behaviour
      homeComponent.requestAPISentenceAnalyze = jest.fn((sentence, callback) => {
        return callback(SAMPLE_SENTENCE_JSON_RESPONSE)
      })

      // Dispatch the method call
      homeComponent.setSampleSentence()

      // Component state
      expect(homeComponent.state.sentence).not.toEqual('')
      expect(homeComponent.state.analyzesResults).toEqual(SAMPLE_SENTENCE_JSON_RESPONSE)
      //expect(homeComponent.state.isLoading).toEqual(true)


      // Component class properties
      expect(homeComponent.requestSent).toEqual(true)

      tearDown()
    })
  })
})
