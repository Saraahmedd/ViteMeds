"use client";
import {
  addToCart,
  deleteFromCart,
  viewCart,
} from "@/app/redux/actions/cartActions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../../../../components/PatientSidebar";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
  Spinner,
} from "react-bootstrap";
import Message from "../../../../../components/Message";
import { FaCartPlus, FaTrash } from "react-icons/fa";

export default function Cart() {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.getCartReducer.cart?.cart);
  const cartItems = useSelector(
    (state) => state.getCartReducer.cart?.cart?.items
  );

  const addToCartSel = useSelector((state) => state.addToCartReducer.cart);

  const deleteFromCartSel = useSelector(
    (state) => state.deleteFromCartReducer.cart
  );
  const loading = useSelector((state) => state.deleteFromCartReducer.loading);

  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch, addToCartSel, deleteFromCartSel]);

  function increaseCart(med, n) {
    dispatch(addToCart(med.medicine._id, n, true));
  }

  function decreaseCart(med) {
    if (med.quantity === 1) {
      dispatch(deleteFromCart(med.medicine._id));
    }
    dispatch(addToCart(med.medicine._id, -1));
  }

  // const cart = "hi";

  return (
    <>
      <Sidebar />
      <Container className="py-5">
        <Row>
          <Col md={8}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1>Shopping Cart</h1>
              {loading && <Spinner animation="border" role="status" />}
            </div>
            {cartItems && cartItems.length === 0 ? (
              <Message>Your cart is empty, Let's do some shopping</Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems?.map((item) => (
                  <ListGroup.Item key={item.medicine.name}>
                    <Row>
                      <Col md={2}>
                        <Image
                          src={`http://localhost:8080/${item.medicine.imageURL}`}
                          alt={item.medicine.name}
                          fluid
                          rounded
                        />
                      </Col>

                      <Col md={2}>${item.medicine.price}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.quantity}
                          onChange={(e) =>
                            increaseCart(item, Number(e.target.value))
                          }
                        >
                          {[...Array(item.medicine.quantity).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>
                            dispatch(deleteFromCart(item.medicine._id))
                          }
                        >
                          <FaTrash className="fas fa-trash"></FaTrash>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal (
                    {cartItems?.reduce((acc, item) => acc + item.quantity, 0)})
                    items
                    <FaCartPlus className="px-1 mx-2" />
                  </h2>
                  ${cart?.totalPrice.toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block bg-secondary"
                    disabled={cartItems?.length === 0}
                    onClick={() =>
                      (window.location.href = "/patients/checkout")
                    }
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
