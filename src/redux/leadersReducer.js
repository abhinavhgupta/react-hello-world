import * as ActionTypes from './ActionsTypes';

export const LeadersReducer = (state = {
    errorMessage: null,
    leaders: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LEADERS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                leaders: action.payload
            }
        case ActionTypes.LEADERS_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                leaders: []
            }
        default:
            return state;
    }
}