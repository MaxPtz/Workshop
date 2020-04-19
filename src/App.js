import React from 'react'
import './app.scss'
import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'
import Form from './Components/Form'
import { CityTable } from './Components/CityTable'

export default () => {
    const { items, loading, error } = useSelector((state) => state)

    return (
        <div className="city-search">
            <h2 className="title">Workshop City Search</h2>
            <Form />
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
