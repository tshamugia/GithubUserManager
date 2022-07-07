import './header.css';
import logo from '../../static/GitHub_Logo_White.png';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../config/routes';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export function Header() {
  const { logout, user } = useContext(AuthContext);

  return (
    <Navbar bg="navbar navbar-expand-lg navbar-dark bg-primary " expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <i className="fab fa-github fa-lg" aria-hidden="true"></i>
          <img
            src={logo}
            width="50"
            height="30"
            className="d-inline-block align-top"
          ></img>
        </Navbar.Brand>
        <Navbar.Collapse id="navbarScroll" className="navbar-link">
          <Nav style={{ maxHeight: '100px' }}>
            <NavLink className="nav-link" to={ROUTES.DASHBOARD}>
              Dashboard
            </NavLink>
            <NavLink className="nav-link" to={ROUTES.SEARCH}>
              Search
            </NavLink>
            <NavLink className="nav-link" to={ROUTES.FAVORITE}>
              Favourite
            </NavLink>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text as="div" className="mx-1 fst-italic">
                <i className="fa fa-user-circle" aria-hidden="true"></i>
                {user.username}
              </Navbar.Text>
              <Button variant="btn btn-outline-success " onClick={logout}>
                Log Out
              </Button>
            </Navbar.Collapse>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
