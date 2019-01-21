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

export const purchaseBurger = (orderData, token) => {
    console.log('purchaseBurger');
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
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

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders 
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED, 
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START, 
    }
}

// you can use getState

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFailed(err));
        });
    }
}