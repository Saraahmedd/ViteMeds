"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "./Card";
import DescriptionModal from "./DescriptionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./Button";
import AddModal from "./AddModal";
import { getMedicinesAction } from "@/app/redux/actions/medicineActions";
import {
  addToCart,
  deleteFromCart,
  viewCart,
} from "@/app/redux/actions/cartActions";
import { FaTimes } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
function MedicineComponent({ title, role }) {
  let isPharmacist;
  role == "pharmacist" ? (isPharmacist = true) : false;
  let isAdmin;
  role == "admin" ? (isAdmin = true) : false;
  const [modalAddShow, setModalAddShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [modalDescrShow, setModalDescrShow] = useState(false);
  const [name, setName] = useState({});
  const [reqbody, setReqbody] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.addToCartReducer.loading);
  const loadingDeletion = useSelector(
    (state) => state.deleteFromCartReducer.loading
  );
  const medicines = useSelector(
    (state) => state.getMedicinesReducer.medicines?.data
  );
  const medicinesLoading = useSelector(
    (state) => state.getMedicinesReducer.loading
  );
  const medUses = useSelector(
    (state) => state.getMedicinesReducer.medicines?.medUses
  );

  const cart = useSelector((state) => state.getCartReducer.cart);

  const addMedicineLoading = useSelector(
    (state) => state.addMedicineReducer.loading
  );
  const editMedicineLoading = useSelector(
    (state) => state.editMedicineReducer.loading
  );
  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setModalEditShow(true);
  };
  const handleCardClickPatient = (medicine) => {
    setSelectedMedicine(medicine);
    setModalDescrShow(true);
  };

  function handleCartClick(e, medicine) {
    e.stopPropagation();
    dispatch(addToCart(medicine._id, 1));
  }

  function getMedicineText(medicine) {
    const matchingCart = cart.cart.items.filter(
      (i) => i.medicine._id === medicine._id
    );
    if (matchingCart.length > 0) {
      const numInCart = matchingCart[0].quantity;
      return `In Cart (${numInCart})`;
    } else {
      return "Add to Cart";
    }
  }

  const [medUse, setMedUse] = useState({});

  useEffect(() => {
    dispatch(getMedicinesAction({ ...name, ...medUse }));
  }, [
    dispatch,
    name,
    loadingDeletion,
    medUse,
    addMedicineLoading,
    editMedicineLoading,
    isLoading,
  ]);

  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch, isLoading, loadingDeletion]);

  return (
    <div className="container text-center justify-content-center">
      <h1 className="row text-primary text-center">
        <strong>{title}</strong>
      </h1>
      <hr />
      <div className="m-3 col-md-12 d-flex justify-content-center">
        <div className=" mx-3 ms-0 ">
          <div className="mx-3 form-outline">
            <input
              onChange={(e) => setName({ name: { regex: e.target.value } })}
              type="search"
              placeholder="Search For Medicine"
              className="form-control"
              id="form1"
            />
          </div>
        </div>
        <div className="position-relative">
          <div style={{ display: "flex", alignItems: "center" }}>
            <select
              onChange={(e) =>
                setMedUse(
                  e.target.value === ""
                    ? {}
                    : { medicinalUses: { in: e.target.value } }
                )
              }
              className="rounded form-control"
            >
              <option value="">Select Med Use</option>
              {medUses?.map((medUse, index) => (
                <option key={index} value={medUse}>
                  {medUse}
                </option>
              ))}
            </select>
            {Object.keys(medUse).length !== 0 && (
              <button
                onClick={() => setMedUse({})}
                className="close-button"
                aria-label="Clear Filter"
                style={{
                  marginLeft: "1px",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>
      {medicinesLoading && <Spinner />}
      {isPharmacist && (
        <>
          <Button
            text="Add Product"
            className="add-button mx-5 mb-4 "
            onClick={() => setModalAddShow(true)}
          />

          <AddModal
            show2={modalEditShow}
            show={modalAddShow}
            onHide={() => {
              setModalAddShow(false);
              setSelectedMedicine(null);
              setReqbody("");
            }}
            edit={false}
            reqbody={reqbody}
            setReqbody={setReqbody}
          />
        </>
      )}
      <div className="container m-auto text-center">
        <div className="row m-auto text-center my-5 py-5">
          {medicines?.map((medicine) => (
            <Card
              key={medicine._id}
              className="col-3 m-auto"
              title={
                <div className="text-capitalize p-3 text-center">
                  {medicine.name}
                </div>
              }
              subtitle={<></>}
              onClick={() => {
                if (isPharmacist) handleCardClick(medicine);
                else handleCardClickPatient(medicine);
              }}
              text={
                <div className="">
                  <div className="row global-text">
                    <div className="mx-auto text-center">
                      <img
                        src={
                          medicine.imageURL
                            ? "http://localhost:8080/" + medicine.imageURL
                            : "/medication.svg"
                        }
                        alt="Image"
                        style={{ maxHeight: "120px", maxWidth: "200px" }}
                      />
                    </div>
                    <div className="text-capitalize fw-bold  pt-3 text-center">
                      Price: {medicine.price}
                    </div>
                    <div className="text-capitalize fw-bold  pt-3 text-center">
                      Description: {medicine.description}
                    </div>
                    {isPharmacist && (
                      <div className="text-capitalize fw-bold  pt-3 text-center">
                        Quantity: {medicine.quantity}
                      </div>
                    )}
                    {isPharmacist && (
                      <div className="text-capitalize fw-bold  pt-3 text-center">
                        Sales: {medicine.sales}
                      </div>
                    )}
                  </div>
                  <hr />
                </div>
              }
              buttonText={
                isAdmin
                  ? false
                  : isPharmacist
                  ? "Edit"
                  : cart
                  ? getMedicineText(medicine)
                  : "Add to Cart"
              }
              buttonText2={
                !isPharmacist &&
                !isAdmin &&
                cart &&
                getMedicineText(medicine).startsWith("In") &&
                "Remove 1 item from Cart"
              }
              onClickButton2={(e) => {
                dispatch(deleteFromCart(medicine._id));
              }}
              onClickButton={(e) => {
                if (!isPharmacist && !isAdmin) handleCartClick(e, medicine);
                else if (isPharmacist) handleCardClick(medicine);
              }}
              buttonClass="col-md-12 mx-auto row"
            />
          ))}

          {selectedMedicine && (
            <>
              <AddModal
                show={modalEditShow}
                show2={modalAddShow}
                onHide={() => {
                  setModalEditShow(false);
                  setReqbody("");
                  setSelectedMedicine(null);
                }}
                edit={true}
                medicine={selectedMedicine}
                reqbody={reqbody}
                setReqbody={setReqbody}
              />
              <DescriptionModal
                medicine={selectedMedicine}
                show={modalDescrShow}
                onHide={() => setModalDescrShow(false)}
              />
            </>
          )}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

module.exports = {
  MedicineComponent,
};
