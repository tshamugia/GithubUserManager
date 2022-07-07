import { Card } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { ForUserOrgs } from '../../http/http';

export default function Repository() {
  const [repos, setRepos] = useState([]);
  const { error, setError } = useContext(AppContext);
  const userName = useParams();

  useEffect(() => {
    ForUserOrgs(userName)
      .then((data) => setRepos(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      <div className="bg-primary text-white text-center mb-2 rounded shadow">
        <h2>Repositories</h2>
      </div>
      {error && <h1>{error.message}</h1>}

      {repos.slice(0, 10).map((repo) => (
        <Card style={{ width: '53.5rem' }} className="mt-2" key={repo.id}>
          <Card.Body className="shadow">
            <Card.Title className="text-primary">
              <strong>Name:</strong>
              <span className="text-info">{repo.name}</span>
            </Card.Title>
            <Card.Title className="text-primary">
              <strong>Stars: </strong>
              <span className="text-info">{repo.stargazers_count}</span>
            </Card.Title>
            <Card.Title className="text-primary">
              <strong>Forks: </strong>
              <span className="text-info">{repo.forks}</span>
            </Card.Title>
            <Card.Link href={repo.html_url} className="text-decoration-none">
              Go To Repository
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}
