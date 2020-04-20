import { shallow } from 'enzyme'
import React from 'react'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './App'

const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: false,
}

describe('App rendering', () => {
    const mockStore = configureStore()

    it('should render the App component', () => {
        const store = mockStore(initialState)
        expect(
            shallow(
                <Provider store={store}>
                    <App />
                </Provider>
            ).length
        ).toEqual(1)
    })
})
