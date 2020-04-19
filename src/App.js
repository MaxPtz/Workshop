import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './app.scss'
import { useDispatch, useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import { fetchCities } from './actions'

export default () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const { items, loading, error } = useSelector((state) => state)

    const validation = (value) => /^[a-zA-Z]+$/.test(value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validation(inputValue)) {
            const url = `https://jsonmock.hackerrank.com/api/cities/?city=${inputValue}`
            dispatch(fetchCities(url))
        }
    }

    const [showLabel, setShowLabel] = useState(false)
    const handleChange = (e) => {
        setInputValue(e.target.value)
        if (!validation(e.target.value) && e.target.value) setShowLabel(true)
        if (validation(e.target.value) || !e.target.value) setShowLabel(false)
    }

    return (
        <div className="city-search">
            <h2 className="title">Workshop City Search</h2>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <label
                    style={showLabel ? { display: 'block' } : { display: 'none' }}
                >
                    No space, no numbers, only letters !
                </label>
                <input
                    type="text"
                    className={validation(inputValue) ? '' : 'input-not-valid'}
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit" disabled={!validation(inputValue)}>
                    Search
                </button>
            </form>
            {loading ? (
                <ReactLoading
                    type="spinningBubbles"
                    color="#565882"
                    height="20px"
                    width="20px"
                />
            ) : null}
            {error ? <div>OOOOPS an error occured</div> : null}
            {items ? (
                <div className="results">
                    <div className="total">
                        Total cities found: {Object.keys(items).length}
                    </div>
                    <CityTable cities={items} />
                </div>
            ) : null}
        </div>
    )
}

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
