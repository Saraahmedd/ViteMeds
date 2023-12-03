"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Avatar from "react-avatar";
//import myImage from '../../images/image.png'
import Spinner from "../../../../components/Spinner";
import {
  addAddressesAction,
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import ChangePassword from "../../../../components/ChangePassword";
import { cancelOrder, viewOrderList } from "@/app/redux/actions/orderActions";
import Sidebar from "../../../../components/PatientSidebar";

const PatientDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [forceRerender, setForceRerender] = useState("a7a");

  const [showModal2, setShowModal2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal2(true);
  };
  const [loadingPage, setLoadingPage] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseModal2 = () => {
    setShowModal2(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    dispatch(viewOrderList());
  };
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const dispatch = useDispatch();
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient
  );
  const loading = useSelector((state) => state.cancelOrderReducer.loading);
  const orders = useSelector((state) => state.viewOrderListReducer.orders);
  const addAddressloading = useSelector(
    (state) => state.addAddressesReducer.loading
  );
  console.log(orders);

  useEffect(() => {
    dispatch(viewMyDetails());
    dispatch(viewOrderList());
  }, [dispatch, loading, addAddressloading]);

  useEffect(() => {
    setLoadingPage(true);
    dispatch(viewOrderList()).then(() => {
      setLoadingPage(false);
    });
  }, [dispatch]);

  const { success, error } = useSelector((state) => state.addAddressesReducer);

  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [addressValidation, setAddressValidation] = useState({
    streetAddress: false,
    city: false,
    state: false,
    zipCode: false,
    country: false,
  });
  /*useEffect(()=>{
    handleAddAddress();
   }, [newAddress]);*/

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setNewAddress({
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });

    setAddressValidation({
      streetAddress: false,
      city: false,
      state: false,
      zipCode: false,
      country: false,
    });

    setShowModal(false);
    setShowAllAddresses(false);
  };

  const handleAddAddress = () => {
    const validation = {
      streetAddress: !newAddress.streetAddress,
      city: !newAddress.city,
      state: !newAddress.state,
      zipCode: !/^\d+$/.test(newAddress.zipCode),
      country: !newAddress.country,
    };

    setAddressValidation(validation);

    if (!Object.values(validation).some((error) => error)) {
      // If there are no validation errors, dispatch the action
      dispatch(addAddressesAction(newAddress));
      handleClose();
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 9000);
      setIsLoading(true);
      setTimeout(() => {
        // Reset loading to false after 2 seconds
        setIsLoading(false);
      }, 9000);
    }
  };
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <Sidebar />
      {loadingPage ? (
        <Spinner />
      ) : patient ? (
        <div className="container mt-4">
          {showSuccess ? (
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
          <h1
            style={{ textAlign: "center", fontStyle: "inherit", color: "blue" }}
          >
            Welcome {patient?.name}{" "}
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "5px" }} />
          </h1>

          <Nav variant="tabs" defaultActiveKey="/patients/profile">
            <Nav.Item>
              <Nav.Link href="/patients/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/patients/orders">Orders</Nav.Link>
            </Nav.Item>
          </Nav>
          <Card>
            <Card.Body>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridGap: "20px",
                }}
              >
                {/* Column 1 */}
                <div>
                  <div style={{ display: "grid", gridGap: "8px" }}>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Name
                      </span>
                      <span style={{ marginLeft: "95px" }}>
                        {patient?.name}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Email
                      </span>
                      <span style={{ marginLeft: "95px" }}>
                        {patient?.email}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Gender
                      </span>
                      <span style={{ marginLeft: "80px" }}>
                        {patient?.gender}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Mobile Number
                      </span>
                      <span style={{ marginLeft: "20px" }}>
                        0{patient?.mobileNumber}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Age
                      </span>
                      <span style={{ marginLeft: "107px" }}>
                        {calculateAge(patient?.dateOfBirth)}
                      </span>
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold", marginLeft: "4px" }}>
                        Wallet{" "}
                        <FontAwesomeIcon
                          icon={faWallet}
                          style={{ color: "blue", marginLeft: "5px" }}
                        />
                      </span>
                      <span style={{ marginLeft: "65px" }}>
                        {patient?.user.wallet} $
                      </span>
                    </div>
                    <div style={{ marginLeft: "4px" }}>
                      {!showAdditionalInfo && (
                        <Button
                          variant="link"
                          onClick={() =>
                            setShowAdditionalInfo(!showAdditionalInfo)
                          }
                          style={{
                            padding: "0",
                            lineHeight: "1",
                            marginBottom: "4px",
                            marginRight: "1000",
                          }}
                        >
                          See more
                        </Button>
                      )}
                      {showAdditionalInfo && (
                        <Button
                          variant="link"
                          onClick={() =>
                            setShowAdditionalInfo(!showAdditionalInfo)
                          }
                          style={{
                            padding: "0",
                            lineHeight: "1",
                            marginBottom: "4px",
                          }}
                        >
                          See less
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                {showAdditionalInfo && (
                  <div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        <h4>Emergency Contact </h4>
                      </span>
                    </div>
                    <div style={{ display: "grid", gridGap: "8px" }}>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Name</span>
                        <span style={{ marginLeft: "95px" }}>
                          {patient?.emergencyContact.fullName}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>
                          Mobile Number
                        </span>
                        <span style={{ marginLeft: "20px" }}>
                          0{patient?.emergencyContact.mobileNumber}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Relation</span>
                        <span style={{ marginLeft: "80px" }}>
                          {patient?.emergencyContact.relationToPatient}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Table
                striped
                bordered
                hover
                responsive
                style={{ marginTop: "50px" }}
              >
                <tbody>
                  <tr>
                    <td colSpan="2">
                      <h6>Delivery Addresses</h6>
                      {!showAllAddresses && (
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
                            {patient?.user.deliveryAddress
                              ?.slice(0, 2)
                              .map((address) => (
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
                      )}
                      {patient?.user.deliveryAddress?.length > 2 &&
                        !showAllAddresses && (
                          <Button
                            variant="link"
                            onClick={() =>
                              setShowAllAddresses(!showAllAddresses)
                            }
                          >
                            View All
                          </Button>
                        )}
                      {showAllAddresses && (
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
                            {patient?.user.deliveryAddress
                              ?.slice(0)
                              .map((address) => (
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
                      )}
                      {patient?.user.deliveryAddress?.length > 2 &&
                        showAllAddresses && (
                          <Button
                            variant="link"
                            onClick={() =>
                              setShowAllAddresses(!showAllAddresses)
                            }
                          >
                            View Less
                          </Button>
                        )}
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
                    style={{ marginBottom: "20px" }}
                    type="text"
                    placeholder="Enter street address"
                    isInvalid={addressValidation.streetAddress}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        streetAddress: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: addressValidation.streetAddress
                        ? "block"
                        : "none",
                    }}
                  >
                    Please enter the street address.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    type="text"
                    placeholder="Enter city"
                    isInvalid={addressValidation.city}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, city: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: addressValidation.city ? "block" : "none",
                    }}
                  >
                    Please enter the city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    type="text"
                    placeholder="Enter state"
                    isInvalid={addressValidation.state}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, state: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: addressValidation.state ? "block" : "none",
                    }}
                  >
                    Please enter the state.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="zipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    type="text"
                    placeholder="Enter zip code"
                    isInvalid={addressValidation.zipCode}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, zipCode: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: addressValidation.zipCode ? "block" : "none",
                    }}
                  >
                    Please enter a valid zip code with numbers only.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    style={{ marginBottom: "20px" }}
                    type="text"
                    placeholder="Enter country"
                    isInvalid={addressValidation.country}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, country: e.target.value })
                    }
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{
                      display: addressValidation.country ? "block" : "none",
                    }}
                  >
                    Please enter the country.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleAddAddress}
                disabled={isLoading} // Disable the button when it's in the loading state
              >
                {isLoading ? "Loading..." : "Add Address"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientDashboard;
