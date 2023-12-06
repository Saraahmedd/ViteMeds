"use client";
import React, { useEffect, useState } from "react";
import { login } from "@/app/redux/actions/authActions";
import { Stepper } from "../../../../components/Stepper";

import Image from "next/image";
import { makeOrder } from "@/app/redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { viewMyDetails } from "@/app/redux/actions/patientActions";
import { viewCart } from "@/app/redux/actions/cartActions";
import Sidebar from "../../../../components/PatientSidebar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Spinner from "../../../../components/Spinner";
import { Calendar2, CashStack, CreditCard } from "react-bootstrap-icons";

// Dummy data for medicines

// Step 2: Shipping Information
const ShippingInformation = ({ onPrev, onNext, patient, loading }) => {
  //add validation that all fields are filled
  const buttonStyle = {
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <Container>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Shipping Information
          </h2>
          <Form
            style={{
              border: "1px solid #ccc",
              padding: "30px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Street Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Zip Code</th>
                  <th>Country</th>
                  <th>Choose Address</th>
                </tr>
              </thead>
              <tbody>
                {patient?.deliveryAddress?.map((address) => (
                  <tr key={address._id}>
                    <td>{address.streetAddress}</td>
                    <td>{address.city}</td>
                    <td>{address.state}</td>
                    <td>{address.zipCode}</td>
                    <td>{address.country}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => onNext(address._id)}
                        style={{ ...buttonStyle }}
                      >
                        Next <BsArrowRight />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <Row className="justify-content-between">
              <Col md="auto">
                <Button
                  onClick={(e) =>
                    (window.location.href = "/patients/medicines/cart")
                  }
                  style={{ ...buttonStyle, background: "#e74c3c" }}
                >
                  <BsArrowLeft style={{ marginRight: "5px" }} /> Back to Cart
                </Button>
              </Col>
            </Row>
          </Form>{" "}
        </>
      )}
    </Container>
  );
};

// Step 3: Payment Method Selection
const PaymentMethodSelection = ({ onPrev, onNext, patient, totalCost }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const buttonStyle = {
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Payment Method
      </h2>
      <Form
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Form.Group as={Row} controlId="creditCard">
          <Col>
            <Form.Check
              type="radio"
              label="Credit Card"
              value="Stripe"
              checked={selectedPaymentMethod === "Stripe"}
              onChange={() => handlePaymentMethodChange("Stripe")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="cashOnDelivery">
          <Col>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              value="COD"
              checked={selectedPaymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="wallet">
          <Col>
            <Form.Check
              type="radio"
              label="Wallet"
              value="Wallet"
              checked={selectedPaymentMethod === "Wallet"}
              onChange={() => handlePaymentMethodChange("Wallet")}
              disabled={patient?.wallet < totalCost}
            />
          </Col>
        </Form.Group>

        <Row className="justify-content-between">
          <Col md="auto">
            <Button
              onClick={onPrev}
              style={{ ...buttonStyle, background: "#e74c3c" }}
            >
              Previous
            </Button>
          </Col>
          <Col md="auto">
            <Button
              variant="primary"
              onClick={() => onNext(selectedPaymentMethod)}
              style={{ ...buttonStyle, marginLeft: "10px" }}
              disabled={!selectedPaymentMethod}
            >
              Next
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

// Step 4: order review
const OrderReview = ({
  cart,
  shippingInfo,
  orderSummary,
  onPrev,
  onPlaceOrder,
  paymentMethod,
  loading,
}) => {
  const buttonStyle = {
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  const estimatedDeliveryDate = new Date(
    new Date().setDate(new Date().getDate() + 3)
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Container>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Order Review
      </h2>
      <form
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div>
          <h3>Shipping Information</h3>
          <p>Address: {shippingInfo.address}</p>
        </div>
        <hr></hr>
        <div>
          <h3>Items in Cart</h3>
          {cart.items.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <img
                src={"http://localhost:8080/" + item.medicine.imageURL}
                alt={item.medicine.name}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <div style={{ flex: "1" }}>
                <p style={{ fontWeight: "bold" }}>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>Price: ${item.quantity * item.medicine.price}</p>
              </div>
            </div>
          ))}
        </div>
        <hr></hr>
        <h3
          style={{
            color: "#333",
            borderBottom: "2px solid #ddd",
            paddingBottom: "10px",
            marginBottom: "15px",
          }}
        >
          Order Summary
        </h3>
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <p style={{ fontWeight: "bold" }}>
              Total Price: ${cart.totalPrice}
            </p>
          </Col>
        </Row>
        <Row style={{ marginBottom: "10px" }}>
          <Col xs={1}>
            <Calendar2 style={{ fontSize: "24px", marginRight: "10px" }} />
          </Col>
          <Col>
            <p style={{ fontWeight: "bold" }}>
              Estimated Delivery Date: {estimatedDeliveryDate}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            {paymentMethod === "Credit Card" ? (
              <CreditCard style={{ fontSize: "24px", marginRight: "10px" }} />
            ) : (
              <CashStack style={{ fontSize: "24px", marginRight: "10px" }} />
            )}
          </Col>
          <Col>
            <p style={{ fontWeight: "bold" }}>
              Payment Method: {paymentMethod}
            </p>
          </Col>
        </Row>
        <br></br>
        <Row className="justify-content-between">
          <Col md="auto">
            <Button
              onClick={onPrev}
              style={{ ...buttonStyle, background: "#e74c3c" }}
            >
              Previous
            </Button>
          </Col>
          <Col md="auto">
            {!loading ? (
              <Button
                variant="primary"
                onClick={onPlaceOrder}
                style={buttonStyle}
              >
                Place Order
              </Button>
            ) : (
              <Button variant="primary" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </Button>
            )}
          </Col>
        </Row>
      </form>
    </Container>
  );
};

// Checkout Component
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [shippingInfo, setShippingInfo] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const orderPlacingLoading = useSelector(
    (state) => state.orderReducer?.loading
  );

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCartReducer.cart);
  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch]);
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient.user
  );
  const loading = useSelector((state) => state.viewMyDetailsReducer.loading);
  useEffect(() => {
    dispatch(viewMyDetails());
  }, [dispatch]);
  return (
    <>
      <Sidebar />
      <div
        style={{
          width: "900px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))",
          gap: "20px",
        }}
      >
        <Stepper
          currentStep={currentStep}
          totalSteps={3}
          className="py-3"
          onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
          onNext={() =>
            setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
          }
        />
        {currentStep === 1 && (
          <ShippingInformation
            onPrev={() => setCurrentStep(currentStep - 1)}
            patient={patient}
            loading={loading}
            onNext={(data) => {
              setShippingInfo(data);
              setCurrentStep(currentStep + 1);
            }}
          />
        )}
        {currentStep === 2 && (
          <PaymentMethodSelection
            onPrev={() => setCurrentStep(currentStep - 1)}
            onNext={(data) => {
              setSelectedPaymentMethod(data);
              setCurrentStep(currentStep + 1);
            }}
            totalCost={cart.cart.totalPrice}
            patient={patient}
          />
        )}
        {currentStep === 3 && (
          <OrderReview
            cart={cart.cart}
            loading={orderPlacingLoading}
            shippingInfo={shippingInfo}
            paymentMethod={selectedPaymentMethod}
            onPrev={() => setCurrentStep(currentStep - 1)}
            onPlaceOrder={() => {
              dispatch(
                makeOrder({
                  paymentMethod: selectedPaymentMethod,
                  deliveryAddress: shippingInfo,
                })
              );
            }}
          />
        )}
      </div>
    </>
  );
};

export default Checkout;

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "4px",
  marginRight: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
  marginBottom: "10px",
};

const formGroupStyle = {
  marginBottom: "10px",
};
