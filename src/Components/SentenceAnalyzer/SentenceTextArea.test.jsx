import React from 'react';
import SentenceTextArea, { STYLES } from './SentenceTextArea';
import TestUtils from '../../Lib/TestUtils'
import { renderToStaticMarkup } from 'react-dom/server';

const TEST_PROPS = { sentence: 'Mi loĝas en Sao Paulo' }
const EXPECTED_HTML_OUTPUT = "<div><fieldset style=\"display:block;margin-bottom:15px\"><div class=\"sc-cSHVUG irhYbB\"><label class=\"sc-VigVT cxhBLs\"><div class=\"sc-jTzLTM lfdakX\"><span><span><span class=\"sc-iwsKbI LKihQ\"><svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" focusable=\"false\" role=\"presentation\"><g fill=\"currentColor\" fill-rule=\"evenodd\"><path d=\"M11 7h2v11h-2zM6 5h12v2H6z\"/><path d=\"M5 5h2v3H5zm5 13h4v2h-4zm7-13h2v3h-2z\"/></g></svg></span> Text in Esperanto</span></span><span class=\"sc-fjdhpX karbfX\" role=\"presentation\">*</span></div></label><div class=\"sc-EHOje iEnQym\"><div class=\"sc-bxivhb kQgNxi\"><div class=\"sc-ifAKCX cZgida\"><textarea class=\"sc-jzJRlG cZCxJB\" required=\"\" autofocus=\"\" spellcheck=\"true\" maxLength=\"2048\">Mi loĝas en Sao Paulo</textarea></div></div></div></div></fieldset><fieldset><button class=\"sc-chPdSV jgTBQU\" disabled=\"\" spacing=\"default\" type=\"submit\"><span style=\"align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative\"><span style=\"align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1\">Analyze</span></span></button></fieldset></div>"

const renderComponent = (props = {}, callbackFn) => {
  if(typeof(props) == 'function' && !callbackFn) {
    callbackFn = props
    props = {}
  }

  return TestUtils.createTestComponent(<SentenceTextArea {...props} />, callbackFn)
}

// <Word /> is a stateless component
describe('<SentenceTextArea />', () => {
  it('renders without crashing', () => {
    expect(TestUtils.createTestComponent(<SentenceTextArea />)).toBeDefined()
  })

  describe('<FieldTextAreaStateless />', () => {
    it('Should render component inside <fieldset>', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[0].type).toEqual('fieldset')
        expect(children[0].props.children.type.name).toEqual('FieldTextArea')
        next()
      })
    })

    it('Should render with proper `minimumRows` and `maxLength` properties', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[0].props.children.props.minimumRows).toEqual(15)
        expect(children[0].props.children.props.maxLength).toEqual(2048)
        next()
      })
    })

    it('Should be required', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[0].props.children.props.required).toEqual(true)
        next()
      })
    })

    it('Should have the given `props.sentence` value', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        const { children } = component.render().props

        expect(children[0].props.children.props.value).toEqual('Mi loĝas en Sao Paulo')
        next()
      })
    })
  })


  describe('<Button />', () => {
    it('Should render component inside <fieldset>', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[1].type).toEqual('fieldset')
        // @atlaskit composition....
        expect(children[1].props.children.type.displayName).toEqual('WithAnalyticsContext(WithAnalyticsEvents(WithDeprecationWarnings(Button)))')
        next()
      })
    })

    it('Should render with proper `appearance` property', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[1].props.children.props.appearance).toEqual('primary')
        next()
      })
    })


    it('Should have the given `props.buttonText` value if given', () => {
      renderComponent({ buttonText: 'Click me!' }, (component, next) => {
        const { children } = component.render().props

        expect(children[1].props.children.props.children).toEqual('Click me!')
        next()
      })
    })

    it('Should use the default text if `props.buttonText` is not given', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[1].props.children.props.children).toEqual('Analyze')
        next()
      })
    })

    it('Should render disabled if no `props.canSubmit` is given', () => {
      renderComponent((component, next) => {
        const { children } = component.render().props

        expect(children[1].props.children.props.isDisabled).toEqual(true)
        next()
      })
    })

    it('Should render enabled if  `props.canSubmit` is given as `true`', () => {
      renderComponent({ canSubmit: true }, (component, next) => {
        const { children } = component.render().props

        expect(children[1].props.children.props.isDisabled).toEqual(false)
        next()
      })
    })
  })

  describe('DOM Rendered', () => {
    it('Should just render', () => {
      renderComponent((component, next) => {
        const expectedOutput = '<div><fieldset style="display:block;margin-bottom:15px"><div class="sc-cSHVUG irhYbB"><label class="sc-VigVT cxhBLs"><div class="sc-jTzLTM lfdakX"><span><span><span class="sc-iwsKbI LKihQ"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M11 7h2v11h-2zM6 5h12v2H6z"/><path d="M5 5h2v3H5zm5 13h4v2h-4zm7-13h2v3h-2z"/></g></svg></span> Text in Esperanto</span></span><span class="sc-fjdhpX karbfX" role="presentation">*</span></div></label><div class="sc-EHOje iEnQym"><div class="sc-bxivhb kQgNxi"><div class="sc-ifAKCX cZgida"><textarea class="sc-jzJRlG cZCxJB" required="" autofocus="" spellcheck="true" maxLength="2048"></textarea></div></div></div></div></fieldset><fieldset><button class="sc-chPdSV jgTBQU" disabled="" spacing="default" type="submit"><span style="align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative"><span style="align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1">Analyze</span></span></button></fieldset></div>'

        expect(renderToStaticMarkup(component.render())).toEqual(expectedOutput)
        next()
      })
    })

    it('Should render with `props.sentence` value', () => {
      renderComponent(TEST_PROPS, (component, next) => {
        expect(renderToStaticMarkup(component.render())).toEqual(EXPECTED_HTML_OUTPUT)
        next()
      })
    })

    it('Should render with enabled button through `props.canSubmit`', () => {
      renderComponent({ canSubmit: true }, (component, next) => {
        const expectedOutput = '<div><fieldset style="display:block;margin-bottom:15px"><div class="sc-cSHVUG irhYbB"><label class="sc-VigVT cxhBLs"><div class="sc-jTzLTM lfdakX"><span><span><span class="sc-iwsKbI LKihQ"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M11 7h2v11h-2zM6 5h12v2H6z"/><path d="M5 5h2v3H5zm5 13h4v2h-4zm7-13h2v3h-2z"/></g></svg></span> Text in Esperanto</span></span><span class="sc-fjdhpX karbfX" role="presentation">*</span></div></label><div class="sc-EHOje iEnQym"><div class="sc-bxivhb kQgNxi"><div class="sc-ifAKCX cZgida"><textarea class="sc-jzJRlG cZCxJB" required="" autofocus="" spellcheck="true" maxLength="2048"></textarea></div></div></div></div></fieldset><fieldset><button class="sc-chPdSV djwxiL" spacing="default" type="submit"><span style="align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative"><span style="align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1">Analyze</span></span></button></fieldset></div>'

        expect(renderToStaticMarkup(component.render())).toEqual(expectedOutput)
        next()
      })
    })

    it('Should render with disabled button through `props.canSubmit`', () => {
      renderComponent({ canSubmit: false }, (component, next) => {
        const expectedOutput = '<div><fieldset style="display:block;margin-bottom:15px"><div class="sc-cSHVUG irhYbB"><label class="sc-VigVT cxhBLs"><div class="sc-jTzLTM lfdakX"><span><span><span class="sc-iwsKbI LKihQ"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation"><g fill="currentColor" fill-rule="evenodd"><path d="M11 7h2v11h-2zM6 5h12v2H6z"/><path d="M5 5h2v3H5zm5 13h4v2h-4zm7-13h2v3h-2z"/></g></svg></span> Text in Esperanto</span></span><span class="sc-fjdhpX karbfX" role="presentation">*</span></div></label><div class="sc-EHOje iEnQym"><div class="sc-bxivhb kQgNxi"><div class="sc-ifAKCX cZgida"><textarea class="sc-jzJRlG cZCxJB" required="" autofocus="" spellcheck="true" maxLength="2048"></textarea></div></div></div></div></fieldset><fieldset><button class="sc-chPdSV jgTBQU" disabled="" spacing="default" type="submit"><span style="align-self:center;display:inline-flex;flex-wrap:nowrap;max-width:100%;position:relative"><span style="align-items:center;align-self:center;flex:1 1 auto;margin:0 4px;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;transition:opacity 0.3s;opacity:1">Analyze</span></span></button></fieldset></div>'

        expect(renderToStaticMarkup(component.render())).toEqual(expectedOutput)
        next()
      })
    })
  })
})

