import { COMMENTS } from '../assets/comments';
import { PROMOTIONS } from '../assets/promotions';
import { LEADERS } from '../assets/leaders';
import { DISHES } from '../assets/dishes';

/**initial state */
export const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS
};

/**
 * Default value will initialstate as per Ecmascript 6
 * @param {*} state 
 * @param {*} action 
 */
export const Reducer = (state = initialState, action) => {
    return state;
};