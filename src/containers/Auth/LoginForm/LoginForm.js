import React from 'react'
import { Field, reduxForm } from 'redux-form';
import classes from './LoginForm.css';
import Button from '../../../components/UI/Button/Button';

let LoginForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props

  // TODO ADD Validation

  return (
    <div className={classes.Login}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="User Email"
          />
        </div>
        <div>
          <Field
            name="password"
            component="input"
            type="password"
            placeholder="Password"
          />
        </div>
        {error && <strong>{error}</strong>}
        <div>
          <Button btnType="Success" type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm