import './registration.css';
import { Form, Row, Button, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import { createUser } from '../../http/auth';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../config/routes';

export function Registration() {
  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
  });
  const [err, setErr] = useState([]);
  const navigate = useNavigate();

  function inputHandler(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    try {
      await createUser(user);
      navigate(ROUTES.SIGNIN, { state: { success: true } });
    } catch (error) {
      setErr(error.response.data.message);
    }
  }

  return (
    <>
      <Form className="registration-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstname">
            <Form.Label>First Name</Form.Label>

            <Form.Control
              name="firstName"
              placeholder="First Name"
              value={user.firstName}
              onChange={inputHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="lastName"
              placeholder="Last Name"
              value={user.lastName}
              onChange={inputHandler}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridAge">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              value={user.birthDate}
              onChange={inputHandler}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Username"
              value={user.username}
              onChange={inputHandler}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={inputHandler}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" onClick={submitHandler}>
          Submit
        </Button>
      </Form>
      {err && (
        <div className="errBox">
          {err.map((e, i) => (
            <>
              <p key={i}> ! {e}</p>
            </>
          ))}
        </div>
      )}
    </>
  );
}
