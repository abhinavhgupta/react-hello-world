import * as ActionTypes from './ActionsTypes';

export const DishesReducer = (state = {
    isLoading: true,
    errorMessage: null,
    dishes: []
}, action) => {
    switch (action.type) {
        case ActionTypes.DISHES_LOADING:
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
                dishes: []
            }
        case ActionTypes.ADD_DISHES:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                dishes: action.payload
            }
        case ActionTypes.DISHES_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                dishes: []
            }
        default:
            return state;
    }
}