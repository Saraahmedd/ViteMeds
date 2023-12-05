"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserMd,faUser, faEnvelope, faPhone, faBirthdayCake, faMoneyBill, faDollarSign, faBuilding, faWallet } from '@fortawesome/free-solid-svg-icons';
import Avatar from "react-avatar";

import Spinner from "../../../../components/Spinner";
import {
  addAddressesAction,
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import ChangePassword from "../../../../components/ChangePassword";
import { cancelOrder, viewOrderList } from "@/app/redux/actions/orderActions";
import Sidebar from "../../../../components/PatientSidebar";
import { Fonts } from "react-bootstrap-icons";

const PharmacistDashboard = () => {
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

  const dispatch = useDispatch();
  const pharmacist = JSON.parse(localStorage.getItem("userInfo")).data.user.data;
  console.log(pharmacist);

  useEffect(() => {
    setLoadingPage(true);
    dispatch(viewOrderList()).then(() => {
      setLoadingPage(false);
    });
  }, [dispatch]);

  const { success, error } = useSelector((state) => state.addAddressesReducer);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {

    setShowModal(false);
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
     <style>
        {`
          body {
            margin: 0;
            padding: 0;
            background: linear-gradient(to right, #778899 50%, white 50%);
          }
          `}
          </style>
     
      {loadingPage ? (
        <Spinner />
      ) : pharmacist ? (
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

<Card style={{ background: "linear-gradient(to right, #b0c4de 25%, white 65%)", marginLeft: '350px', height: '580px', marginBottom:"5px" }}>
      <Card.Body style={{ display: 'flex' }}>
        {/* Column for Image */}
        <div style={{ width: '35%', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
  <Image src="/image2.png" width={180} height={180} style={{ borderRadius: '50%', backgroundColor: "white", marginBottom:'10px' }} />
  <div style={{ textAlign: 'center', fontWeight:'bold' }}> <h4>{pharmacist?.name}</h4></div>
  <div style={{ textAlign: 'center' ,color:"#000080"}}>
  {pharmacist?.role}
  {pharmacist?.role && (
    <FontAwesomeIcon icon={faUserMd} style={{ marginLeft: '5px',color:"#000080" }} />
  )}
</div>

</div>



        {/* Column for Remaining Information */}
        <div style={{ width: '65%', height: '100%', padding: '20px' }}>
          {/* Information Details */}
          <div>
            <h1 style ={{ fontStyle:'italic', fontWeight:'bold', marginLeft:"80px"}}>Welcome</h1>
          </div>
          <h6 style={{color:"#000080", marginTop:'3px'}}>Identity Snapshot</h6>
          <div style={{ marginBottom: '5px' }}>
  <FontAwesomeIcon icon={faUser} style={{ fontWeight: "bold", marginRight: "5px" }} />
  <span style={{marginLeft:"20px"}}>{pharmacist?.name}</span>
</div>
<div style={{ marginBottom: '5px' }}>
  <FontAwesomeIcon icon={faEnvelope} style={{ fontWeight: "bold", marginRight: "5px" }} />
  <span style={{marginLeft:"20px"}}>{pharmacist?.email}</span>
</div>
<div style={{ marginBottom: '5px' }}>
  <FontAwesomeIcon icon={faPhone} style={{ fontWeight: "bold", marginRight: "5px" }} />
  <span style={{marginLeft:"20px"}}>{pharmacist?.phoneNumber}</span>
</div>
<div style={{ marginBottom: '5px' }}>
  <FontAwesomeIcon icon={faBirthdayCake} style={{ fontWeight: "bold", marginRight: "5px" }} />
  <span style={{marginLeft:"20px"}}>{calculateAge(pharmacist?.dateOfBirth)}</span>
  {!showAdditionalInfo && (
           <Button
           variant="outline-light"
           onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
           style={{
            backgroundColor:"transparent",
            color:"blue",
             padding: "0",
             lineHeight: "1",
             marginBottom: "4px",
             marginLeft:"280px", // Adjust the margin as needed
           }}
         >
           &#9660;
         </Button>
         
            )}
  <hr style={{ margin: '10px 0' }} />
</div>
{showAdditionalInfo && (
  <div>
    <h6 style={{color:"#000080", marginTop:'3px'}}>Financial Overview</h6>
    <div style={{ marginBottom: '5px' }}>
      <FontAwesomeIcon icon={faMoneyBill} style={{ fontWeight: "bold", marginRight: "5px" }} />
      <span style={{marginLeft:"18px"}}>{pharmacist?.salary}$</span>
    </div>
    <div style={{ marginBottom: '5px' }}>
      <FontAwesomeIcon icon={faDollarSign} style={{ fontWeight: "bold", marginRight: "5px" }} />
      <span style={{marginLeft:"27px"}}>{pharmacist?.hourlyRate}</span>
    </div>
    <div style={{ marginBottom: '5px' }}>
      <FontAwesomeIcon icon={faBuilding} style={{ fontWeight: "bold", marginRight: "5px" }} />
      <span style={{marginLeft:"26px"}}>{pharmacist?.affiliation}</span>
    </div>
    <div>
      <span style={{ fontWeight: "bold" }}>
        <FontAwesomeIcon icon={faWallet} style={{ marginRight: "5px" }} />
      </span>
      <span style={{ marginLeft: "23px" }}>
        {pharmacist?.user.wallet} $
      </span>
    </div>
  </div>
              
            )
           }

          {/* See more/less Button */}
          <div style={{ marginLeft: "4px" }}>

            {showAdditionalInfo && (
                <div>
              <Button
             variant="outline-light"
                onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
                style={{
                    backgroundColor:"transparent",
                    color:"blue",
                  padding: "0",
                  lineHeight: "1",
                  marginBottom: "4px",
                  marginLeft:"280px"
                }}
              >
                &#9650;
              </Button>
              <hr style={{ margin: '10px 0' }} />
              <div style ={{marginTop:'10px'}}>
                <span  style ={{fontWeight: "bold" }}>
                  <h5>Educational Background:</h5>
                </span>
                <span >
                  {pharmacist?.educationalBackground}
                </span>
            </div>
              </div>
            )}
            {!showAdditionalInfo && (
            <div style={{marginTop:'130px'}}>
                <span  style ={{fontWeight: "bold" }}>
                  <h5>Educational Background:</h5>
                </span>
                <span >
                  {pharmacist?.educationalBackground}
                </span>
            </div>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PharmacistDashboard;
