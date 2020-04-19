import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { FETCH_ITEMS, fetchCities } from './actions'

const mockStore = configureMockStore([thunkMiddleware])

describe('fetch data tests', () => {
    it('should handle request to API', function () {
        const store = mockStore()
        store.dispatch(fetchCities())
        const action = store.getActions()
        const expectedAction = {
            type: FETCH_ITEMS.PENDING,
        }
        expect(action[0]).toEqual(expectedAction)
    })

    // it('should get data from API', function (done) {
    //     const mockFetch = jest.fn().mockReturnValue(
    //         Promise.resolve({
    //             json: () =>
    //                 Promise.resolve({
    //                     total: 10,
    //                     data: [0, 1, 2, 3],
    //                 }),
    //         })
    //     )
    //     // expect.assertions(1)
    // })
})
