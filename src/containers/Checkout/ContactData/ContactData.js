import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import ContactDataForm from './ContactDataForm/ContactDataForm'
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    orderHandler = values => {
        console.log(values)

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
        deliveryMethod: values.deliveryMethod
        }
        this.props.onOrderBurger(order);

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
      loading: state.order.loading
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));