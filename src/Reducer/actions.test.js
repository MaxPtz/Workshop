import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock-jest'
import { FETCH_ITEMS, fetchCities } from './actions'

const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: false,
}

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('fetch data tests', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('should start request to API', function () {
        const store = mockStore()
        store.dispatch(fetchCities())
        const action = store.getActions()
        const expectedAction = {
            type: FETCH_ITEMS.PENDING,
        }
        expect(action[0]).toEqual(expectedAction)
    })

    const mockResults = {
        headers: { 'content-type': 'application/json' },
        body: {
            page: 1,
            per_page: 10,
            total: 10,
            total_pages: 1,
            data: [
                {
                    city: 'Abbeville',
                    state: 'Louisiana',
                },
            ],
        },
    }
    const mockUrl = 'https://jsonmock.hackerrank.com/api/cities/?city=a'
    it('creates FETCH_ITEMS.SUCCESS when fetching API has been done', () => {
        fetchMock.getOnce(mockUrl, mockResults)

        const expectedActions = [
            { type: FETCH_ITEMS.PENDING },
            {
                type: FETCH_ITEMS.SUCCESS,
                payload: {
                    data: {
                        Louisiana: [
                            {
                                city: 'Abbeville',
                                state: 'Louisiana',
                            },
                        ],
                    },
                    count: 10,
                },
            },
        ]
        const store = mockStore(initialState)

        return store.dispatch(fetchCities(mockUrl)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    const mockResponse = (status, statusText, response) => {
        return new window.Response(response, {
            status: status,
            statusText: statusText,
            headers: {
                'Content-type': 'application/json',
            },
        })
    }

    it('calls request and success actions if the fetch response was successful', () => {
        window.fetch = jest
            .fn()
            .mockImplementation(() =>
                Promise.resolve(
                    mockResponse(200, null, JSON.stringify(mockResults.body))
                )
            )

        const store = mockStore(initialState)

        return store.dispatch(fetchCities(mockUrl)).then(() => {
            const expectedActions = store.getActions()
            expect(expectedActions.length).toBe(2)
            expect(expectedActions).toContainEqual({ type: FETCH_ITEMS.PENDING })
            expect(expectedActions).toContainEqual({
                type: FETCH_ITEMS.SUCCESS,
                payload: {
                    data: {
                        Louisiana: [
                            {
                                city: 'Abbeville',
                                state: 'Louisiana',
                            },
                        ],
                    },
                    count: 10,
                },
            })
        })
    })
})
