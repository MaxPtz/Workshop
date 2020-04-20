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

export const fetchCities = (url) => async (dispatch) => {
    dispatch(fetchItemBegin())
    try {
        const resp = await fetch(url)
        let respJson = await resp.json()
        if (respJson.total_pages > 1) {
            const apiPromises = []
            let i = 2
            // eslint-disable-next-line no-plusplus
            for (i; i <= respJson.total_pages; i++) {
                apiPromises.push(fetch(`${url}&page=${i}`))
            }
            const multipleResp = await Promise.all(apiPromises)
            const multipleRespJson = await Promise.all(
                multipleResp.map((res) => res.json())
            )
            respJson = {
                ...respJson,
                data: [...respJson.data, ...multipleRespJson[0].data],
            }
        }
        dispatch(fetchItemSuccess(respJson))
    } catch (e) {
        console.log(e)
        dispatch(fetchItemFailure(e))
    }
}
