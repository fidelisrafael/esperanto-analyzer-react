import React from 'react'
import ReactDOM from 'react-dom'
import { renderToStaticMarkup } from 'react-dom/server'
import SentenceAnalyzeResult, { STYLES, NoResultsFoundView } from './../SentenceAnalyzeResult'
import { InlineWord } from './../Word'
import TestUtils from './../../../Lib/TestUtils'

const SIMPLE_SAMPLE_RESULTS = [
  { 'word': 'mia', value: 'pronoun' },
  { 'word': 'nomo', value: 'noun' }
]

const SAMPLE_TEST_RESULTS = [
  {"word":"Antaŭ","value":"Adverb"},
  {"word":"la","value":"Article"},
  {"word":"alveno","value":"Noun"},
  {"word":"de","value":"Preposition"},
  {"word":"portugaloj","value":"Noun"},
  {"word":"multaj","value":"Adjective"},
  {"word":"homoj","value":"Noun"},
  {"word":"loĝis","value":"Verb"},
  {"word":"tie","value":"Adverb"},
  {"word":"kie","value":"Adverb"},
  {"word":"hodiaŭ","value":"Adverb"},
  {"word":"estas","value":"Verb"},
  {"word":"Brazilo","value":"Noun"}
]

const SAMPLE_EMPTY_HTML_OUTPUT = '<span><div style="margin-top:20px;margin-bottom:10px"><span class="text">No analyzes results to show for you query.<br/>Switch to Writing Mode (<span class="sc-gqjmRU hzaGXC"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><path d="M4.02 19.23a1 1 0 0 0 1.18 1.18l3.81-.78-4.21-4.21-.78 3.81zM19.844 6.707l-2.12-2.122A1.997 1.997 0 0 0 16.308 4c-.512 0-1.024.195-1.415.585l-9.757 9.758 4.95 4.95 9.757-9.758a2 2 0 0 0 0-2.828z" fill="currentColor" fill-rule="evenodd"/></svg></span>) to type some Esperanto sentences.</span></div><span style="margin-top:50px"><button class="sc-bZQynM jPpwhv" spacing="default" type="button"><span style="align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative"><span style="align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1">Back</span></span></button></span></span>'
const SAMPLE_SIMPLE_HTML_OUTPUT = '<div style="margin:20px 0;border-top:2px solid #e4dcca66;padding-top:20px;padding-bottom:20px" class="sentence-analyze-result-wrapper"><div><strong>Analyze Results</strong><div class="words-list"><span class="wordSpan"><div class="sc-kAzzGY cBPlFT" color="red"><span class="sc-VigVT hdtdWC" tabindex="-1" color="red" role=""><span class="sc-jTzLTM jIqVYU" color="red">mia</span></span></div></span><span class="wordSpan"><div class="sc-kAzzGY cBPlFT" color="purpleLight"><span class="sc-VigVT ghzVwB" tabindex="-1" color="purpleLight" role=""><span class="sc-jTzLTM jIqVYU" color="purpleLight">nomo</span></span></div></span></div></div><p style="margin-top:50px"><button class="sc-bZQynM jPpwhv" spacing="default" type="button"><span style="align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative"><span style="align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1">Back</span></span></button></p></div>'

describe('<NoResultsFoundView />', () => {
  const renderComponent = (props = {}) => {
    // We could just do: `return Word(props)` but we want to have a more React API-centralized object
    const reactCompenent = <NoResultsFoundView />

    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    return reactCompenent.type(props)
  }

  it('renders <NoResultsFoundView /> without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(<NoResultsFoundView />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('Should uses the proper styles', () => {
    renderComponent((component) => {
      expect(component.props.style).toEqual(STYLES.noResults)
    })
  })

  describe('DOM Rendered', () => {
    const component = <NoResultsFoundView />
    const expectedHTMLOutput = "<div style=\"margin-top:20px;margin-bottom:10px\"><span class=\"text\">No analyzes results to show for you query.<br/>Switch to Writing Mode (<span class=\"sc-gqjmRU hzaGXC\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><path d=\"M4.02 19.23a1 1 0 0 0 1.18 1.18l3.81-.78-4.21-4.21-.78 3.81zM19.844 6.707l-2.12-2.122A1.997 1.997 0 0 0 16.308 4c-.512 0-1.024.195-1.415.585l-9.757 9.758 4.95 4.95 9.757-9.758a2 2 0 0 0 0-2.828z\" fill=\"currentColor\" fill-rule=\"evenodd\"/></svg></span>) to type some Esperanto sentences.</span></div>"

    expect(renderToStaticMarkup(component)).toEqual(expectedHTMLOutput)
  })

  describe('I18n', () => {
    it('renders the text wrapper element', () => {
      renderComponent((component) => {
        const textNode = component.props.children

        expect(component.props.className).toEqual('text')
      })
    })

    it('renders the proper text content', () => {
      renderComponent((component) => {
        const textNode = component.props.children

        // I18n messages
        expect(textNode[0]).toEqual('No analyzes results to show for you query.')
        expect(textNode[2]).toEqual('Switch to Writing Mode (')
        expect(textNode[4]).toEqual(') to type some Esperanto sentences.')
      })
    })
  })

})


describe('<SentenceAnalyzeResult />', () => {
  it('renders <SentenceAnalyzeResult /> without crashing', () => {
    const div = document.createElement('div')

    ReactDOM.render(<SentenceAnalyzeResult />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  const renderComponent = (props = {}, callbackFn) => {
    if(typeof(props) == 'function' && !callbackFn) {
      callbackFn = props
      props = {}
    }

    TestUtils.createTestComponent(<SentenceAnalyzeResult {...props} />, callbackFn)
  }

  it('Should call `onBackClick` when <Button /> is clicked', () => {
    renderComponent((component, next) => {
      const callback = jest.fn()
      component.props = { onBackClick: callback }
      // Render the component
      const renderedComponent = component.render()
      const { children } = renderedComponent.props.children[1].props // Find <Button />

      expect(children.props.onClick).toEqual(callback)

      children.props.onClick() // Dispatch the event

      expect(callback.mock.calls.length).toEqual(1)

      next()
    })
  })

  describe('No results', () => {
    it('Should render <NoResultsFound /> component', () => {
      renderComponent({ result: [] }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.type).toEqual('span')
        // For some reason we don't have `renderedComponent.props.children[0].type`
        // that is supposed to be 'NoResultsFound', so we kind of 'fake' this test just checking
        // if there are some element rendered as the first child of <span>
        expect(renderedComponent.props.children[0]).toBeDefined()
        next()
      })
    })

    it('Should render <Button /> component with `primary` color', () => {
      renderComponent({ result: [] }, (component, next) => {
        const renderedComponent = component.render()
        const { props } = renderedComponent.props.children[1]

        // Thats the @atlaskit exported <Button /> component at this point
        expect(props.children.type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(WithDeprecationWarnings(Button)))')
        expect(props.children.props.appearance).toEqual('primary')
        next()
      })
    })

    it('Should renders the proper text on <Button /> component', () => {
      renderComponent({ result: [] }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[1].props

        expect(children.props.children).toEqual('Back')
        next()
      })
    })

    it('Should render <span> component to wrap the <Button />', () => {
      renderComponent({ result: [] }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.props.children[1].type).toEqual('span')
        next()
      })
    })

    it('Should render <span> component with proper `style`', () => {
      renderComponent({ result: [] }, (component, next) => {
        const {children} = component.render().props

        expect(children[1].props.style).toEqual(STYLES.backBtn)
        next()
      })
    })

    describe('DOM Rendered', () => {
      it('Should output expected HTML', () => {
        renderComponent({ result: [] }, (component, next) => {
          expect(renderToStaticMarkup(component.render())).toEqual(SAMPLE_EMPTY_HTML_OUTPUT)
          next()
        })
      })
    })
  })

  describe('With results', () => {
    it('Should receives the results in `props`', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        expect(component.props.result).toEqual(SAMPLE_TEST_RESULTS)
        next()
      })
    })

    it('Should render the wrapper <div> component', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.type).toEqual('div')
        expect(renderedComponent.props.className).toEqual('sentence-analyze-result-wrapper')
        next()
      })
    })

    it('Should render two children inside <div>', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.props.children).toHaveLength(2)
        next()
      })
    })

    it('Should render the main wrapper <div> with proper styles', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.props.style).toEqual(STYLES.wrapper)
        next()
      })
    })

    it('Should render <strong> element', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props

        expect(children[0].type).toEqual('strong')
        next()
      })
    })

    it('Should render the proper text in <strong> element', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props

        expect(children[0].props.children).toEqual('Analyze Results')
        next()
      })
    })

    it('Should renders a <div> to render all <InlineWord /> components', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props

        expect(children[1].type).toEqual('div')
        expect(children[1].props.className).toEqual('words-list')
        next()
      })
    })

    it('Should renders the correct ammount <InlineWord /> inside "word-list" <div>', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props

        expect(children[1].props.children).toHaveLength(13)
        next()
      })
    })

    it('Should renders ONLY <InlineWord /> for result set', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props

        children[1].props.children.forEach((word) => {
          expect(word.type.name).toEqual('InlineWord')
        })

        next()
      })
    })

    it('Should renders all <InlineWord /> for result set', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[0].props
        const inlineWords = children[1].props.children

        inlineWords.forEach((word, index) => {
          expect(word.key).toEqual(index.toString())
          expect(word.props.content).toEqual(SAMPLE_TEST_RESULTS[index].word)
          expect(word.props.grammarClass).toEqual(SAMPLE_TEST_RESULTS[index].value)
        })

        next()
      })
    })

    it('Should render <Button /> component with `primary` color', () => {
      renderComponent({ result: SAMPLE_TEST_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { props } = renderedComponent.props.children[1]

        // Thats the @atlaskit exported <Button /> component at this point
        expect(props.children.type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(WithDeprecationWarnings(Button)))')
        expect(props.children.props.appearance).toEqual('primary')
        next()
      })
    })

    it('Should renders the proper text on <Button /> component', () => {
      renderComponent({ result: SIMPLE_SAMPLE_RESULTS }, (component, next) => {
        const renderedComponent = component.render()
        const { children } = renderedComponent.props.children[1].props

        expect(children.props.children).toEqual('Back')
        next()
      })
    })

    it('Should render <p> component to wrap the <Button />', () => {
      renderComponent({ result: SIMPLE_SAMPLE_RESULTS }, (component, next) => {
        const renderedComponent = component.render()

        expect(renderedComponent.props.children[1].type).toEqual('p')
        next()
      })
    })

    it('Should render <p> component with proper `style`', () => {
      renderComponent({ result: SIMPLE_SAMPLE_RESULTS }, (component, next) => {
        const {children} = component.render().props

        expect(children[1].props.style).toEqual(STYLES.backBtn)
        next()
      })
    })

    describe('DOM Rendered', () => {
      it('Should output expected HTML', () => {
        renderComponent({ result: SIMPLE_SAMPLE_RESULTS }, (component, next) => {
          expect(renderToStaticMarkup(component.render())).toEqual(SAMPLE_SIMPLE_HTML_OUTPUT)
          next()
        })
      })
    })
  })

  describe('#renderWords()', () => {
    it('Should return empty array when no `words` parameter are given', () => {
      renderComponent((component, next) => {
        const words = component.renderWords([])

        expect(words).toEqual([])
        next()
      })
    })

    it('Should return an array of <InlineWord /> with provided data', () => {
      renderComponent((component, next) => {
        const words = component.renderWords(SIMPLE_SAMPLE_RESULTS)

        expect(words).toEqual([
          <InlineWord key='0' grammarClass='pronoun' content='mia' />,
          <InlineWord key='1' grammarClass='noun' content='nomo' />,
        ])

        next()
      })
    })
  })
})
