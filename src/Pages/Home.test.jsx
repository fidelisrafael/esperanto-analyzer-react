import React from 'react'
import Home from './Home'
import API from './../Lib/API'
import TestUtils from './../Lib/TestUtils';

jest.mock('./../Lib/API');

const SAMPLE_SENTENCE_JSON_RESPONSE = [{"word":"Antaŭ","value":"Adverb"},{"word":"la","value":"Article"},{"word":"alveno","value":"Noun"},{"word":"de","value":"Preposition"},{"word":"portugaloj","value":"Noun"},{"word":"multaj","value":"Adjective"},{"word":"homoj","value":"Noun"},{"word":"loĝis","value":"Verb"},{"word":"tie","value":"Adverb"},{"word":"kie","value":"Adverb"},{"word":"hodiaŭ","value":"Adverb"},{"word":"estas","value":"Verb"},{"word":"Brazilo","value":"Noun"}]

const withTestComponent = (callbackFn, patchAPI=true) => {
  var componentCallbackFn = callbackFn

  if(patchAPI) {
    componentCallbackFn = (component, next) => {
      component.analyzeSentenceAPIRequest = jest.fn((sentence, callback) => (callback(SAMPLE_SENTENCE_JSON_RESPONSE)))
      callbackFn(component, next)
    }
  }

  return TestUtils.createTestComponent(<Home />, componentCallbackFn)
}

describe('<PageHome />', () => {
  it('renders without crashing', () => {
    withTestComponent((home, next) => {
      expect(home).toBeDefined()
      next()
    })
  })

  describe('MINIMUM_VALID_SENTENCE_LENGTH', () => {
    it('has the right value', () => {
      withTestComponent((home, next) => {
        expect(home.MINIMUM_VALID_SENTENCE_LENGTH).toEqual(2)
        next()
      })
    })
  })

  describe('SAMPLE_SENTENCE', () => {
    it('has the right value', () => {
      withTestComponent((home, next) => {
        expect(home.SAMPLE_SENTENCE).toEqual('Antaŭ la alveno de portugaloj, multaj homoj loĝis tie kie hodiaŭ estas Brazilo.')
        next()
      })
    })
  })

  describe('#setSampleSentence()', () => {
    it('Should do nothing if state.sentence is the sample text and user is not editing the sentence', () => {
      withTestComponent((home, next) => {        
        home.setState({ sentence: home.SAMPLE_SENTENCE, isEditing: false })

        expect(home.setSampleSentence()).toEqual(false)
        next()
      })
    })
    
    it('Should update state.sentence', () => {
      withTestComponent((home, next) => {        
        // First test to make sure sentence is empty and will change
        expect(home.state.sentence).toEqual('')

        home.setSampleSentence()

        expect(home.state.sentence).not.toEqual('')
        next()
      })
    })

    it('Should update state.analyzesResults', () => {
      withTestComponent((home, next) => {
        home.setSampleSentence()

        expect(home.state.analyzesResults).toEqual(SAMPLE_SENTENCE_JSON_RESPONSE)
        next()
      })
    })

    it('Should update `requestSent` class property', () => {
      withTestComponent((home, tearDown) => {
        home.setSampleSentence()

        expect(home.requestSent).toEqual(true)
        tearDown()
      })
    })
  })

  describe('#handleSentenceChange()', () => {
    it('Should update state.sentence', () => {
      withTestComponent((home, tearDown) => {
        home.handleSentenceChange({ target: { value: 'Multajn' }})

        expect(home.state.sentence).toEqual('Multajn')
        tearDown()
      })
    })
  })

  describe('#onSubmit', () => {
    it('should not update `state.isLoading` if a false parameter is given', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ isLoading: true })
        home.onSubmit(false)

        expect(home.state.isLoading).toEqual(true)
        tearDown()
      })
    })

    it('should update `state.isLoading` if no parameter is given', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ isLoading: true })
        home.onSubmit()

        expect(home.state.isLoading).toEqual(false)
        tearDown()
      })
    })

    it('Should update class property: `requestSent`', () => {
      withTestComponent((home, tearDown) => {
        home.requestSent = false
        home.onSubmit()

        expect(home.requestSent).toEqual(true)
        tearDown()
      })
    })

    it('Should call `updateAnalyzesResults()` function', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults = jest.fn()
        home.onSubmit()

        expect(home.updateAnalyzesResults.mock.calls.length).toEqual(1)
        tearDown()
      })
    })

    it('Should call `updateAnalyzesResults()` function with valid data', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults = jest.fn()
        home.onSubmit()

        expect(home.updateAnalyzesResults.mock.calls[0]).toEqual([SAMPLE_SENTENCE_JSON_RESPONSE, true])
        tearDown()
      })
    })

    it('Should call `updateAnalyzesResults()` function with data provided in `onSubmit()`', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults = jest.fn()
        home.onSubmit(false)

        expect(home.updateAnalyzesResults.mock.calls[0]).toEqual([SAMPLE_SENTENCE_JSON_RESPONSE, false])
        tearDown()
      })
    })
  })

  describe('#updateAnalyzesResults()', () => {
    it('Should update state.analyzesResults', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults([{'word': 'mia', 'value': 'pronoun'}])

        expect(home.state.analyzesResults).toEqual([{'word': 'mia', 'value': 'pronoun'}])
        tearDown()
      })
    })

    it('Should update state.analyzesResults with empty([]) array if no parameters are given', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults()

        expect(home.state.analyzesResults).toEqual([])
        tearDown()
      })
    })

    it('Should update state.isEditing as `false`', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults([{'word': 'mia', 'value': 'pronoun'}])

        expect(home.state.isEditing).toEqual(false)
        tearDown()
      })
    })

    it('Should update state.isLoading as `false`', () => {
      withTestComponent((home, tearDown) => {
        home.updateAnalyzesResults([{'word': 'mia', 'value': 'pronoun'}])

        expect(home.state.isLoading).toEqual(false)
        tearDown()
      })
    })
  })

  describe('#requestSentenceAnalyze()', () => {
    it('should call #analyzeSentenceAPIRequest()', () => {
      withTestComponent((home, tearDown) => {
        home.analyzeSentenceAPIRequest = jest.fn((sentence, fn) => (fn(SAMPLE_SENTENCE_JSON_RESPONSE)))

        home.requestSentenceAnalyze('Saluton!')

        expect(home.analyzeSentenceAPIRequest.mock.calls.length).toEqual(1)
        expect(home.analyzeSentenceAPIRequest.mock.calls[0][0]).toEqual('Saluton!')
        tearDown()
      })
    })

    it('should invokes the callback function sent as parameter', () => {
      withTestComponent((home, tearDown) => {
        const callbackFn = jest.fn()  

        home.requestSentenceAnalyze('Saluton!', callbackFn)

        expect(callbackFn.mock.calls.length).toEqual(1)
        expect(callbackFn.mock.calls[0][0]).toEqual(SAMPLE_SENTENCE_JSON_RESPONSE)
        tearDown()
      })
    })
  })

  describe('#toggleEditing()', () => {
    it('Should update state.isEditing as false if is true', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ isEditing: true })
        home.toggleEditing()

        expect(home.state.isEditing).toEqual(false)
        tearDown()
      })
    })

    it('Should update state.isEditing as true if is undefined', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ isEditing: undefined })
        home.toggleEditing()

        expect(home.state.isEditing).toEqual(true)
        tearDown()
      })
    })

    it('Should update state.isEditing as false if is true', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ isEditing: true })
        home.toggleEditing()

        expect(home.state.isEditing).toEqual(false)
        tearDown()
      })
    })
  })

  describe('#toggleIsDisabled()', () => {
    it('should returns `true` if request was never sent', () => {
      withTestComponent((home, tearDown) => {
        home.requestSent = false
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH) })

        expect(home.toggleIsDisabled()).toEqual(true)
        tearDown()
      })
    })

    it('should returns `false` if request was sent before', () => {
      withTestComponent((home, tearDown) => {
        home.requestSent = true
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH) })

        expect(home.toggleIsDisabled()).toEqual(false)
        tearDown()
      })
    })

    it('should returns `true` if the sentence is not large enough', () => {
      withTestComponent((home, tearDown) => {
        home.requestSent = true
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH - 1) })

        expect(home.toggleIsDisabled()).toEqual(true)
        tearDown()
      })
    })

    it('should returns `false` if the sentence is large enough', () => {
      withTestComponent((home, tearDown) => {
        home.requestSent = true
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH) })

        expect(home.toggleIsDisabled()).toEqual(false)
        tearDown()
      })
    })
  })

  describe('#hasMinimumSentence()', () => {
    it('should returns `false` if the sentence is not large enough', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH - 1) })

        expect(home.hasMinimumSentence()).toEqual(false)
        tearDown()
      })
    })

    it('should returns `true` if the sentence is large enough', () => {
      withTestComponent((home, tearDown) => {
        home.setState({ sentence: 'a'.repeat(home.MINIMUM_VALID_SENTENCE_LENGTH) })

        expect(home.hasMinimumSentence()).toEqual(true)
        tearDown()
      })
    })
  })

  describe('#analyzeSentenceAPIRequest', () => {
    it('Should call the default callback function', () => {
      withTestComponent((home, tearDown) => {
        API.analyzeSentence = jest.fn((sentence) => {
          return new Promise((resolve, error) => {
            process.nextTick(() => resolve({ json: () => (SAMPLE_SENTENCE_JSON_RESPONSE) }))
          })
        })

        return home.analyzeSentenceAPIRequest('Saluton').then((data) => {
          expect(data).toEqual(SAMPLE_SENTENCE_JSON_RESPONSE)
        })

      // This false parameter here tells the function `withTestComponent` to not patch the
      // function `analyzeSentenceAPIRequest`, since we will need it here
      }, false)
    })
  })

  describe('#render()', () => {
    it('renders <PageHeader /> as children', () => {
      withTestComponent((home, tearDown) => {
        const renderedHome = home.render()
        const pageHeader = renderedHome.props.children[0]

        expect(pageHeader.type.name).toEqual('PageHeader')
        tearDown()
      })
    })

    it('renders <SentenceAnalyzerView /> as children', () => {
      withTestComponent((home, tearDown) => {
        const renderedHome = home.render()
        const sentenceAnalyzerView = renderedHome.props.children[1]

        expect(sentenceAnalyzerView.type.name).toEqual('SentenceAnalyzerView')
        tearDown()
      })
    })

    describe('<PageHeader />', () => {
      it('should renders <PageHeader /> {bottomBar} properties', () => {
        withTestComponent((home, tearDown) => {
          const renderedHome = home.render()
          const { bottomBar } = renderedHome.props.children[0].props

          expect(bottomBar).toBeDefined()
          expect(bottomBar.type).toEqual('span')
          expect(bottomBar.props.children).toHaveLength(5)

          tearDown()
        })
      })

      it('should renders <PageHeader /> {bottomBar} text', () => {
        withTestComponent((home, tearDown) => {
          const renderedHome = home.render()
          const { bottomBar } = renderedHome.props.children[0].props

          // We are testing this NOW because we plan to have i18n sonner in the interface
          expect(bottomBar.props.children[0].trim()).toEqual("Type any text in Esperanto in the field below and click in the button 'Analyze' to perform a simple morphological analyses on it.")
          expect(bottomBar.props.children[2].trim()).toEqual("You can click")
          expect(bottomBar.props.children[3].props.children.trim()).toEqual("here")
          expect(bottomBar.props.children[4].trim()).toEqual("to try a sample text.")

          tearDown()
        })
      })
    })

    describe('<SentenceAnalyzerView />', () => {
      const testSentenceAnalyzerProp = (prop, expected) => {
        withTestComponent((home, tearDown) => {
          const renderedHome = home.render()
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
  })
})