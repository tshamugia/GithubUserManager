import { useState, useEffect, useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import { AppContext } from '../../context/AppContext';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export default function Organization() {
  const [organizations, setOrganizations] = useState([]);
  const { error, setError, setLoading } = useContext(AppContext);
  const userName = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/users/${userName.id}/orgs`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + `${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrganizations(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card style={{ width: '18rem' }} className="mt-4 text-center shadow">
      <Card.Title className="card-header bg-primary text-white ">
        <i className="fa fa-sitemap" aria-hidden="true"></i>
        Organization
      </Card.Title>
      {error && <h1>{error.message}</h1>}
      {
        <Row md={4} className="m-2 ">
          {organizations.slice(0, 3).map((org) => (
            <Col md={6} key={org.id} className="shadow">
              <a
                href={`https://github.com/${org.login}`}
                className="text-decoration-none "
              >
                <Card.Img variant="top" src={org.avatar_url} />
                {org.login}
              </a>
            </Col>
          ))}
        </Row>
      }
    </Card>
  );
}
