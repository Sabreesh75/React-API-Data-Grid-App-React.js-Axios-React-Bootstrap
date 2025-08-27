import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" },
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested rating fields
    if (name === "rate" || name === "count") {
      setProduct((prev) => ({
        ...prev,
        rating: { ...prev.rating, [name]: value },
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!product.title || !product.price) {
      setError("Title and price are required.");
      return;
    }

    axios
      .post("http://localhost:3000/products", product)
      .then(() => {
        alert("✅ Product added");
        navigate("/");
      })
      .catch((err) => {
        console.error("Axios error", err);
        alert("❌ Failed to add product");
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <Card className="p-4 shadow-sm">
            <h3 className="mb-4 text-center">➕ Add New Product</h3>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product title"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Short product description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g., electronics, clothing"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Direct image link (jpg/png)"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating (Rate)</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      placeholder="e.g., 4.5"
                      name="rate"
                      value={product.rating.rate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating Count</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="e.g., 105"
                      name="count"
                      value={product.rating.count}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid">
                <Button variant="success" type="submit">
                  Add Product
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
