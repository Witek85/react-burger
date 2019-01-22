import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions';

class Auth extends Component {

  loginHandler = values => {
    console.log(values);
    this.props.onAuth(values.email, values.password, "login");
  }

  registerHandler = values => {
    this.props.onAuth(values.email, values.password, "register");
  }

  render () {

    let form = (
      <div>
        <LoginForm onSubmit={this.loginHandler} />
        <RegisterForm onSubmit={this.registerHandler} />
      </div>
    )
    let errorMessage = null;
    let authRedirect = null;

    if (this.props.loading) {
      form = <Spinner />
    }

    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    if (this.props.isAuthenticated && this.props.buildingBurger) {
      authRedirect = <Redirect to="/checkout" />
    }

    if (this.props.isAuthenticated && !this.props.buildingBurger) {
      authRedirect = <Redirect to="/" />
    }

    return (
      <div>
        {authRedirect}
        {errorMessage}
        {form}
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building
  }
}


const mapDispatchToProps = dispatch => {
  return {
      onAuth: (email, password, method) => dispatch(actions.auth(email, password, method))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);