import * as ActionTypes from './ActionsTypes';

// Fucntions that creates an action object 
export const addCommentAction = (dishId, rating, auther, comment) => ({
    type: ActionTypes.ADD_COMMENT,// every action object should contain a type
    payload: {
        dishId: dishId,
        rating: rating,
        author: auther,
        comment: comment
    }
});