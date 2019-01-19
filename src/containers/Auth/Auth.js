import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from './RegisterForm/RegisterForm';
import * as actions from '../../store/actions';

class Auth extends Component {

  registerHandler = values => {
    console.log(values.username, values.password);
    this.props.onAuth(values.username, values.password);
  }

  render () {
    return (
        <div>
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
      onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(null, mapDispatchToProps)(Auth);