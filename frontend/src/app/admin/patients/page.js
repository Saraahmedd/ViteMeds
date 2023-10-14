"use client"
import React, { useEffect } from 'react';

import { Button } from '../../../../components/Button';
import AdminNavbar from '../pharmacistapps/AdminNavbar';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { viewPatients } from '@/app/redux/actions/patientActions';
import { login } from '@/app/redux/actions/authActions';
import { removeUser } from '@/app/redux/actions/userActions';



export default function Patients() {
  const dispatch=useDispatch();
  const patients=useSelector(state=>state.viewPatientsReducer.patients);
  const isLoading=useSelector(state=>state.removeUserReducer.loading);
  useEffect(()=>{
    dispatch(login("sysadmin","pass1234"));
    dispatch(viewPatients());
    

  },[dispatch,isLoading])

  const onRemoveHandler = (id)=>{
  
    dispatch(removeUser(id))

  }
  
    
 



  return (
    <>
    <AdminNavbar/>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {patients?.data?.map((person)=>{
        return <Card key={person.user} className="col-lg-4 offset-lg-1" title={person.name} subtitle="Patient's Info"  text={
          <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.user?.username}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>email: </h8>{person.email}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Date Of Birth: </h8>{person.dateOfBirth}
          <br />'
          <h8 style={{ fontWeight: 'bold' }}>mobile number: </h8>{person.mobileNumber}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>gender: </h8>{person.gender}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>emergencyContact name: </h8>{person.emergencyContact.fullName}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>emergencyContact mobile number: </h8>{person.emergencyContact.mobileNumber}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>emergencyContact relationToPatient: </h8>{person.emergencyContact.relationToPatient}
          <br />
          
          <br />
          </div>
        } buttonText='Remove' onClickButton={()=>{onRemoveHandler(person.user._id)}}>
       
        </Card>
       
      })
       }
       </div>
    </div>
    </>
  );
}
