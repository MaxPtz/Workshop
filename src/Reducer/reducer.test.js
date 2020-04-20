import { reducer } from './reducer'
import { FETCH_ITEMS } from './actions'

describe('reducer', () => {
    let initialState = {
        items: [],
        count: 0,
        loading: false,
        error: false,
    }

    beforeEach(() => {
        initialState = {
            items: [],
            count: 0,
            loading: false,
            error: false,
        }
    })

    it('should return initialState', function () {
        expect(reducer(undefined, {})).toEqual({ ...initialState, error: true })
    })

    it('should handle Fetch Success', function () {
        expect(
            reducer(initialState, {
                type: FETCH_ITEMS.SUCCESS,
                payload: {
                    data: { uk: { state: 'uk', city: ['london'] } },
                    count: 1,
                },
            })
        ).toEqual({
            items: { uk: { state: 'uk', city: ['london'] } },
            count: 1,
            loading: false,
            error: false,
        })
    })
})
