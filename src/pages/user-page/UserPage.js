import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Organization from '../../components/organization/Organization';
import Repository from '../../components/repository/Repository';
import UserDetailCard from '../../components/user-detail-card/UserDetailCard';
import { Header } from '../../components/header/Header';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export function UserPage() {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className="mt-3 ">
          <Col md={4} xs={4}>
            <UserDetailCard />
            <Organization />
          </Col>
          <Col md={8} xs={8}>
            <Repository />
          </Col>
        </Row>
      </Container>
    </>
  );
}
