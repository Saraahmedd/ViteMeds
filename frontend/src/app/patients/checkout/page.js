"use client";
import React, { useState } from 'react';
import { login } from "@/app/redux/actions/authActions";
import { Stepper } from "../../../../components/Stepper";

import Image from "next/image";



// Dummy data for medicines
const dummyMedicines = [
  { id: 1, name: 'Medicine A', price: 10.99, image: '/birthday.svg'},
  { id: 2, name: 'Medicine B', price: 20.49, image: '/birthday.svg' },
  { id: 3, name: 'Medicine C', price: 15.99, image: '/birthday.svg' },
];
// Step 1: Shopping Cart
const ShoppingCart = ({ cart, removeFromCart, adjustQuantity, onNext }) => {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <form style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '5px', marginBottom: '20px' }}>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
              <Image
                src={item.image}
                alt={item.name}
                width={30}
                height={30}
                style={{ marginRight: '10px' }}
              />
             <div style={{ flex: '1' }}>
             <p style={{ fontWeight: 'bold' }}>{item.name}</p>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p style={{ marginRight: '10px' ,marginTop: '12px' }}>Quantity:</p>
               <button onClick={(e) => adjustQuantity(item.id, -1, e)} style={buttonStyle}>-</button>
               <span style={{ marginRight: '20px' , marginLeft: '10px'}}>{item.quantity}</span>
               <button onClick={(e) => adjustQuantity(item.id, 1, e)} style={buttonStyle}>+</button>
             </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' , marginRight: '20px' }}>
              
                
                <p style={{ marginRight: '10px' ,marginTop: '52px' }}>price: ${item.quantity * item.price}</p>
             
              <button onClick={() => removeFromCart(item.id)}style={{ ...buttonStyle, marginTop: '32px' , marginLeft: '15px'}}>Remove</button>
            </div>
          </div>
        ))}
          <p style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '20px' }}>
            Total for Cart: ${Number(cart.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2)}
          </p>
          <button onClick={onNext} style={buttonStyle}>Next</button>
        </form>
        
      </div>
    );
  };
  
// Step 2: Shipping Information
const ShippingInformation = ({ onPrev, onNext }) => {
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');

    //add validation that all fields are filled
  
    return (
      <div>
        <h2>Shipping Information</h2>
        <form style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '5px', marginBottom: '20px' }}>
          <div style={formGroupStyle}>
            <label>
              Country:
              <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} style={inputStyle} />
            </label>
          </div>
          <div style={formGroupStyle}>
            <label>
              City:
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} />
            </label>
          </div>
          <div style={formGroupStyle}>
            <label>
              Address:
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
            </label>
          </div>
          <div style={formGroupStyle}>
            <label>
              Postcode:
              <input type="text" value={postcode} onChange={(e) => setPostcode(e.target.value)} style={inputStyle} />
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button onClick={onPrev} style={buttonStyle}>Previous</button>
            <button onClick={() => onNext({ country, city, address, postcode })} style={buttonStyle}>Next</button>
          </div>
        </form>
      </div>
    );
  };

  // Step 3: Payment Method Selection
const PaymentMethodSelection = ({ onPrev, onNext, onSelectPaymentMethod }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  
    const handlePaymentMethodChange = (method) => {
      setSelectedPaymentMethod(method);
    };
  
    return (
      <div>
        <h2>Payment Method</h2>
        <form style={{  border: '1px solid #ccc',  padding: '30px',  borderRadius: '5px',  marginBottom: '20px',    }}> 
          <div style={formGroupStyle}>
            <label>
              <input
                type="radio"
                value="credit_card"
                checked={selectedPaymentMethod === 'credit_card'}
                onChange={() => handlePaymentMethodChange('credit_card')}
              />
              Credit Card
            </label>
          </div>
          <div style={formGroupStyle}>
            <label>
              <input
                type="radio"
                value="paypal"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={() => handlePaymentMethodChange('paypal')}
              />
              Cash on delivery
            </label>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button onClick={onPrev} style={buttonStyle}>Previous</button>
            <button onClick={() => onNext(selectedPaymentMethod)} style={buttonStyle} disabled={!selectedPaymentMethod}>
              Next
            </button>
          </div>
        </form>
      </div>
    );
  };
  
    // Step 4: order review
  const OrderReview = ({ cart, shippingInfo, orderSummary, onPrev, onPlaceOrder }) => {
   
    return (
      <div>
        <h2>Order Review</h2>
        <form style={{ border: '1px solid #ccc', padding: '30px', borderRadius: '5px', marginBottom: '20px' }}>
          <div>
            <h3>Shipping Information</h3>
            <p>Address: {shippingInfo.address}</p>
          </div>
          <div>
            <h3>Items in Cart</h3>
            {cart.map((item) => (
             <div key={item.id} style={{ display: 'flex', marginBottom: '10px' }}>
             <img
               src={item.image}
               alt={item.name}
               style={{ width: '50px', height: '50px', marginRight: '10px' }}
             />
             <div style={{ flex: '1' }}>
               <p style={{ fontWeight: 'bold' }}>{item.name}</p>
               <p>Quantity: {item.quantity}</p>
             </div>
             <div style={{ textAlign: 'right' }}>
               <p>Price: ${item.quantity * item.price}</p>
             </div>
           </div>
            ))}
          </div>
          <div>
            <h3>Order Summary</h3>
            <p>Subtotal: ${orderSummary.subtotal}</p>
            <p>Shipping Fee: ${orderSummary.shippingFee}</p>
            <p>Total: ${orderSummary.total}</p>
          </div>
        </form>
        <button onClick={onPrev} style={buttonStyle}>Previous</button>
        <button onClick={onPlaceOrder} style={buttonStyle} >Place Order</button>
      </div>
    );
  };
  
  
// Checkout Component
const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [cart, setCart] = useState(dummyMedicines.map((medicine) => ({ ...medicine, quantity: 1 })));
  const [shippingInfo, setShippingInfo] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [shippingFee, setShippingFee] = useState(5);

  const addToCart = (medicine) => {
    setCart((prevCart) => [...prevCart, { ...medicine, quantity: 1 }]);
  };

  const removeFromCart = (medicineId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== medicineId));
  };

  const adjustQuantity = (medicineId, quantityChange, e) => {
    e.preventDefault(); // Prevent default form submission behavior

    
  
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === medicineId ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) } : item
      )
    );
  };

  const selectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setCurrentStep(currentStep + 1);
  };

  const calculateTotal = () => {
    const subtotal = Number(cart.reduce((total, item) => total + item.quantity * item.price, 0)).toFixed(2);
    const total = subtotal + shippingFee;
    return { subtotal, shippingFee, total };
  };
  const nextStep = (data) => {
    setCurrentStep(currentStep + 1);
    if (data) {
      setShippingInfo((prevInfo) => ({ ...prevInfo, ...data }));
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const placeOrder = () => {
    //placing order logic 
    console.log('Order placed!', { cart, shippingInfo });
  };

  return (
    <div style={{ width: '900px', margin: 'auto' , display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))',
    gap: '20px', }}>
          <Stepper currentStep={currentStep} totalSteps={totalSteps} onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 1))} onNext={() => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))} />
      {currentStep === 1 && (
        <ShoppingCart
          cart={cart}
          removeFromCart={removeFromCart}
          adjustQuantity={adjustQuantity}
          onNext={() => setCurrentStep(currentStep + 1)}
        />
      )}
      {currentStep === 2 && (
        <ShippingInformation    onPrev={() => setCurrentStep(currentStep - 1)} onNext={(data) => nextStep(data)} />
      )}
       {currentStep === 3 && (
        <PaymentMethodSelection
          onPrev={() => setCurrentStep(currentStep - 1)}
          onNext={() => setCurrentStep(currentStep + 1)}
          onSelectPaymentMethod={selectPaymentMethod}
        />
      )}
      {currentStep === 4 && (
        <OrderReview
        cart={cart}
        shippingInfo={shippingInfo}
        orderSummary={calculateTotal()}
        onPrev={() => setCurrentStep(currentStep - 1)}
        onPlaceOrder={placeOrder}
        />
      )}
    </div>
  );
};

export default Checkout;


const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
   
  };
  
  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: '10px',
   
  };

  const formGroupStyle = {
    marginBottom: '10px',
   
  };
