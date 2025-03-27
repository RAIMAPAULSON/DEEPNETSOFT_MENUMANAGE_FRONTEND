import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import "./MenuList.css"; 
import MenuItems from "../MenuItems/MenuItems"; 

const API_URL = "https://deenpnetsoft-menumanage-backend-1.onrender.com";

const MenuList: React.FC = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [menuData, setMenuData] = useState<Record<string, any[]>>({});

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const formattedData: Record<string, any[]> = {};
        const categoryNames: string[] = [];

        data.forEach((menu: { name: string; items: any[] }) => {
          formattedData[menu.name] = menu.items;
          categoryNames.push(menu.name);
        });

        setMenuData(formattedData);
        setCategories(categoryNames);
        if (categoryNames.length > 0) setCategory(categoryNames[0]);
      })
      .catch((error) => console.error("Error fetching menu data:", error));
  }, []);

  return (
    <>
      <div className="category-tabs-container text-center py-4">
        <Nav variant="pills" className="justify-content-center">
          {categories.map((cat) => (
            <Nav.Item className="mx-2" key={cat}>
              <Nav.Link
                eventKey={cat}
                active={category === cat}
                onClick={() => setCategory(cat)}
                className="category-tab"
              >
                {cat.toUpperCase()}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <MenuItems category={category} items={menuData[category] || []} />
    </>
  );
};

export default MenuList;
