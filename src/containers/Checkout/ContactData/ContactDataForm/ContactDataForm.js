import React from 'react'
import { Field, reduxForm } from 'redux-form';
import classes from './ContactDataForm.css';

let ContactDataForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="your name"
        />
      </div>
      <div>
        <Field
          name="email"
          component="input"
          type="email"
          placeholder="your email"
        />
      </div>
      <div>
        <Field
          name="street"
          component="input"
          type="text"
          placeholder="street"
        />
      </div>
      <div>
        <Field
          name="postal"
          component="input"
          type="text"
          placeholder="postal code"
        />
      </div>
      <div>
        <Field name="deliveryMethod" component="select">
          <option value="fast">fast</option>
          <option value="cheap">cheap</option>
        </Field>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

ContactDataForm = reduxForm({
  // a unique name for the form
  form: 'contact-data'
})(ContactDataForm);

export default ContactDataForm