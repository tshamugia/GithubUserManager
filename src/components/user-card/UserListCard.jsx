import './usercard.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ROUTES from '../../config/routes';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export function UserListCard() {
  const { users } = useContext(AppContext);

  return (
    <Row md={4}>
      {users.map((item) =>
        item.map((user) => (
          <Col className="mt-3" key={user.id}>
            <Card style={{ width: '16rem' }} className="user-card shadow">
              <Card.Img variant="top" src={user.avatar_url} />
              <Card.Body>
                <Card.Title className="card-title">
                  <span>
                    <strong>{user.login.toUpperCase()}</strong>
                  </span>
                </Card.Title>

                <Link to={ROUTES.USER.replace(':id', user.login)}>
                  <Button variant="primary" className="mt-3 shadow ">
                    Read More...
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))
      )}
    </Row>
  );
}
