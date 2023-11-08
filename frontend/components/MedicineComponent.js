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

function MedicineComponent({ title, role }) {
  let isPharmacist;
  role == "pharmacist" ? (isPharmacist = true) : false;
  const [modalAddShow, setModalAddShow] = useState(false);
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState(null);
  const [modalDescShow, setModalDescShow] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [name, setName] = useState({});
  const dispatch = useDispatch();
  const medicines = useSelector(
    (state) => state.getMedicinesReducer.medicines?.data
  );
  const medUses = useSelector(
    (state) => state.getMedicinesReducer.medicines?.medUses
  );

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setModalDescShow(true);
  };
  const handleMedicinalUseChange = (event) => {
    setSelectedMedicinalUse(event.target.value);
  };

  const [medUse, setMedUse] = useState({});

  useEffect(() => {
    dispatch(getMedicinesAction({ ...name, ...medUse }));
  }, [dispatch, name, medUse]);

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

          <AddModal show={modalAddShow} onHide={() => setModalAddShow(false)} />
        </>
      )}
      <div className="container-fluid ">
        <div className="row mx-4">
          {medicines?.map((medicine) => (
            <Card
              key={medicine.id}
              className="col-lg-2 offset-lg-1 my-3 bg-light mx-5 shadow"
              title={
                <div className="text-capitalize p-3 text-center">
                  {medicine.name}
                </div>
              }
              subtitle={<></>}
              text={
                <div className="">
                  <div className="row global-text">
                    <div className="mx-auto">
                      <img
                        src={
                          medicine.imageURL
                            ? medicine.imageURL
                            : "/medication.svg"
                        }
                        alt="Image"
                        style={{ maxHeight: "200px", maxWidth: "160px" }}
                      />
                    </div>
                    <div className="text-capitalize fw-bold  pt-4 text-center">
                      Price: {medicine.price}
                    </div>
                  </div>
                </div>
              }
              buttonText="Details"
              onClickButton={() => handleCardClick(medicine)}
            />
          ))}

          {selectedMedicine && (
            <DescriptionModal
              show={modalDescShow}
              onHide={() => setModalDescShow(false)}
              // onEdit={handleEdit}
              header={selectedMedicine.name}
              subheader={""}
              text={
                <div className="p-4">
                  <div className="info-container d-flex align-items">
                    <span className="">
                      Price: {isPharmacist || selectedMedicine.price}
                    </span>
                  </div>
                  {isPharmacist && (
                    <EditableField
                      value={selectedMedicine.price}
                      id={selectedMedicine._id}
                      nameOfField={"price"}
                      hide={() => setModalDescShow(false)}
                      edit={true}
                      onSave={(newValue) => handleSave(newValue, "price")}
                    />
                  )}
                  {isPharmacist && (
                    <>
                      <div className="info-container d-flex align-items">
                        <span className="">Quantity: </span>
                      </div>

                      <EditableField
                        id={selectedMedicine._id}
                        value={selectedMedicine.quantity}
                        nameOfField={"quantity"}
                        hide={() => setModalDescShow(false)}
                        edit={true}
                        onSave={(newValue) => handleSave(newValue, "quantity")}
                      />
                    </>
                  )}

                  <div className="info-container d-flex align-items">
                    <span className="">
                      Description:{" "}
                      {isPharmacist || selectedMedicine.description}
                    </span>
                  </div>
                  {isPharmacist && (
                    <EditableField
                      id={selectedMedicine._id}
                      hide={() => setModalDescShow(false)}
                      nameOfField={"description"}
                      edit={false}
                      value={selectedMedicine.description}
                      onSave={(newValue) => handleSave(newValue, "description")}
                    />
                  )}

                  <div className="info-container d-flex align-items">
                    <span className="">
                      Medicinal Uses:{" "}
                      {isPharmacist ||
                        selectedMedicine.medicinalUses.join(", ")}
                    </span>
                  </div>
                  {isPharmacist && (
                    <EditableField
                      id={selectedMedicine._id}
                      hide={() => setModalDescShow(false)}
                      value={selectedMedicine.medicinalUses.join(", ")}
                      nameOfField={"medicinalUses"}
                      edit={false}
                      onSave={(newValue) =>
                        handleSave(
                          newValue.split(",").map((item) => item.trim()),
                          "medicinalUses"
                        )
                      }
                    />
                  )}
                  {isPharmacist && (
                    <>
                      <div className="info-container d-flex align-items">
                        <span className="">Medicine Ingredients: </span>
                      </div>

                      <EditableField
                        id={selectedMedicine._id}
                        nameOfField={"medicineIngredients"}
                        hide={() => setModalDescShow(false)}
                        edit={true}
                        value={selectedMedicine.medicineIngredients.join(", ")}
                        onSave={(newValue) =>
                          handleSave(
                            newValue.split(",").map((item) => item.trim()),
                            "medicineIngredients"
                          )
                        }
                      />
                    </>
                  )}
                </div>
              }
              image={
                <img
                  className="me-5"
                  src={
                    selectedMedicine?.imageURL
                      ? selectedMedicine.imageURL
                      : "/medication.svg"
                  }
                  alt="Image"
                  style={{
                    float: "right",
                    marginLeft: "0px",

                    maxHeight: "200px",
                    maxWidth: "150px",
                  }}
                />
              }
            />
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
