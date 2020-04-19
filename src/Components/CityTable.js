import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './city-table.scss'

export const CityTable = ({ cities }) => {
    if (!Object.keys(cities).length) return null
    return (
        <div className="cities">
            {Object.keys(cities).map((state, i) => (
                <CityRow state={state} cities={cities[state]} nb={i} key={state} />
            ))}
        </div>
    )
}

CityTable.propTypes = {
    cities: PropTypes.object,
}

export const CityRow = ({ state, cities, nb }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setTimeout(() => setShow(true), nb * 400)
        return setShow(false)
    }, [cities])

    return (
        <div className={show ? `city-line show` : `city-line`}>
            <div className="state">{state}</div>
            <div className="state-cities">
                {cities.map((city) => (
                    <>
                        <hr />
                        <div className="city">{city.city}</div>
                    </>
                ))}
            </div>
        </div>
    )
}

CityRow.propTypes = {
    state: PropTypes.string,
    cities: PropTypes.array,
    nb: PropTypes.number,
}
