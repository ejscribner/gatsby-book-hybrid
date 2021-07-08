import * as React from "react"
import { Form, Input, Button, ErrorMessage } from "../components/common"
import { useState, useContext } from "react"
import { FirebaseContext } from '../components/Firebase';

const Register = () => {
  const {firebase} = useContext(FirebaseContext);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  function handleInputChange(e) {
    e.persist();
    setErrorMessage('');
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formValues.password === formValues.confirmPassword) {
      firebase.register({
        username: formValues.username,
        email: formValues.email,
        password: formValues.password
      }).catch(error => {
        setErrorMessage(error.message);
      });
    } else {
      setErrorMessage('Passwords do not match!');
    }
  }

  return (
    <Form onSubmit={handleSubmit} >
      <Input onChange={handleInputChange} value={formValues.username} placeholder="Username" type="text" required name="username" />
      <Input onChange={handleInputChange} value={formValues.email} placeholder="Email" type="email" required name="email" />
      <Input onChange={handleInputChange} value={formValues.password} placeholder="Password" type="password" required minLength={3} name="password" />
      <Input onChange={handleInputChange} value={formValues.confirmPassword} placeholder="Confirm Password" type="password" required minLength={3} name="confirmPassword" />
      {!!errorMessage &&
        <ErrorMessage>{errorMessage}</ErrorMessage>
      }
      <Button block type="submit">Register</Button>
    </Form>
  )
}

export default Register;
