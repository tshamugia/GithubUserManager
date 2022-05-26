import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import ROUTES from '../../config/routes';
import './login.css';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const { state } = useLocation();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setError(
        'Username or Password not valid, Please enter valid username and password'
      );
    }
  }

  return (
    <Form className="login-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="btn-login"
        onClick={submitHandler}
      >
        <i className="fas fa-user"></i> Sign In
      </Button>

      <Link to={ROUTES.SIGNUP}>
        <Button variant="secondary">
          <i className="fa fa-sign-in" aria-hidden="true"></i> Sign Up
        </Button>
      </Link>

      {error && (
        <div className="mt-3 ">
          <h3 className="text-danger">{error}</h3>
        </div>
      )}

      {state?.success && (
        <div className="mt-3 ">
          <h3 className="text-success">Registration Success, Please Sign In</h3>
        </div>
      )}
    </Form>
  );
}
