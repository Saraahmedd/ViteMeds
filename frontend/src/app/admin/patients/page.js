"use client"
import React, { useEffect } from 'react';

import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientActions';
import { removeUser } from '@/app/redux/actions/userActions';
// import { Button } from '../../../../components/Button';
import Button from 'react-bootstrap';
// import Table from '../../../../components/Table';
import { Table } from 'react-bootstrap';
import Image from 'react-bootstrap';



export default function Patients() {
  const dispatch=useDispatch();

  const tableHeaders = ['name','username','email','birth date','gender', 'phone', 'emergency contact','emergency number','emergency relation','actions']; // Add a new column header

  const patients=useSelector(state=>state.viewPatientsReducer.patients);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);

  useEffect(()=>{
    dispatch(viewPatients());
  },[dispatch,isLoading])

  const onRemoveHandler = (id)=>{
    dispatch(removeUser(id))
  }

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button variant='xs' className="btn btn-light rounded-circle" onClick={()=>onRemoveHandler(id)}>
          <Image src='/delete.svg' height={20} width={20} className="rounded-circle"/>
        </Button>
      </div>
    );
  };

  console.log(patients)

  let tabledata = patients?.data?.map(item => {
    const { emergencyContact ,_id ,user ,...rest } = item;
    rest.dateOfBirth = formatDateToDDMMYYYY(rest.dateOfBirth)
    rest.username = item.user.username
    rest.emergencyContactName = item.emergencyContact.fullName
    rest.emergencyContactNumber = item.emergencyContact.mobileNumber
    rest.emergencyContactRelation = item.emergencyContact.relationToPatient
    rest.button = generateButton(user?._id)
    return rest;
  })

  console.log(tabledata)
  console.log(tableHeaders)

  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }


  return (
    <>
    <h3 className='my-1 mt-0 text-center text-title'>Patients</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row mx-auto'>
      {/* {patients?.data?.map((person)=>{
        return <Card key={person.user?._id} className="col-md-4 offset-md-1 m-5" title={person.name} subtitle="Patient's Info"  text={
          <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.user?.username}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>email: </h8>{person.email}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Birth Date: </h8>{person.dateOfBirth}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Mobile number: </h8>{person.mobileNumber}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Gender: </h8>{person.gender}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Emergency Contact: </h8>{person.emergencyContact.fullName}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Emergency Number: </h8>{person.emergencyContact.mobileNumber}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Emergency Contact Relation: </h8>{person.emergencyContact.relationToPatient}
          <br />
          
          <br />
          </div>
        } buttonText='Remove' onClickButton={()=>{onRemoveHandler(person.user._id)}}>
        </Card>})} */}
        <Table striped bordered hover>
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
                    {/* <td>{rowData.button}</td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Table headers={tableHeaders} data={tabledata} className="" /> */}
       </div>
    </div>
    </>
  );
}
