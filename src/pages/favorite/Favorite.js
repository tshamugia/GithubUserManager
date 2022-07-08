import { useContext, useState } from 'react';
import { Row, Card, Col, Container, Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { FavoritesContext } from '../../context/FavoritesContext';
import { Link } from 'react-router-dom';
import ROUTES from '../../config/routes';
import { Header } from '../../components/header/Header';
import Modal from '../../components/modal/Modal';

export function Favorite() {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [showModal, setShowModal] = useState([false, '']);

  function removeFromFavorites(e, userID) {
    e.preventDefault();
    setFavorites((favorites) =>
      favorites.filter((users) => users.login !== userID)
    );
    setShowModal(false);
  }

  return (
    <>
      <Header />
      <Container>
        <div className="bg-primary text-center text-white mt-3 rounded">
          <h2>Favourites</h2>
        </div>

        <Row md={4}>
          {favorites.map((user) => (
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
                    Following: {user.followings}
                  </Card.Title>
                  <Card.Title className="text-primary">
                    Repositories: {user.public_repos}
                  </Card.Title>

                  <Link to={ROUTES.USER.replace(':id', user.login)}>
                    <Button variant="primary" className="mt-3 shadow ">
                      Details...
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    className="mt-3 ms-2 shadow"
                    onClick={() => setShowModal([true, user.login])}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {showModal[0] && (
            <Modal>
              <h1>Remove User From Favourites ?</h1>
              <Button
                variant="primary"
                className="mt-3 ms-2"
                onClick={(e) => removeFromFavorites(e, showModal[1])}
              >
                yes
              </Button>
              <Button
                variant="primary"
                className="mt-3 ms-2"
                onClick={() => setShowModal([false, ''])}
              >
                No
              </Button>
            </Modal>
          )}
        </Row>
      </Container>
    </>
  );
}
