import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    console.log('purchaseBurgerSuccess');
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS, 
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    console.log('purchaseBurgerFailed');
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED, 
        error: error
    }
}

export const purchaseBurgerStart = () => {
    console.log('purchaseBurgerStart');
    return {
        type: actionTypes.PURCHASE_BURGER_START, 
    }
}

export const purchaseBurger = (orderData) => {
    console.log('purchaseBurger');
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
        .then(response => {
            console.log('success', response.data.name, orderData);
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
            dispatch(purchaseBurgerFailed(error));
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT, 
    }
}