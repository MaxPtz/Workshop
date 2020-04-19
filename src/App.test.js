import { shallow } from 'enzyme'
import React from 'react'
import App from './App'

describe('App rendering', () => {
    it('should render the App component', function () {
        expect(shallow(<App />).length).toEqual(1)
    })
})
