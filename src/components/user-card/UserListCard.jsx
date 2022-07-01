import './usercard.css';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ROUTES from '../../config/routes';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export function UserListCard() {
  const { userDetail } = useContext(AppContext);

  return (
    <Row md={4}>
      {userDetail.map((user) => (
        <Col className="mt-3" key={user.id}>
          <Card style={{ width: '16rem' }} className="user-card shadow">
            <Card.Img variant="top" src={user.avatar_url} />
            <Card.Body>
              <Card.Title className="card-title text-info">
                <span>
                  <strong>{user.name.toUpperCase()}</strong>
                </span>
              </Card.Title>
              <Card.Title className="text-primary">
                Followers: {user.followers}
              </Card.Title>
              <Card.Title className="text-primary">
                Followings: {user.followings}
              </Card.Title>
              <Card.Title className="text-primary">
                Repository: {user.public_repos}
              </Card.Title>

              <Link to={ROUTES.USER.replace(':id', user.login)}>
                <Button variant="primary" className="mt-3 shadow ">
                  Read More...
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
