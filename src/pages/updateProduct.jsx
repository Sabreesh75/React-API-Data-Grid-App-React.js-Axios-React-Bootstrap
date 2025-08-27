import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";

export default function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: { rate: "", count: "" }
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        const data = res.data;
        // Ensure nested rating exists
        data.rating = data.rating || { rate: "", count: "" };
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setError("Failed to load product data.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested rating fields
    if (name === "rate" || name === "count") {
      setProduct({
        ...product,
        rating: {
          ...product.rating,
          [name]: value,
        },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!product.title || !product.price) {
      alert("Please fill out the required fields.");
      return;
    }

    axios
      .put(`http://localhost:3000/products/${id}`, product)
      .then(() => {
        alert("✅ Product updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("❌ Failed to update product");
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={7}>
          <h3 className="mb-4 text-center">🛠️ Update Product</h3>
          <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded">

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product title"
                name="title"
                value={product.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={product.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={product.image}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formRate">
                  <Form.Label>Rating (Rate)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    name="rate"
                    placeholder="Rating (e.g., 4.5)"
                    value={product.rating.rate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCount">
                  <Form.Label>Rating Count</Form.Label>
                  <Form.Control
                    type="number"
                    name="count"
                    placeholder="Number of reviews"
                    value={product.rating.count}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-grid">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}
