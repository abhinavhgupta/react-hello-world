import * as ActionTypes from './ActionsTypes';
import { baseUrl } from '../shared/baseUrl';


// Functions that creates an action object 
export const addCommentAction = (comment) => ({
    type: ActionTypes.ADD_COMMENT,// every action object should contain a type
    payload: comment
});

export const postCommentAction = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };
    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                throw error;
            })
        .then(response => dispatch(addCommentAction(response)))
        .catch(error => { console.log('post comments', error.message); alert('Your comment could not be posted\nError: ' + error.message); });
};

//It is a Thunk which returs a dispatch function
export const fetchDishesAction = () => (dispatch) => {
    dispatch(dishesLoadingAction(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                var error = new Error('Error')
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(dishes => dispatch(addDishesAction(dishes)))
        .catch(error => {
            dispatch(dishesFailedAction(error.message));
        });
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

export const fetchCommentsAction = () => (dispatch) => {
    var url = baseUrl + 'comments';
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                var error = new Error('Error')
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(comments => dispatch(addCommentsAction(comments)))
        .catch(error => {
            dispatch(commentsFailedAction(error.message));
        });
};

export const commentsFailedAction = (error) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: error
});

export const addCommentsAction = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchPromotionsAction = () => (dispatch) => {
    dispatch(promotionsLoadingAction(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                var error = new Error('Error')
                error.response = response;
                throw error;
            }
        }, error => {
            var errorMsg = new Error(error.message);
            throw errorMsg;
        })
        .then(promotions => dispatch(addPromotionsAction(promotions))).catch(error => {
            dispatch(promotionsFailedAction(error.message));
        });
};

export const promotionsLoadingAction = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const addPromotionsAction = (promotions) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
});

export const promotionsFailedAction = (err) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: err
});