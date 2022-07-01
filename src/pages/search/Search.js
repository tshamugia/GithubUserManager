import ROUTES from '../../config/routes';
import { Header } from '../../components/header/Header';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Form,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Spinner,
} from 'react-bootstrap';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export function Search() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function searchUser(e) {
    e.preventDefault();
    setLoading(true);
    fetch(`https://api.github.com/users/${search}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + `${GITHUB_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('User Not Found!');
      })
      .then((data) => {
        setUser([data]);
        setSearch('');
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Header />
      <Container>
        <Form className="d-flex mt-5">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant={!search ? 'btn btn-success disabled' : 'btn btn-success'}
            onClick={searchUser}
            disabled={!search}
          >
            Search
          </Button>
        </Form>
        {error && <h1>{error}</h1>}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          user.map((user) => (
            <Row key={user.id} className="justify-content-md-center">
              <Col className="col-md-3">
                <Card style={{ width: '16rem' }} className="user-card shadow">
                  <Card.Img variant="top" src={user.avatar_url} />
                  <Card.Body>
                    <Card.Title className="card-title">
                      Username: {user.login}
                    </Card.Title>
                    <Card.Title className="card-title">
                      Repository:{user.public_repos}
                    </Card.Title>
                    <Card.Title className="card-title">
                      Followers: {user.followers}
                    </Card.Title>
                    <Card.Title className="card-title">
                      Following:{user.following}
                    </Card.Title>

                    <Link to={ROUTES.USER.replace(':id', user.login)}>
                      <Button variant="primary" className="mt-3">
                        Read More...
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))
        )}
      </Container>
    </>
  );
}
