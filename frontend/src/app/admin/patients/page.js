"use client";
import React, { useEffect } from "react";
import { Card } from "../../../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { viewPatients } from "@/app/redux/actions/patientActions";
import { removeUser } from "@/app/redux/actions/userActions";
// import { Button } from '../../../../components/Button';
// import Table from '../../../../components/Table';
import { Table, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";

export default function Patients() {
  const dispatch = useDispatch();

  const tableHeaders = [
    "name",
    "username",
    "email",
    "birth date",
    "gender",
    "phone",
    "emergency contact",
    "emergency number",
    "emergency relation",
    "actions",
  ]; // Add a new column header

  const patients = useSelector((state) => state.viewPatientsReducer.patients);
  const isLoading = useSelector((state) => state.removeUserReducer.loading);

  useEffect(() => {
    dispatch(viewPatients());
  }, [dispatch, isLoading]);

  const onRemoveHandler = (id) => {
    console.log(id);
    dispatch(removeUser(id));
  };

  const generateButton = (id) => {
    return (
      <Button
        variant="xs"
        className="btn btn-light rounded-circle"
        onClick={() => onRemoveHandler(id)}
      >
        <Image
          src="/delete.svg"
          height={20}
          width={20}
          className="rounded-circle"
        />
      </Button>
    );
  };

  let tabledata = patients?.data?.map((item) => {
    const { emergencyContact, user, ...rest } = item;
    rest.dateOfBirth = formatDateToDDMMYYYY(rest.dateOfBirth);
    rest.username = item?.user.username;
    rest.emergencyContactName = emergencyContact.fullName;
    rest.emergencyContactNumber = emergencyContact.mobileNumber;
    rest.emergencyContactRelation = emergencyContact.relationToPatient;
    rest.button = generateButton(user._id);
    return rest;
  });

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <h3 className="my-1 mt-0 text-center text-title">Patients</h3>
      <div className="underline-Bold mx-auto mb-5"></div>
      <div className="justify-content-center align-items-center min-vh-100">
        <div className="row mx-auto">
          <Table
            striped
            bordered
            hover
            className="table table-striped table-bordered table-hover m-3"
          >
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabledata?.map((rowData, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{rowData.name}</td>
                  <td>{rowData.username}</td>
                  <td>{rowData.email}</td>
                  <td>{rowData.dateOfBirth}</td>
                  <td>{rowData.gender}</td>
                  <td>{rowData.mobileNumber}</td>
                  <td>{rowData.emergencyContactName}</td>
                  <td>{rowData.emergencyContactNumber}</td>
                  <td>{rowData.emergencyContactRelation}</td>
                  <td>{rowData.button}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
