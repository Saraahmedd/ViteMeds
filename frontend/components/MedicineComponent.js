"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "./Card";
import DescriptionModal from "./MedicineDescriptionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import EditableField from "./EditableField";
import { Button } from "./Button";
import AddModal from "./AddModal";
import { getMedicinesAction } from "@/app/redux/actions/medicineActions";
import { login } from "@/app/redux/actions/authActions";
import { addToCart, viewCart } from "@/app/redux/actions/cartActions";
import { addToCartReducer } from "@/app/redux/reducers/cartReducer";

function MedicineComponent({ title, role }) {
  let isPharmacist;
  role == "pharmacist" ? (isPharmacist = true) : false;
  let isAdmin;
  role == "admin" ? (isAdmin = true) : false;
  const [modalAddShow, setModalAddShow] = useState(false);
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState(null);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [name, setName] = useState({});
  const [reqbody, setReqbody] = useState("");
  const dispatch = useDispatch();
const isLoading = useSelector(
  (state) => state.addToCartReducer.loading
);
  const medicines = useSelector(
    (state) => state.getMedicinesReducer.medicines?.data
  );
  const medUses = useSelector(
    (state) => state.getMedicinesReducer.medicines?.medUses
  );

  const cart = useSelector(
    (state) => state.getCartReducer.cart
  );
 
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

  function handleCartClick(e, medicine) {
    e.stopPropagation();
    dispatch(addToCart(medicine._id, 1));
  }

  function getMedicineText(medicine) {
    const matchingCart = cart.cart.items.filter(i => i.medicine._id === medicine._id);
    if(matchingCart.length > 0) {
      const numInCart = matchingCart[0].quantity;
      return `In Cart (${numInCart})`;
    } else {
      return "Add to Cart";
    }
  }


  const [medUse, setMedUse] = useState({});

  useEffect(() => {
    dispatch(getMedicinesAction({ ...name, ...medUse }));
  }, [dispatch, name, medUse,addMedicineLoading,editMedicineLoading]);

  useEffect(() => {
    dispatch(viewCart());
    console.log("cart changed");
  }, [dispatch,isLoading]);

  return (
    <div className="m-5">
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
        <div className="">
          <select
            onChange={(e) =>
              setMedUse(
                e.target.value === ""
                  ? {}
                  : { medicinalUses: { in: e.target.value } }
              )
            }
            className="rounded form-control "
          >
            <option value="">Select Med Use</option>
            {medUses?.map((medUse, index) => (
              <option key={index} value={medUse}>
                {medUse}
              </option>
            ))}
          </select>
        </div>
      </div>
      {isPharmacist && (
        <>
          <Button
            text="Add Product"
            className="add-button m-3 mb-4"
            onClick={() => setModalAddShow(true)}
          />

          <AddModal show2={modalEditShow} show={modalAddShow} onHide={() => {setModalAddShow(false);
          setSelectedMedicine(null);
          setReqbody("");}} edit={false} reqbody={reqbody} setReqbody={setReqbody}
          />
        </>
      )}
      <div className="container-fluid ">
        <div className="row mx-4">
          {medicines?.map((medicine) => (
            <Card
              key={medicine._id}
              className="col-lg-3 offset-lg-1 my-3 bg-light mx-5 shadow"
              title={
                <div className="text-capitalize p-3 text-center">
                  {medicine.name}
                </div>
              }
              subtitle={<></>}
              onClick={() => {if(isPharmacist)
                handleCardClick(medicine)
              else false}}
              text={
                <div className="">
                  <div className="row global-text">
                    <div className="mx-auto">
                      <img
                        src={
                          medicine.imageURL
                            ? "http://localhost:8000/" + medicine.imageURL
                            : "/medication.svg"
                        }
                        alt="Image"
                        style={{ maxHeight: "200px", maxWidth: "160px" }}
                      />
                    </div>
                    <div className="text-capitalize fw-bold  pt-3 text-center">
                      Price: {medicine.price}
                    </div>
                    <div className="text-capitalize fw-bold  pt-3 text-center">
                      Description: {medicine.description}
                    </div>
                    {isPharmacist && <div className="text-capitalize fw-bold  pt-3 text-center">
                      Quantity: {medicine.quantity}
                    </div>}
                    {isPharmacist && <div className="text-capitalize fw-bold  pt-3 text-center">
                      Sales: {medicine.sales}
                    </div>}
                  </div>
                  <hr />
                </div>
              }
              buttonText={isAdmin ? false :isPharmacist ? "Edit" : cart ? getMedicineText(medicine) : "Add to Cart"}
              onClickButton={(e) => { if(!isPharmacist && !isAdmin) handleCartClick(e, medicine)
              else if(isPharmacist) handleCardClick(medicine)}}  buttonClass="col-md-12 mx-auto row"
            />
          ))}

          {selectedMedicine && (
            <AddModal show={modalEditShow} show2={modalAddShow} onHide={() => {setModalEditShow(false);
              setReqbody("");
            setSelectedMedicine(null);
          }} edit={true} medicine={selectedMedicine} reqbody={reqbody} setReqbody={setReqbody}/>
          )
          }
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

module.exports = {
  MedicineComponent,
};
