import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
            name: 'name surname',
            address: {
            street: 'teststreet',
            zip: '1234',
            country: 'pl'
            },
            email: 'mail.test.pl'
        },
        deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false, purchasing: false});
            console.log(response);
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error)
        });
    }

    render () {
        let form = (
        <form>
            <input type="text" name="name" placeholder="your name" />
            <input type="email" name="email" placeholder="your email" />
            <input type="text" name="street" placeholder="street" />
            <input type="text" name="postal" placeholder="postal code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if (this.state.loading) {
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

export default ContactData;