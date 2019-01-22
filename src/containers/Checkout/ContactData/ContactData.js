import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import ContactDataForm from './ContactDataForm/ContactDataForm'
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    orderHandler = values => {
        const order = {
        ingredients: this.props.ings,
        price: this.props.price,
        customer: {
            name: values.name,
            address: {
            street: values.street,
            zip: values.postal,
            country: 'pl'
            },
            email: values.email
        },
        deliveryMethod: values.deliveryMethod,
        userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token);

    }

    render () {
        let form = (
            <ContactDataForm onSubmit={this.orderHandler} />
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading,
      token: state.auth.token,
      userId: state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));