import { COMMENTS } from "../assets/comments";
import * as ActionTypes from './ActionsTypes';


//assign default valur to state as commnets
export const CommentsReducer = (state = COMMENTS, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            comment.rating = '';
            comment.date = new Date().toISOString();
            console.log("Comment: ", action.payload);
            //return state.concat(comment);
            return [...state, comment];
        default:
            return state;
    }
}
