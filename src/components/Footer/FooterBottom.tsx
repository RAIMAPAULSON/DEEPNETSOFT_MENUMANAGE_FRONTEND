import { Container, Row, Col } from "react-bootstrap";

const FooterBottom = () => {
  return (
    <div className="bg-gradient text-white-50 py-2">
    <Container fluid className="px-0">
      <Row className="align-items-center mx-0">
        <Col md={6} className="text-center text-md-start">
          <span>© 2024 Deepnetsoft Solutions. All rights reserved.</span>
        </Col>
        <Col md={6} className="text-center text-md-end">
          <a href="/terms" className="text-white-50 mx-2 text-decoration-none">Terms & Conditions</a> 
          <a href="/privacy" className="text-white-50 mx-2 text-decoration-none"> Privacy Policy</a>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default FooterBottom;
