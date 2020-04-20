import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCities } from '../Reducer/actions'
import './form.scss'

export default () => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
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
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <label style={showLabel ? { display: 'block' } : { display: 'none' }}>
                No space, no numbers, only letters !
            </label>
            <input
                id="form-input"
                type="text"
                className={validation(inputValue) ? '' : 'input-not-valid'}
                onChange={(e) => handleChange(e)}
            />
            <button type="submit" disabled={!validation(inputValue)}>
                Search
            </button>
        </form>
    )
}
