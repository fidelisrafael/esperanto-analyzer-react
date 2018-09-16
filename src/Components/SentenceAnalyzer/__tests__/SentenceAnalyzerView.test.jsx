import React from 'react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';
import { renderToStaticMarkup } from 'react-dom/server'

import TestUtils from './../../../Lib/TestUtils'
import SentenceAnalyzerView , { STYLES } from './../SentenceAnalyzerView';

// <SentenceAnalyzerView /> is a stateless component
describe('<SentenceAnalyzerView />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<SentenceAnalyzerView />)).toBeDefined()
  })

  const mountComponent = (props = {}) => {
    const component = <SentenceAnalyzerView {...props} />

    return component.type(component.props)
  }

  it('Should render the wrapper <div>', () => {
    const component = mountComponent()

    expect(component.type).toEqual('div')
  })

  describe('<Spinner>', () => {
    describe('`props.isLoading == true', () => {
      it('Should be rendered', () => {
        const component = mountComponent({ isLoading: true })
        const spinnerDiv = component.props.children[0]
        
        expect(spinnerDiv.type).toEqual('div')
        expect(spinnerDiv.props.children[0].type.name).toEqual('Spinner')
      })
    })

    describe('`props.isLoading == false` or `props.isLoading == undefined`', () => {
      it('Should NOT be rendered when `false`', () => {
        const component = mountComponent({ isLoading: false })
        
        expect(component.props.children[0]).toEqual(false)
      })

      it('Should NOT be rendered when `undefined`', () => {
        const component = mountComponent({ isLoading: undefined })

        expect(component.props.children[0]).toEqual(undefined)
      })
    })
  })


  describe('<ToggleStateless />', () => {
    describe('`props.isLoading == true', () => {
      it('Should NOT render', () => {
        const component = mountComponent({ isLoading: true })

        expect(component.props.children[1]).toEqual(false)
      })
    })

    describe('`props.isEditing == true', () => {
      it('Should render <ToggleStateteless />"', () => {
        const component = mountComponent({ isEditing: true })
        const children = component.props.children[1]

        expect(children.type).toEqual('div')
        expect(children.props.children[0].type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(ToggleStateless))')
      })
      
      it('Should render a <span> with "writing mode" details', () => {
        const component = mountComponent({ isEditing: true })
        const span = component.props.children[1].props.children[1]
        const innerSpan = span.props.children[0].props.children

        expect(span.type).toEqual('span')
        expect(innerSpan.length).toEqual(2)
        expect(innerSpan[0].type.name).toEqual('EditFilledIcon')
        expect(innerSpan[1].trim()).toEqual('Write Mode')
      })
    })

    describe('NOT `props.isEditing == true', () => {
      it('Should render a <span> with "inspection mode" details', () => {
        const component = mountComponent({ isEditing: false })
        const span = component.props.children[1].props.children[1]
        const innerSpan = span.props.children[1].props.children

        expect(span.type).toEqual('span')
        expect(innerSpan.length).toEqual(2)
        expect(innerSpan[0].type.name).toEqual('SearchIcon')
        expect(innerSpan[1].trim()).toEqual('Inspection Mode')
      })
    })

    it('Should call `<ToggleStatetless onToggleChange={() => {}} />` callback', () => {
      const onToggleChange = jest.fn()
      const component = mountComponent({ isLoading: false, onToggleChange: onToggleChange })
      const toggleComponent = component.props.children[1].props.children[0]

      toggleComponent.props.onChange(true) // manually trigerring

      expect(onToggleChange.mock.calls.length).toEqual(1)
      expect(onToggleChange.mock.calls[0]).toEqual([true])
    })
  })

  describe('<SentenceTextArea />', () => {
    it('Should render if `state.isEditing == true`', () => {
    })

    it('Should NOT  render if `!state.isEditing == true`', () => {
    })

    it('Should use `props.sentence` as value', () => {
    })

    it('Should call `props.onSubmit`', () => {
    })

    it('Should call `props.onChange`', () => {
    })

    it('Should be disabled if `props.canSubmit == false`', () => {
    })

    it('Should not be disabled if `props.canSubmit == true`', () => {
    })
  })

  describe('<SentenceAnalyzeResult />', () => {
    it('Should be displayed if NOT `props.isEditing == true`', () => {
    })

    it('Should NOT be displayed if `props.isEditing == true`', () => {
    })

    it('Should call `onBackClick`', () => {
    })

    it('Should render `props.analyzeResults`', () => {
    })
  })
})
