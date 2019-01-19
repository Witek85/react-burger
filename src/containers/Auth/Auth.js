import React, { Component } from 'react';

import RegisterForm from './RegisterForm/RegisterForm'

class Auth extends Component {

  registerHandler = values => {
    console.log(values);
  }

  render () {
    return (
        <div>
          <RegisterForm onSubmit={this.registerHandler} />
        </div>
    )
  }
};

export default Auth;