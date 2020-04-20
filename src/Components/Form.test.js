import { shallow } from 'enzyme'
import React from 'react'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import Form from './Form'

const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: false,
}
const mockStore = configureStore()

describe('Form testing', () => {
    const store = mockStore(initialState)
    const wrapper = shallow(
        <Provider store={store}>
            <Form />
        </Provider>
    ).dive()

    it('should render the Form component', function () {
        expect(wrapper.length).toEqual(1)
    })
})
