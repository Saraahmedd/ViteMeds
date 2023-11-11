"use client"
import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAddressesAction, viewMyDetails } from '@/app/redux/actions/patientActions';
import ChangePassword from '../../../../components/ChangePassword';

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [forceRerender, setForceRerender] = useState("a7a");
  
  const dispatch = useDispatch();
  const patient = useSelector(state => state.viewMyDetailsReducer.patient?.patient.user);
  const loading = useSelector(state => state.viewMyDetailsReducer.loading);
 
  useEffect(() => {
  dispatch(viewMyDetails());
  }
    ,[dispatch]
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
          <Card.Title>{patient?.name}'s Profile {forceRerender}</Card.Title>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                {/* <td>Role {patient.role}</td> */}
                <td>{patient?.role}</td>
              </tr>
              <tr>
                <td>Wallet</td>
                <td>{patient?.wallet}</td>
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
                      {patient?.deliveryAddress?.map((address) => (
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
      <ChangePassword />
    </div>) : (<></>)}
    </>
  );
};

export default PatientDashboard;
