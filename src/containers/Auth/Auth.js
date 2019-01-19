import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import * as actions from '../../store/actions';

class Auth extends Component {

  loginHandler = values => {
    console.log(values);
    this.props.onAuth(values.email, values.password, "login");
  }

  registerHandler = values => {
    console.log(values.email, values.password);
    this.props.onAuth(values.email, values.password, "register");
  }

  render () {
    return (
        <div>
          <LoginForm onSubmit={this.loginHandler} />
          <RegisterForm onSubmit={this.registerHandler} />
        </div>
    )
  }
};


// const mapStateToProps = state => {
//   return {
//     ings: state.burgerBuilder.ingredients,
//     price: state.burgerBuilder.totalPrice,
//     loading: state.order.loading
//   }
// }


const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
  }
}

export default connect(null, mapDispatchToProps)(Auth);