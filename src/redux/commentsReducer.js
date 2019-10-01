import * as ActionTypes from './ActionsTypes';

//assign default valur to state as comments
export const CommentsReducer = (state = {
    errorMessage: null,
    comments: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                comments: action.payload
            }
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            //return state.concat(comment);
            return { ...state, comments: [...state.comments, comment] };
        case ActionTypes.COMMENTS_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
                comments: []
            }
        default:
            return state;
    }
}
