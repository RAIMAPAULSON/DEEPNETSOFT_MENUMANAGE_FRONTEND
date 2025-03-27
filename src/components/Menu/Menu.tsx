import React from "react";
import { Container } from "react-bootstrap";
import "./Menu.css"; 

const Menu: React.FC = () => {
  return (
    <section
      className="menu-section d-flex align-items-center justify-content-center text-center text-light"
    >
      <Container>
        <h1 className="menu-title">MENU</h1>
        <p className="menu-subtitle">
          Please take a look at our menu featuring food, drinks, and brunch. If you'd like to 
          place an order, use the "Order Online" button located below the menu.
        </p>
      </Container>
    </section>
  );
};

export default Menu;
