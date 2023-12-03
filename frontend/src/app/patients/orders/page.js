"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import { Spinner } from "react-bootstrap";
import Spinner2 from '../../../../components/Spinner';
import {
  addAddressesAction,
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import ChangePassword from "../../../../components/ChangePassword";
import { cancelOrder, viewOrderList } from "@/app/redux/actions/orderActions";

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [forceRerender, setForceRerender] = useState("a7a");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId , setSelectedOrderId] = useState(null);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const [showAllOrders , setShowAllOrders] = useState(false);
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
    setSelectedOrder(null);
  };
  const [loadingPage, setLoadingPage] = useState(false);
  const handleDeleteOrder = (orderId) => {
    console.log(orderId);
    setShowConfirmationModal(true);
    setSelectedOrderId(orderId)
    console.log(selectedOrderId);
  };
  const handleCancelConfirmation = async (confirmed) => {
    setShowConfirmationModal(false);
  
    if (confirmed) {
      try {
        // Set loading state while waiting for the cancellation to complete
        dispatch(cancelOrder(selectedOrderId));
        dispatch(viewOrderList());
  
        // Simulate a delay to show the loading state
        // Remove this in a real-world scenario
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        setShowConfirmationMessage(true);
  
        // Set a timer to hide the message after 5 seconds
        setTimeout(() => {
          setShowConfirmationMessage(false);
        }, 5000);
      } catch (error) {
        // Handle the error, if any
        console.error("Error cancelling order:", error);
      }
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    setLoadingPage(true);
    dispatch(viewMyDetails()).then(() => {
      setLoadingPage(false);
    });
  }, [dispatch]);

  
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient,
  );
  const loading = useSelector((state) => state.cancelOrderReducer.loading);
  const orders = useSelector((state) => state.viewOrderListReducer.orders);
  console.log(orders);
  const addAddressloading = useSelector(
    (state) => state.addAddressesReducer.loading,
  );

  useEffect(() => {
    dispatch(viewMyDetails());
    dispatch(viewOrderList());
  }, [dispatch, loading, addAddressloading]);

  const { success, error } = useSelector((state) => state.addAddressesReducer);

  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddAddress = () => {
    dispatch(addAddressesAction(newAddress));
    handleClose();
  };
  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  
    return formattedDate;
  };
  

  return (
    <>
         {loadingPage ? (
        <Spinner2 />
      ) : (
        <>
      {patient ? (
        <div className="container mt-4">
          {success ? (
            <Alert variant="success">
              <strong>Success!</strong> Delivery Address Added.
            </Alert>
          ) : (
            error && (
              <Alert variant="danger">
                <strong>Error!</strong> {error}.
              </Alert>
            )
          )}
                   {/* Confirmation message */}
                   {showConfirmationMessage && (
        <Alert variant="success" style={{ marginTop: '10px' }}>
          Your order has been cancelled.
        </Alert>
      )}
          <Nav variant="tabs" defaultActiveKey="/patients/orders">
              <Nav.Item>
              <Nav.Link href="/patients/profile">Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
             <Nav.Link href="/patients/orders">Orders</Nav.Link>
            </Nav.Item>
             </Nav>

          <Card>
            <Card.Body>
              <Card.Title>My Orders </Card.Title>
              <Table striped bordered hover responsive>
                <tbody>
                  <tr>
                    <td colSpan="2">Wallet: {patient?.user?.wallet} $</td>
                    {/* <td colSpan="2"></td> */}
                  </tr>
                  <tr>
                    <td colSpan="2">

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
                              <td>{formatDate(order.createdAt)}</td>
                              <td>
                                {order.isPaid === true ? "Paid" : "Not Paid"}
                              </td>
                              <td>
                                {order.status !== "Cancelled" && (
                                   <Button
                                   variant="danger"
                                   size="sm"  // Adjust the size as needed
                                   onClick={() => handleDeleteOrder(order._id)}
                                 >
                                   Cancel
                                 </Button>
                                )}
                              </td>
                              <td>
                                   <Button
                                   variant="info"
                                   size="sm"  // Adjust the size as needed
                                   style ={{color:'white'}}
                                   onClick={() => handleViewDetails(order)}
                                >
                                  View
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
            </Card.Body>
          </Card>
   {/* Modal for cancellation confirmation */}
   <Modal show={showConfirmationModal} onHide={() => handleCancelConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this order?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleCancelConfirmation(false)}>
            No
          </Button>
          <Button
           variant="danger"
           onClick={() => handleCancelConfirmation(true)}
           disabled={loading}  // Disable the button while loading
          >
          {loading ? (
          <Spinner animation="border" size="sm" />
          ) : (
          "Yes"
          )}
         </Button>

        </Modal.Footer>
      </Modal>
          {/* Modal for displaying order details */}
          <Modal show={showModal2} onHide={handleCloseModal2}>
            <Modal.Header closeButton>
              <Modal.Title> <h1>Order Details</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Display order details here */}
              {selectedOrder && (
                <>
                  <p><h6>Status:</h6> {selectedOrder.status}</p>
                  <p><h6>Payment Method:</h6> {selectedOrder.paymentMethod}</p>
                  <p><h6>Total Price:</h6> {selectedOrder.totalPrice}$</p>
                  <p><h6>Created At:</h6> <p>
                  </p>{formatDate(selectedOrder.createdAt)}</p>
                  {console.log(selectedOrder)}
                  {/* Add more details as needed */}
                  <p> <h6>Delivery Address:</h6></p>
                  <p>{selectedOrder.deliveryAddress.country},{' '}
                     {selectedOrder.deliveryAddress.state},{' '}
                     {selectedOrder.deliveryAddress.city},{' '} 
                     {selectedOrder.deliveryAddress.streetAddress},{' '}
                     {selectedOrder.deliveryAddress.zipCode} 
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{color:'steelblue'}}>Medicine</th>
                        <th style ={{color:'steelblue'}}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.medicines.map((item) => (
                        <tr key={item._id}>
                          <td>{item.medicine.name}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <></>
      )}
        </>
      )}
    </>
  );
};

export default PatientDashboard;

