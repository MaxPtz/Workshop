import { shallow } from 'enzyme'
import React from 'react'
import App, { CityTable, CityRow } from './App'

describe('CityTable rendering', () => {
    it('should render CityTable component', function () {
        const mockCities = {
            uk: { state: 'uk', cities: ['London'] },
            belgium: { state: 'belgium', cities: ['bx', 'mons'] },
        }
        expect(shallow(<CityTable cities={mockCities} />).length).toEqual(1)
        expect(shallow(<CityTable cities={mockCities} />).length).toMatchSnapshot()
    })
})

describe('App rendering', () => {
    it('should render the App component', function () {
        const mockStore = {
            items: [],
            count: 0,
            loading: false,
            error: false,
        }
    })
})
