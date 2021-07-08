import * as React from "react"
import { Link } from "gatsby"
import { FirebaseContext } from "../components/Firebase"

import Seo from "../components/seo"
import { useState, useContext } from "react"
import { Form, Input, Button, ErrorMessage } from "../components/common"


const Login = () => {

  const [formValues, setFormValues] = useState({email: '', password:''});
  const [errorMessage, setErrorMessage] = useState('');

  const {firebase} = useContext(FirebaseContext);

  function handleSubmit(e) {
    e.preventDefault();
    firebase.login({email: formValues.email, password: formValues.password}).catch(error => {
      console.log(error);
      setErrorMessage(error.message);
    });
  }

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues(currentValues => ({
      ...currentValues,
      [e.target.name]: e.target.value
    }));
  }

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Input value={formValues.email} name="email" onChange={handleInputChange} placeholder="Email" type="email" />
        <Input value={formValues.password} name="password" onChange={handleInputChange} placeholder="Password" type="password" />
        {!!errorMessage &&
          <ErrorMessage>{errorMessage}</ErrorMessage>
        }
        <Button block type="submit">Login</Button>
      </Form>
    </section>
  )
}


export default Login
