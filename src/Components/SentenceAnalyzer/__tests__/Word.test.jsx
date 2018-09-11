import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'

import { Word, InlineWord, COLOR_BY_GRAMMAR_CLASS, STYLES } from './../Word';
import TestUtils from './../../../Lib/TestUtils'

const TEST_PROPS = { content: 'Saluton!', grammarClass: 'interjection' }
const EXPECTED_OUTPUT_CLOSED = '<span class="wordSpan"><div class="sc-dnqmqq lkXyJm" color="grey"><span class="sc-htpNat gPJvVz" tabindex="-1" color="grey" role=""><span class="sc-bxivhb dMExre" color="grey">Saluton!</span></span></div></span>'
const EXPECTED_OUTPUT_OPEN = '<span class="wordSpan"><div class="sc-dnqmqq lkXyJm" color="grey"><span class="sc-htpNat gPJvVz" tabindex="-1" color="grey" role=""><span class="sc-bxivhb dMExre" color="grey">Saluton!</span></span></div></span><div class="sc-iwsKbI jqcbuK" style="position:absolute;top:0;left:0;opacity:0;pointer-events:none">interjection</div>'

// <Word /> is a stateless component
describe('<Word />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<Word />)).toBeDefined()
  })

  const renderComponent = (props = {}) => {
    // We could just do: `return Word(props)` but we want to have a more React API-centralized object
    const reactCompenent = <Word />

    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    return reactCompenent.type(props)
  }

  it('Should renders a @atlaskit <Tag> element', () => {
    const component = renderComponent()

    // The way AtlasKit components sometimes are composition of elements
    expect(component.type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(Tag))')
  })

  describe('rendered <Tag />', () => {
    it('should be `standard` when no `grammarClass` is provided', () => {
      const component = renderComponent()

      expect(component.props.color).toEqual('standard')
    })

    it('should use the color mapped to given `grammarClass`', () => {
      const component = renderComponent({ grammarClass: 'verb' })

      expect(component.props.color).toEqual(COLOR_BY_GRAMMAR_CLASS.verb)
    })

    it('should use the "default" color when given `grammarClass` does not exist', () => {
      const component = renderComponent({ grammarClass: 'nekredeble' })

      expect(component.props.color).toEqual('standard')
    })

    it('should renders the given `content` in <Tag `text` />', () => {
      const component = renderComponent({ content: 'skatolo' })

      expect(component.props.text).toEqual('skatolo')
    })

    it('should render with proper styles', () => {
      const component = renderComponent()

      expect(component.props.style).toEqual(STYLES.word)
    })
  })

  describe('DOM Rendered', () => {
    it('Should just render the word withour the `grammarClass`', () => {
      const component = renderComponent(TEST_PROPS)

      const expected = "<div class=\"sc-dnqmqq lkXyJm\" color=\"grey\"><span class=\"sc-htpNat gPJvVz\" tabindex=\"-1\" color=\"grey\" role=\"\"><span class=\"sc-bxivhb dMExre\" color=\"grey\">Saluton!</span></span></div>"

      expect(renderToStaticMarkup(component)).toEqual(expected)
    })
  })
})

describe('<InlineWord />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<InlineWord />)).toBeDefined()
  })

  const renderComponent = (props = {}, callbackFn) => {
    if(typeof(props) == 'function' && !callbackFn) {
      callbackFn = props
      props = {}
    }

    TestUtils.createTestComponent(<InlineWord {...props} />, callbackFn)
  }

  it('Should renders an @atlaskit <InlineDialog> element', () => {
    renderComponent((component, next) => {
      expect(component.render().type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(InlineDialog))')

      next()
    })
  })

  it('Should renders <InlineDialog /> closed initially', () => {
    renderComponent((component, next) => {
      expect(component.render().props.isOpen).toEqual(false)
      next()
    })
  })

  it('Should renders <InlineDialog /> with placement "bottom-start"', () => {
    renderComponent((component, next) => {
      expect(component.render().props.placement).toEqual('bottom-start')
      next()
    })
  })

  it('Should rendes the <span> that holds the click event', () => {
    renderComponent((component, next) => {
      expect(component.render().props.children.type).toEqual('span')
      next()
    })
  })

  it('Should renders a <Word /> component inside span', () => {
    renderComponent((component, next) => {
      const { children } = component.render().props

      expect(children.props.children.type.name).toEqual('Word')
      next()
    })
  })

  it('Should pass the state as property to <InlineDialog />', () => {
    renderComponent((component, next) => {
      component.setState({ dialogIsOpen: true })

      expect(component.render().props.isOpen).toEqual(true)
      next()
    })
  })

  it('Should opens the <InlineDialog /> when clicking in the <span>', () => {
    renderComponent((component, next) => {
      const rendered = component.render()

      expect(rendered.props.isOpen).toEqual(false)

      rendered.props.children.props.onClick()

      // Rendering again
      expect(component.render().props.isOpen).toEqual(true)
      next()
    })
  })

  it('Should closes the <InlineDialog /> when clicking in the content', () => {
    renderComponent((component, next) => {
      component.setState({ dialogIsOpen: true })
      const rendered = component.render()

      expect(rendered.props.isOpen).toEqual(true)

      rendered.props.onContentClick()

      // Rendering again
      expect(component.render().props.isOpen).toEqual(false)

      next()
    })
  })

  describe('DOM Rendered', () => {
    it('Should not display the <InlineDialog> `content` if `state.dialogIsOpen` is false', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        component.setState({ dialogIsOpen: false })

        expect(renderToStaticMarkup(component.render())).toEqual(EXPECTED_OUTPUT_CLOSED)
        next()
      })
    })

    it('Should display the <InlineDialog> `content` if `state.dialogIsOpen` is true', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        component.setState({ dialogIsOpen: true })

        expect(renderToStaticMarkup(component.render())).toEqual(EXPECTED_OUTPUT_OPEN)
        next()
      })
    })

    it('Should opens the <InlineDialog /> when clicking in the <span>', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        component.setState({ dialogIsOpen: false })
        const renderedComponent = component.render()

        expect(renderToStaticMarkup(renderedComponent)).toEqual(EXPECTED_OUTPUT_CLOSED)

        renderedComponent.props.onContentClick()

        // Rendering again
        expect(renderToStaticMarkup(component.render())).toEqual(EXPECTED_OUTPUT_OPEN)

        next()
      })
    })

    it('Should closes the <InlineDialog /> when clicking in the content', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        component.setState({ dialogIsOpen: true })
        const renderedComponent = component.render()

        expect(renderToStaticMarkup(renderedComponent)).toEqual(EXPECTED_OUTPUT_OPEN)

        renderedComponent.props.onContentClick()

        // Rendering again
        expect(renderToStaticMarkup(component.render())).toEqual(EXPECTED_OUTPUT_CLOSED)

        next()
      })
    })
  })

  describe('#toggleDialogOpen()', () => {
    it('Should invert the value of `state.dialogIsOpen`', () => {
      renderComponent((component, next) => {
        component.setState({ dialogIsOpen: false })
        component.toggleDialogOpen()

        expect(component.state.dialogIsOpen).toEqual(true)
        next()
      })
    })

    it('Should pass the state as property to <InlineDialog />', () => {
      renderComponent((component, next) => {
        component.setState({ dialogIsOpen: true })
        component.toggleDialogOpen()

        expect(component.render().props.isOpen).toEqual(false)
        next()
      })
    })
  })
})

