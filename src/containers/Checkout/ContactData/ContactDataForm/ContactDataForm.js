import React from 'react'
import { Field, reduxForm } from 'redux-form'

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



      {/* <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>

      </div>
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="male"
            />{' '}
            Male
          </label>
          <label>
            <Field
              name="sex"
              component="input"
              type="radio"
              value="female"
            />{' '}
            Female
          </label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option />
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field
            name="employed"
            id="employed"
            component="input"
            type="checkbox"
          />
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" />
        </div>
      </div> */}
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