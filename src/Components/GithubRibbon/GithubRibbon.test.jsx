import React from 'react';
import GithubRibbon, { DEFAULT_RIBBON_IMG, DEFAULT_STYLE } from './GithubRibbon';
import TestUtils from '../../Lib/TestUtils'

// GithubRibbon is a so called `stateless` component

describe('<GithubRibbon />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<GithubRibbon />)).toBeDefined()
  })

  const renderComponent = (props = {}) => {
    // We could just do: `return GithubRibbon(props)` but we want to have a more React API-centralized object
    const reactCompenent = <GithubRibbon />

    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    return reactCompenent.type(props)
  }

  it('renders an <img> as the child', () => {
    const ribbon = renderComponent()

    expect(ribbon.props.children.type).toEqual('img')
  })

  it('renders with default <img `src` /> when not provided', () => {
    const ribbon = renderComponent()

    expect(ribbon.props.children.props.src).toEqual(DEFAULT_RIBBON_IMG)
  })

  it('Should render with default `style`', () => {
    const component = renderComponent()

    expect(component.props.style).toEqual(DEFAULT_STYLE)
  })

  it('Should allows to override the default <img> `style` with a custom style', () => {
    const style = {
      'position': 'absolute', 'bottom': 0, 'right': 0, 'border': 1
    }

    const component = renderComponent({ style: style })

    expect(component.props.children.props.style).toEqual(style)
  })

  it('Should provided on default `alt` attribute for <img>', () => {
    const component = renderComponent()

    expect(component.props.children.props.alt).toEqual('Fork me on Github')
  })

  it('Should allow to override the <a `alt` /> attribute', () => {
    const component = renderComponent({ alt: 'Fork this project on Github' })

    expect(component.props.children.props.alt).toEqual('Fork this project on Github')
  })

  it('Should opens the link in a "_blank" `target`', () => {
    const component = renderComponent()

    expect(component.props.target).toEqual('_blank')
  })


  it('renders the <a> `src` attribute with the provided `href`', () => {
    const component = renderComponent({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.href).toEqual('http://github.com/fidelisrafael')
  })

})
