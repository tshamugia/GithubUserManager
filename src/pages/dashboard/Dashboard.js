import { UserListCard } from '../../components/user-card/UserListCard';
import { Button, Container, Spinner } from 'react-bootstrap';
import './dashboard.css';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Header } from '../../components/header/Header';

export function Dashboard() {
  const { setPage, loading } = useContext(AppContext);

  function Pagination(e) {
    e.preventDefault();
    setPage((prev) => prev + 1);
  }

  return (
    <>
      <Header />
      <Container>
        <div className="bg-primary text-center text-white mt-3 rounded shadow">
          <h2>Github Top Users</h2>
        </div>

        <UserListCard />

        {loading ? (
          <Button variant="primary" className="btn-load">
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
          <Button variant="primary" className="btn-load" onClick={Pagination}>
            Load More
          </Button>
        )}
      </Container>
    </>
  );
}
