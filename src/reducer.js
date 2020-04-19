import { FETCH_ITEMS } from './actions'

const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: false,
}
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ITEMS.SUCCESS:
            return {
                ...state,
                items: action.payload.data,
                count: action.payload.total,
                loading: false,
            }
        case FETCH_ITEMS.PENDING:
            return {
                ...state,
                loading: true,
            }
        case FETCH_ITEMS.ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state
    }
}
