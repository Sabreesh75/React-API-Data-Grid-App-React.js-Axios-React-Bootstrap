import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import './DisplayProducts.css'; // Custom styles

export default function DisplayProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("axios error", err));
  }, []);

  const handleAdd = () => navigate("/addProduct");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted");
      })
      .catch((err) => console.log("axios err", err));
  };

  const handleUpdate = (id) => navigate(`/updateProduct/${id}`);

  return (
    <div className="products-section py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-dark">🛍️ Featured Products</h2>
          <Button variant="outline-dark" onClick={handleAdd}>
            + Add New Product
          </Button>
        </div>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((item) => (
            <Col key={item.id}>
              <Card className="product-card h-100">
                <div className="card-img-wrapper">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt={item.title}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">{item.title}</Card.Title>
                  <Card.Text className="text-muted small">{item.category}</Card.Text>
                  <Card.Text className="fw-semibold mb-1 text-primary">
                    ₹{item.price}
                  </Card.Text>

                  {item.rating && (
                    <Badge bg="light" text="dark" className="rating-badge mb-2">
                      ⭐ {item.rating.rate} ({item.rating.count})
                    </Badge>
                  )}

                  <div className="mt-auto d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleUpdate(item.id)}
                    >
                      ✏️ Update
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
