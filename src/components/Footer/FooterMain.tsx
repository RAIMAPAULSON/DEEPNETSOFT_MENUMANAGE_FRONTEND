import logo from "../../assets/logo.png";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const FooterMain = () => {
  return (
    <div className="bg-black text-white py-4">
      <Container fluid>
        <Row className="justify-content-center text-center">
          {/* Contact Information */}
          <Col md={4}>
            <div className="p-4 border border-white rounded">
              <h5 className="text-primary mb-3">CONNECT WITH US</h5>
              <p className="text-warning mb-1">
                <FaPhoneAlt className="me-2" />
                <span className="text-secondary"> +91 9567843340</span>
              </p>
              <p className="text-warning">
                <FaEnvelope className="me-2" />
                <span className="text-secondary"> info@deepnetsoft.com</span>
              </p>
            </div>
          </Col>

          {/* Logo and Social Media */}
          <Col md={4} className="position-relative">
  <div className="p-4 border border-white rounded text-center position-relative" style={{ position: 'relative' }}>
    <img
      src={logo}
      alt="Deep Net Soft Logo"
      width="60"
      style={{
        position: "absolute",
        top: "-30px", 
        left: "50%",
        transform: "translateX(-50%)",
        padding: "5px",
        borderRadius: "50%",
      }}
    />

    <h3 className="text-primary d-inline">DEEP </h3>
    <h3 className="text-white d-inline">NET </h3>
    <h3 className="text-muted d-inline">SOFT</h3>

    <div className="mt-3">
      <FaFacebookF className="me-3 text-light" />
      <FaTwitter className="me-3 text-light" />
      <FaInstagram className="me-3 text-light" />
      <FaYoutube className="text-light" />
    </div>
  </div>
</Col>


          {/* Location */}
          <Col md={4}>
            <div className="p-4 border border-white rounded text-center">
              <h5 className="text-primary">FIND US</h5>
              <p className="text-secondary">
                <FaMapMarkerAlt className="me-2 text-warning" />
                First floor, Geo Infopark, <br />
                Infopark EXPY, Kakkanad
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterMain;
