import { shallow } from 'enzyme'
import { CityRow, CityTable } from './CityTable'
import React from 'react'

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

describe('CityRow rendering', () => {
    it('should render CityRow component', function () {
        const mockCities = {
            state: 'uk',
            cities: ['London'],
        }
        expect(
            shallow(
                <CityRow
                    state={mockCities.state}
                    cities={mockCities.cities}
                    nb={mockCities.cities.length}
                />
            ).length
        ).toEqual(1)
        expect(
            shallow(
                <CityRow
                    state={mockCities.state}
                    cities={mockCities.cities}
                    nb={mockCities.cities.length}
                />
            ).length
        ).toMatchSnapshot()
    })
})
