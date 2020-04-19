import _ from 'lodash'

const asyncActionType = (type) => ({
    PENDING: `${type}_PENDING`,
    SUCCESS: `${type}_SUCCESS`,
    FAILURE: `${type}_FAILURE`,
})
export const FETCH_ITEMS = asyncActionType('FETCH_ITEMS')

function fetchItemBegin() {
    return {
        type: FETCH_ITEMS.PENDING,
    }
}

function fetchItemSuccess(items) {
    return {
        type: FETCH_ITEMS.SUCCESS,
        payload: {
            data: _.groupBy(items.data, 'state'),
            count: items.total,
        },
    }
}

function fetchItemFailure(error) {
    return {
        type: FETCH_ITEMS.FAILURE,
        payload: error,
    }
}

export const fetchCities = (url) => (dispatch) => {
    dispatch(fetchItemBegin())
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response
        })
        .then((response) => response.json())
        .then((items) => dispatch(fetchItemSuccess(items)))
        .catch((error) => dispatch(fetchItemFailure(error)))
}
