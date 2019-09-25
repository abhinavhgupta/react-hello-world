import * as ActionTypes from './ActionsTypes';
import { DISHES } from '../assets/dishes';

// Functions that creates an action object 
export const addCommentAction = (dishId, rating, auther, comment) => ({
    type: ActionTypes.ADD_COMMENT,// every action object should contain a type
    payload: {
        dishId: dishId,
        rating: rating,
        author: auther,
        comment: comment
    }
});

//It is a Thunk which returs a dispatch function
export const fetchDishesAction = () => (dispatch) => {
    dispatch(dishesLoadingAction(true));

    setTimeout(() => {
        dispatch(addDishesAction(DISHES));
    }, 2000);
};

export const dishesLoadingAction = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailedAction = (err) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: err
});

export const addDishesAction = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});