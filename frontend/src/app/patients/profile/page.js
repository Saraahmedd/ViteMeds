"use client"
import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form , Accordion, } from 'react-bootstrap';
import { PencilSquare, Key, Box, InfoCircle } from 'react-bootstrap-icons';
import ChangePassword from '../../../../components/ChangePassword';

const PatientDashboard = () => {
  const basicInfoFields = [
    { label: 'Name', value: 'John Doe', icon: <InfoCircle /> },
    { label: 'Email', value: 'john.doe@example.com', icon: <InfoCircle /> },
    // Add more fields as needed
  ];

  const orders = [
    { id: 1, product: 'Medicine A', quantity: 2, total: 30 },
    { id: 2, product: 'Medicine B', quantity: 1, total: 15 },
    // Add more orders as needed
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

 
  const hideOrderDetails = () => {
    setSelectedOrder(null);
  };


  const OrderDetailsSidePanel = () => (
    <Modal show={selectedOrder !== null} onHide={hideOrderDetails}>
      <Modal.Header closeButton>
        <Modal.Title>Order Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedOrder && (
          <div>
            <p>Product: {selectedOrder.product}</p>
            <p>Quantity: {selectedOrder.quantity}</p>
            <p>Total: ${selectedOrder.total}</p>
            {/* Add more order details here */}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="container mt-5">
      {/* Basic Info Section */}
      <Card className="mb-4">
        <Card.Header>
          <Card.Title className="mb-0">Basic Info</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            {basicInfoFields.map((field) => (
              <Col key={field.label} md={6} className="mb-3">
                <div className="d-flex align-items-center">
                  {field.icon}
                  <span className="ml-2">{field.label}:</span>
                </div>
                <p>{field.value}</p>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Change Password Section */}
      <ChangePassword />

      {/* Order List Section */}
      <Card className="mb-4">
        <Card.Header>
          <Card.Title className="mb-0">Order List</Card.Title>
        </Card.Header>
        <Card.Body>
        <Accordion>
      {orders.map((order) => (
        <div key={order.id} className="mb-3">
          <Card>
            <Card.Header>
              <Button variant="link" eventKey={order.id.toString()}>
                <Box className="mr-2" /> Order #{order.id}
              </Button>
              <Button variant="primary" onClick={() => showOrderDetails(order)}>
                View Details
              </Button>
            </Card.Header>
            <Accordion.Collapse eventKey={order.id.toString()}>
              <Card.Body>
                {/* Display additional order information here */}
                <p>Product: {order.product}</p>
                <p>Quantity: {order.quantity}</p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </div>
      ))}
    </Accordion>
        </Card.Body>
      </Card>

      {/* Order Details Side Panel */}
      <OrderDetailsSidePanel />
    </div>
  );
};

export default PatientDashboard;
