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

// Dummy data for medicines

// Step 2: Shipping Information
const ShippingInformation = ({ onPrev, onNext, patient }) => {
  //add validation that all fields are filled

  return (
    <div>
      <Sidebar />
      <h2>Shipping Information</h2>
      <form
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <Table striped bordered hover>
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
                  <button
                    onClick={() => onNext(address._id)}
                    style={buttonStyle}
                  >
                    Next
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <button onClick={onPrev} style={buttonStyle}>
          Previous
        </button>
      </form>
    </div>
  );
};

// Step 3: Payment Method Selection
const PaymentMethodSelection = ({ onPrev, onNext, patient, totalCost }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  console.log(patient);

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <div>
      <h2>Payment Method</h2>
      <form
        style={{
          border: "1px solid #ccc",
          padding: "30px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <div style={formGroupStyle}>
          <label>
            <input
              type="radio"
              value="Stripe"
              checked={selectedPaymentMethod === "Stripe"}
              onChange={() => handlePaymentMethodChange("Stripe")}
            />
            Credit Card
          </label>
        </div>
        <div style={formGroupStyle}>
          <label>
            <input
              type="radio"
              value="COD"
              checked={selectedPaymentMethod === "COD"}
              onChange={() => handlePaymentMethodChange("COD")}
            />
            Cash on delivery
          </label>
        </div>

        <div style={formGroupStyle}>
          <label>
            <input
              type="radio"
              disabled={patient?.wallet < totalCost}
              value="Wallet"
              checked={selectedPaymentMethod === "Wallet"}
              onChange={() => handlePaymentMethodChange("Wallet")}
            />
            Wallet
          </label>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button onClick={onPrev} style={buttonStyle}>
            Previous
          </button>
          <button
            onClick={() => onNext(selectedPaymentMethod)}
            style={buttonStyle}
            disabled={!selectedPaymentMethod}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

// Step 4: order review
const OrderReview = ({
  cart,
  shippingInfo,
  orderSummary,
  onPrev,
  onPlaceOrder,
}) => {
  return (
    <div>
      <h2>Order Review</h2>
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
        <div>
          <h3>Items in Cart</h3>
          {cart.items.map((item) => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <img
                src={"http://localhost:8000/" + item.medicine.imageURL}
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
        <div>
          <h3>Order Summary</h3>
          <p>Total: ${cart.totalPrice}</p>
        </div>
      </form>
      <button onClick={onPrev} style={buttonStyle}>
        Previous
      </button>
      <button onClick={onPlaceOrder} style={buttonStyle}>
        Place Order
      </button>
    </div>
  );
};

// Checkout Component
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [shippingInfo, setShippingInfo] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCartReducer.cart);
  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch]);
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient.user
  );
  useEffect(() => {
    dispatch(viewMyDetails());
  }, [dispatch]);
  return (
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
        onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
        onNext={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))}
      />
      {currentStep === 1 && (
        <ShippingInformation
          onPrev={() => setCurrentStep(currentStep - 1)}
          patient={patient}
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
          shippingInfo={shippingInfo}
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
