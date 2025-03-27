import { Container, Row, Col } from "react-bootstrap";
import drinkImage from "../../assets/COCKTAIL1.png";
import cocktailImage from "../../assets/COCKTAIL2.png";
import "./MenuItems.css";

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface MenuItemsProps {
  category: string;
  items: MenuItem[];
}

const MenuItems: React.FC<MenuItemsProps> = ({ category, items }) => {
  return (
    <Container fluid className="menu-background-container">
      <Container className="menu-container">
       <img src={drinkImage} alt="Decorative Drink" className="menu-drink-image" />
        <h2 className="menu-heading">
          <span className="line"></span>
          {category.toUpperCase()}
          <span className="line"></span>
        </h2>

        <Row className="menu-items">
          {items.map((item, index) => (
            <Col xs={12} md={6} key={index} className="menu-item">
              <div className="menu-item-row">
                <span className="menu-name">{item.name}</span>
                <span className="menu-dots"></span>
                <span className="menu-price">{item.price}</span>
              </div>
              <p className="menu-description">{item.description}</p>
            </Col>
          ))}
        </Row>
        <img src={cocktailImage} alt="Decorative Drink" className="menu-drink-image2" />
      </Container>
    </Container>
  );
};

export default MenuItems;


