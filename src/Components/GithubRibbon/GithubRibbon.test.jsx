import React from 'react';
import GithubRibbon, { DEFAULT_RIBBON_IMG, DEFAULT_STYLE } from './GithubRibbon';

describe('<GithubRibbon />', () => {
  it('renders without crashing', () => {
    expect(<GithubRibbon />).toBeDefined()
  })

  it('renders with default <img `src` /> when not provided', () => {
    const ribbon = <GithubRibbon />
 
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const renderedRibbon = ribbon.type({}) // ribbon.type(props)

    // Component props
    expect(renderedRibbon.props.href).toEqual('')
    // Rendered child <img>
    expect(renderedRibbon.props.children.type).toEqual('img')
    expect(renderedRibbon.props.children.props.src).toEqual(DEFAULT_RIBBON_IMG)
  })

  it('Should render with default `style`', () => {
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.style).toEqual(DEFAULT_STYLE)
  })

  it('Should allows to override the default <img> `style` with a custom style', () => {
    const style = {
      'position': 'absolute', 'bottom': 0, 'right': 0, 'border': 1
    }

    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ style: style })

    expect(component.props.children.props.style).toEqual(style)
  })

  it('Should provided on default `alt` attribute for <img>', () => {
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.children.props.alt).toEqual('Fork me on Github')
  })

  it('Should allow to override the <a `alt` /> attribute', () => {
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ alt: 'Fork this project on Github' })

    expect(component.props.children.props.alt).toEqual('Fork this project on Github')
  })
  
  it('renders the <a> `src` attribute with the provided `href`', () => {
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.href).toEqual('http://github.com/fidelisrafael')
  })

  it('Should opens the link in a "_blank" `target`', () => {
    // Invokes the `Stateless function` and returns an already rendered `Symbol(react.element)`
    const component = (<GithubRibbon />).type({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.target).toEqual('_blank')
  })
  
})
