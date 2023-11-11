"use client"
import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressesAction, viewMyDetails } from '@/app/redux/actions/patientActions';
import ChangePassword from '../../../../components/ChangePassword';
import { cancelOrder, viewOrderList } from '@/app/redux/actions/orderActions';

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [forceRerender, setForceRerender] = useState("a7a");

  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(cancelOrder(orderId))
    dispatch(viewOrderList());
  };
  
  const dispatch = useDispatch();
  const patient = useSelector(state => state.viewMyDetailsReducer.patient?.patient);
  const loading = useSelector(state => state.cancelOrderReducer.loading);
  const orders = useSelector(state => state.viewOrderListReducer.orders)

  console.log(orders)
  // console.log()
 
  useEffect(() => {
  dispatch(viewMyDetails());
  dispatch(viewOrderList());
  
  }
    ,[dispatch,loading]
  )
 
  
  const { success, error } = useSelector((state) => state.addAddressesReducer);

  const [newAddress, setNewAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

 

  const handleAddAddress = () => {
    dispatch(addAddressesAction(newAddress));
    if (success) handleClose();
  };

  return (
<>
    { patient ? (
    <div className="container mt-4">
      {success ? (
        <Alert variant="success">
          <strong>Success!</strong> Delivery Address Added.
        </Alert>
      ) : error && (
        <Alert variant="danger">
          <strong>Error!</strong> {error}.
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Card.Title>{patient?.name}'s Profile</Card.Title>
          <Table striped bordered hover responsive>
            <tbody>
             
              <tr>
                <td colSpan="2">Wallet: {patient?.user?.wallet} USD</td>
                {/* <td colSpan="2"></td> */}
              </tr>
              <tr>
                <td colSpan="2">
                  <h6>Delivery Addresses</h6>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Country</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patient?.user.deliveryAddress?.map((address) => (
                        <tr key={address._id}>
                          <td>{address.streetAddress}</td>
                          <td>{address.city}</td>
                          <td>{address.state}</td>
                          <td>{address.zipCode}</td>
                          <td>{address.country}</td>
                            
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <h6>My Orders</h6>

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Payment Method</th>
                        <th>Total Price</th>
                        <th>Created At</th>
                        <th>Is Paid</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.status}</td>
                          <td>{order.paymentMethod}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.createdAt}</td>
                          <td>{order.isPaid === true ? "Paid" : "Not Paid" }</td>
                          <td>
                            { order.status !== 'Cancelled' &&
                          <Button variant="danger" onClick={() => handleDeleteOrder(order._id)}>
                            Cancel
                          </Button>}
                        </td>
                        <td>
                          <Button variant="info" onClick={() => handleViewDetails(order)}>
                            View Details
                          </Button>
                        </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={handleShow}>
            Add New Address
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group controlId="streetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street address"
              onChange={(e) => setNewAddress({ ...newAddress, streetAddress: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="zipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip code"
              onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
            />
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAddress}>
            Add Address
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for displaying order details */}
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display order details here */}
          {selectedOrder && (
            <>
              <p>Status: {selectedOrder.status}</p>
              <p>Payment Method: {selectedOrder.paymentMethod}</p>
              <p>Total Price: {selectedOrder.totalPrice}</p>
              <p>Created At: {selectedOrder.createdAt}</p>
              {/* Add more details as needed */}
              <p>Delivery Address:</p>
              <p>Street Address: {selectedOrder.deliveryAddress.streetAddress}</p>
              <p>City: {selectedOrder.deliveryAddress.city}</p>
              <p>State: {selectedOrder.deliveryAddress.state}</p>
              <p>Zip Code: {selectedOrder.deliveryAddress.zipCode}</p>
              <p>Country: {selectedOrder.deliveryAddress.country}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
      <ChangePassword />
    </div>) : (<></>)}
    </>
  );
};

export default PatientDashboard;
