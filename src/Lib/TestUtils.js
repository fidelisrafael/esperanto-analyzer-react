import ReactDOM from 'react-dom';

const TestUtils = {
  createRenderedComponent: (component) => {
    const tearDownFn = () => { ReactDOM.unmountComponentAtNode(div) }
    const div = document.createElement('div')

    const testComponent = ReactDOM.render(component, div)

    return { testComponent: testComponent, tearDownFn: tearDownFn }
  },

  createTestComponent: (component, callbackFn) => {
    const componentData = TestUtils.createRenderedComponent(component)
    const { testComponent, tearDownFn } = componentData

    if(callbackFn) {
        return callbackFn.apply(testComponent, [testComponent, tearDownFn])
    }

    // In case of no callback associated
    return componentData
  }
}

export default TestUtils
