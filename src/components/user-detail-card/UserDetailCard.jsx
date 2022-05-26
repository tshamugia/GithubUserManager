import { useEffect, useState, useContext } from 'react';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import Modal from '../../components/modal/Modal';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export default function UserDetailCard() {
  const { error, setLoading, setError } = useContext(AppContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [userInfo, setUserInfo] = useState([]);
  const [showModal, setShowModal] = useState([false, '']);

  const userName = useParams();
  const isFavorites = favorites.some((item) => item.login == userName.id);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${userName.id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${GITHUB_TOKEN}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong!!!');
      })
      .then((data) => setUserInfo(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  function addToFavorites(e) {
    e.preventDefault();
    setFavorites((prev) => [...prev, userInfo]);
  }
  function removeFromFavorites(e) {
    e.preventDefault();
    setFavorites(favorites.filter((users) => users.login !== userInfo.login));
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
                className="mb-2"
                onClick={addToFavorites}
              >
                Add To Favorites
              </Button>
            ) : (
              <Button
                variant="primary "
                className="mb-2"
                onClick={() => setShowModal([true, userInfo.login])}
              >
                <i className="fa fa-star" aria-hidden="true"></i>
                Remove From Favorites
              </Button>
            )}

            <ListGroup variant="flush">
              <ListGroupItem>
                <Card.Title>
                  <strong>Name:</strong> {userInfo.name}
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>BIO:</strong> {userInfo.bio}
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>Followers:</strong> {userInfo.followers}
                </Card.Title>
              </ListGroupItem>
              <ListGroupItem>
                <Card.Title>
                  <strong>Following:</strong> {userInfo.following}
                </Card.Title>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </>
      </Card>
      {showModal[0] && (
        <Modal>
          <h1>Remove User From Favorites ?</h1>
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
