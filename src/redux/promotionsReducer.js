import * as ActionTypes from './ActionsTypes';


export const PromotionsReducer = (state = {
    isLoading: true,
    errorMessage: null,
    promotions: []
}, action) => {
    switch (action.type) {
        case ActionTypes.PROMOS_LOADING:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                promotions: []
            }
        case ActionTypes.ADD_PROMOS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                promotions: action.payload
            }
        case ActionTypes.PROMOS_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                promotions: []
            }
        default:
            return state;
    }
}