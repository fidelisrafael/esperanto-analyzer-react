import React from 'react';
import App from './App';
import TestUtils from './../../Lib/TestUtils';

const withTestComponent = (callbackFn) => (
  TestUtils.createTestComponent(<App />, callbackFn)
)

describe('<App />', () => {
  it('renders without crashing', () => {
    withTestComponent((app, next) => {
      expect(app).toBeDefined()

      next()
    })
  });

  it('renders a @atlaskit <Page> as root component', () => {
    withTestComponent((app, next) => {
      const renderedApp = app.render()

      expect(renderedApp.type.name).toEqual('Page')
      expect(renderedApp.type.displayName).toEqual('AkPage')

      next()
    })
  })

  describe('within <Page> root component', () => {
    it('renders exactly 2 children components', () => {
      withTestComponent((app, next) => {
        const renderedApp = app.render()
  
        expect(renderedApp.props.children).toHaveLength(2)

        next()
      })
    })
  
    it('renders a <GithubRibbon /> as first component', () => {
      withTestComponent((app, next) => {
        const { children } = app.render().props
  
        expect(children[0].type.name).toEqual('GithubRibbon')

        next()
      })
    })

    it('should render <GithubRibbon /> with the right `href`', () => {
      withTestComponent((app, next) => {
        const { children } = app.render().props
  
        expect(children[0].props.href).toEqual('https://github.com/fidelisrafael/esperanto-analyzer-react/')

        next()
      })
    })
  
    it('renders a <PageHome /> as last component', () => {
      withTestComponent((app, next) => {
        const { children } = app.render().props
  
        expect(children[1].type.name).toEqual('PageHome')

        next()
      })
    })

    it('Should sent to <PageHome /> all properties', () => {
      withTestComponent((app, next) => {
        const secret = Math.random().toString(2)
        app.props = { ping: 'pong', secret: secret }

        const { children } = app.render().props
  
        expect(children[1].props).toEqual({ ping: 'pong', secret: secret })

        next()
      })
    })

  })
})
