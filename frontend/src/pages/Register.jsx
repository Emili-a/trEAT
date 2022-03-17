import {
  Button, Callout, FormGroup, InputGroup,
} from '@blueprintjs/core';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import requestRegister from '../requests/register';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);

  const [fullName, setfullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegisterErrors = (responsePromise, response) => {
    if (responsePromise.status === 200) {
      setIsSubmitting(false);
      setUserContext((oldValues) => ({ ...oldValues, token: response.data.token }));
      navigate('/');
    } else if (responsePromise.status === 400) {
      setError('Please fill all the fields correctly!');
    } else if (responsePromise.status === 401) {
      setError('Invalid email and password combination.');
    } else if (responsePromise.status === 500) {
      setError(response.message);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setError('');

    const genericErrorMessage = 'Something went wrong! Please try again later.';

    try {
      const responsePromise = await requestRegister(fullName, username, password);

      setIsSubmitting(true);
      const response = await responsePromise.json();

      handleRegisterErrors(responsePromise, response);
    } catch (response) {
      setError(genericErrorMessage);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="authForm">
      <div className="authFormInner">
        <h2>Register</h2>
        <FormGroup label="Full Name" labelFor="fullName">
          <InputGroup
            id="fullName"
            placeholder="Full Name"
            onChange={(e) => setfullName(e.target.value)}
            value={fullName}
          />
        </FormGroup>
        <FormGroup label="Username" labelFor="username">
          <InputGroup
            className="authInput"
            id="username"
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            className="authInput"
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <section className="authEndSection">
          <div className="flexRow">
            Allready have an account:
            <Link to="/">
              <div className="space">
                Sign in
              </div>
            </Link>
          </div>
          <div className="errorContainer">
            {error && <Callout intent="danger">{error}</Callout>}
          </div>
          <Button
            className="formButton"
            intent="primary"
            disabled={isSubmitting}
            text={`${isSubmitting ? 'Registering' : 'Register'}`}
            fill
            type="submit"
          />
        </section>
      </div>
    </form>
  );
}
