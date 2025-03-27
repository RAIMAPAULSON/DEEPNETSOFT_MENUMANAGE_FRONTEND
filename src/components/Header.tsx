import { Navbar, Nav, Container } from 'react-bootstrap';
import logo from '../assets/logo.png'; 
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
    <Container>
      {/* Logo and Brand */}
      <Navbar.Brand href="#" className="d-flex align-items-center mx-auto mx-lg-0">
        <img
          src={logo}
          alt="DeepNetSoft Logo"
          width="50"
          height="50"
          className="position-relative"
          style={{ top: "5px" }} 
        />
        {/* Hide text on small screens */}
        <div className="d-none d-lg-block ms-2">
          <span className="d-block text-primary fw-bold">DEEP <span className="text-light">NET</span></span>
          <span className="text-secondary fw-bold">SOFT</span>
        </div>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" className="border-0" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">HOME</Nav.Link>
          <Nav.Link as={Link} to="/admin">ADMIN</Nav.Link>
          <Nav.Link href="#" className="text-primary fw-bold">MENU</Nav.Link>
          <Nav.Link href="#">MAKE A RESERVATION</Nav.Link>
          <Nav.Link href="#">CONTACT US</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default Header;

