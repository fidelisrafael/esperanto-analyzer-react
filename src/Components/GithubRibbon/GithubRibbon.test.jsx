import React from 'react';
import GithubRibbon, { DEFAULT_RIBBON_IMG, DEFAULT_STYLE } from './GithubRibbon';
import TestUtils from '../../Lib/TestUtils'
import { renderToStaticMarkup } from 'react-dom/server'

// GithubRibbon is a so called `stateless` component

describe('<GithubRibbon />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<GithubRibbon />)).toBeDefined()
  })

  const mountComponent = (props = {}) => {
    const reactCompenent = <GithubRibbon />

    return reactCompenent.type(props)
  }

  it('renders an <img> as the child', () => {
    const ribbon = mountComponent()

    expect(ribbon.props.children.type).toEqual('img')
  })

  it('renders with default <img `src` /> when not provided', () => {
    const ribbon = mountComponent()

    expect(ribbon.props.children.props.src).toEqual(DEFAULT_RIBBON_IMG)
  })

  it('Should render with default `style`', () => {
    const component = mountComponent()

    expect(component.props.style).toEqual(DEFAULT_STYLE)
  })

  it('Should allows to override the default <img> `style` with a custom style', () => {
    const style = {
      'position': 'absolute', 'bottom': 0, 'right': 0, 'border': 1
    }

    const component = mountComponent({ style: style })

    expect(component.props.children.props.style).toEqual(style)
  })

  it('Should provided on default `alt` attribute for <img>', () => {
    const component = mountComponent()

    expect(component.props.children.props.alt).toEqual('Fork me on Github')
  })

  it('Should allow to override the <a `alt` /> attribute', () => {
    const component = mountComponent({ alt: 'Fork this project on Github' })

    expect(component.props.children.props.alt).toEqual('Fork this project on Github')
  })

  it('Should opens the link in a "_blank" `target`', () => {
    const component = mountComponent()

    expect(component.props.target).toEqual('_blank')
  })


  it('renders the <a> `src` attribute with the provided `href`', () => {
    const component = mountComponent({ href: 'http://github.com/fidelisrafael' })

    expect(component.props.href).toEqual('http://github.com/fidelisrafael')
  })

  describe('DOM Rendering', () => {
    it('Should render with default properties', () => {
      const expectedOutput = '<a href="" target="_blank"><img style="position:absolute;top:0;right:0;border:0" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on Github"/></a>'

      expect(renderToStaticMarkup(<GithubRibbon />)).toEqual(expectedOutput)
    })

    it('Should render with custom properties', () => {
      const component = <GithubRibbon
                          src='https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png'
                          href='https://github.com/fidelisrafael/esperanto-analyzer-react'
                          alt='Fork esperanto-analyzer-react on Github'
                        />

      const expectedOutput = '<a href="https://github.com/fidelisrafael/esperanto-analyzer-react" target="_blank"><img style="position:absolute;top:0;right:0;border:0" src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork esperanto-analyzer-react on Github"/></a>'

      expect(renderToStaticMarkup(component)).toEqual(expectedOutput)
    })
  })
})
