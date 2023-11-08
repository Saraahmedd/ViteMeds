"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card } from "./Card";
import DescriptionModal from "./MedicineDescriptionModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getMedicinesAction } from "@/app/redux/actions/medicineActions";
import { login } from "@/app/redux/actions/authActions";

function MedicineComponent({ title }) {
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
                        style={{ maxHeight: "200px", maxWidth: "200px" }}
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
              subheader={selectedMedicine.name}
              text={
                <div>
                  <p>Price: {selectedMedicine.price}</p>
                  <p>Description: {selectedMedicine.description}</p>
                  <p>
                    Medicinal Uses: {selectedMedicine.medicinalUses.join(", ")}
                  </p>
                </div>
              }
              image={
                <img
                  src={
                    selectedMedicine.imageURL
                      ? selectedMedicine.imageURL
                      : "/medication.svg"
                  }
                  alt="Image"
                  style={{
                    float: "right",
                    marginLeft: "10px",
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
