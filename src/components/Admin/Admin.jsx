
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Modal, Button,Table, Container } from "react-bootstrap";


const API_URL = "https://deenpnetsoft-menumanage-backend-1.onrender.com";

function Admin() {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [menuForm, setMenuForm] = useState({ name: "", description: "" });
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [editMenuId, setEditMenuId] = useState(null);

  console.log("editMenuId", editMenuId);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = () => {
    axios.get(API_URL).then((res) => setMenus(res.data));
  };

  const handleAddOrEditMenu = async () => {
    try {
      if (editMenuId) {
        const { data: existingMenu } = await axios.get(
          `${API_URL}/${editMenuId}`
        );
        console.log("existingMenu", existingMenu);
        const updatedMenu = {
          ...existingMenu,
          name: menuForm.name,
          description: menuForm.description,
        };

        await axios.put(`${API_URL}/${editMenuId}`, updatedMenu);
      } else {
        const newMenu = {
          name: menuForm.name,
          description: menuForm.description,
          items: [],
        };

        await axios.post(`${API_URL}`, newMenu);
      }

      fetchMenus();
      setShowMenuModal(false);
      resetMenuForm();
    } catch (error) {
      console.error("Error in handleAddOrEditMenu:", error);
    }
  };

  const resetMenuForm = () => {
    setMenuForm({ name: "", description: "" });
    setEditMenuId(null);
  };

  const handleEditMenu = (menu) => {
    setEditMenuId(menu._id);
    setMenuForm({ name: menu.name, description: menu.description });
    setShowMenuModal(true);
  };

  const handleAddOrEditItem = async () => {
    if (!selectedMenu) return;

    console.log("Adding or Editing Item...");

    // Ensure `items` is an array before modifying it
    const updatedItems = [...(selectedMenu.items || [])];
    console.log("updatedItems", updatedItems);

    if (editItemIndex !== null) {
      updatedItems[editItemIndex] = newItem; // Update existing item
    } else {
      updatedItems.push(newItem); // Add new item
    }

    const updatedMenu = { ...selectedMenu, items: updatedItems };

    try {
      await axios.put(`${API_URL}/${selectedMenu._id}`, updatedMenu);

      // Fetch updated menus and update state
      await fetchMenus();
      setSelectedMenu(updatedMenu);

      // Reset form fields
      setNewItem({ name: "", description: "", price: "" });
      setEditItemIndex(null);
      setShowItemModal(false);
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Failed to update menu. Please try again.");
    }
  };

  const handleDeleteItem = (itemIndex) => {
    console.log("Deleting item at index:", itemIndex);
    if (!selectedMenu) return;
    const updatedItems = selectedMenu.items.filter((item, index) => {
      return index !== itemIndex;
    });

    const updatedMenu = { ...selectedMenu, items: updatedItems };
    axios.put(`${API_URL}/${selectedMenu._id}`, updatedMenu).then(() => {
      fetchMenus();
      setSelectedMenu(updatedMenu);
    });
  };

  return (
    <Container className="mt-4">
      <h2>Admin Panel</h2>
      <Button
        className="btn btn-primary mb-3"
        onClick={() => {
          resetMenuForm();
          setShowMenuModal(true);
        }}
      >
        Add Menu
      </Button>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>
                <Button variant="link" onClick={() => setSelectedMenu(menu)}>
                  {menu.name}
                </Button>
              </td>
              <td>{menu.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditMenu(menu)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() =>
                    axios.delete(`${API_URL}/${menu._id}`).then(fetchMenus)
                  }
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedMenu && selectedMenu.items && (
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <h3>{selectedMenu.name} Items</h3>
            <Button
              variant="success"
              onClick={() => {
                setShowItemModal(true);
                setNewItem({ name: "", description: "", price: "" });
                setEditItemIndex(null);
              }}
            >
              Add Item
            </Button>
          </div>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedMenu?.items?.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setNewItem(item);
                        setEditItemIndex(index);
                        setShowItemModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Menu Modal */}
      <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMenuId ? "Edit Menu" : "Add Menu"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Menu Name"
            value={menuForm.name}
            onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })}
          />
          <input
            className="form-control mb-2"
            name="description"
            placeholder="Menu Description"
            value={menuForm.description}
            onChange={(e) =>
              setMenuForm({ ...menuForm, description: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMenuModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrEditMenu}>
            {editMenuId ? "Update Menu" : "Add Menu"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Item Modal */}
      <Modal show={showItemModal} onHide={() => setShowItemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editItemIndex !== null ? "Edit Item" : "Add Item"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-2"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            className="form-control mb-2"
            name="description"
            placeholder="Item Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            name="price"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowItemModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddOrEditItem}>
            {editItemIndex !== null ? "Update Item" : "Add Item"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
export default Admin;