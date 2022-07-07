import { useEffect, useState, useContext } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import Modal from '../../components/modal/Modal';
import { ForUserDetailPage } from '../../http/http';

export default function UserDetailCard() {
  const { error, setError } = useContext(AppContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [userInfo, setUserInfo] = useState([]);
  const [showModal, setShowModal] = useState([false, '']);

  const userName = useParams();
  const isFavorites = favorites.some((item) => item.login == userName.id);

  useEffect(() => {
    ForUserDetailPage(userName)
      .then((data) => setUserInfo(data))
      .catch((error) => setError(error.message));
  }, []);

  function addToFavorites(e) {
    e.preventDefault();
    setFavorites((prev) => [...prev, userInfo]);
  }
  function removeFromFavorites(e) {
    e.preventDefault();
    setFavorites(
      favorites.filter((userInfo) => userInfo.login !== userInfo.login)
    );
    setShowModal(false);
  }
  return (
    <>
      <Card style={{ width: '18rem' }}>
        {error && <h1>{error.message}</h1>}
        <>
          <Card.Img variant="top" src={userInfo.avatar_url} />
          <Card.Body className="shadow">
            {!isFavorites ? (
              <Button
                variant="primary "
                className="mb-2 "
                onClick={addToFavorites}
              >
                Add To Favourites
              </Button>
            ) : (
              <Button
                variant="primary "
                className="mb-2"
                onClick={() => setShowModal([true, userInfo.login])}
              >
                <i className="fa fa-star" aria-hidden="true"></i>
                Remove From Favourites
              </Button>
            )}

            <ListGroup variant="flush">
              <ListGroupItem>
                <Card.Title>
                  <strong>Name:</strong>
                  <span className="text-info"> {userInfo.name}</span>
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>BIO:</strong>{' '}
                  <span className="text-info"> {userInfo.bio}</span>
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>Followers:</strong>{' '}
                  <span className="text-info"> {userInfo.followers}</span>
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>Following:</strong>{' '}
                  <span className="text-info">{userInfo.following}</span>
                </Card.Title>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </>
      </Card>
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
    </>
  );
}
