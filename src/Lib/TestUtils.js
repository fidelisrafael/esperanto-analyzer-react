import ReactDOM from 'react-dom';

const TestUtils = {
    createRenderedTestComponent: (component) => {
        const tearDownFn = () => { ReactDOM.unmountComponentAtNode(div) }
        const div = document.createElement('div')
        
        const testComponent = ReactDOM.render(component, div)
        
        return { testComponent: testComponent, tearDownFn: tearDownFn }
    },

    createTestComponent: (component, callbackFn) => {
        const componentData = TestUtils.createRenderedTestComponent(component)

        if(callbackFn) {
            return callbackFn.apply(componentData.testComponent, [componentData.testComponent, componentData.tearDownFn])
        }

        // In case of no callback associated
        return componentData
    }
}

export default TestUtils