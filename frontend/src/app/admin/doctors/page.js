"use client"
import React, { useEffect } from 'react';

import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';
import {getDoctorsForPatientAction} from '../../redux/actions/doctorActions'
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../../redux/actions/authActions'
import { removeUser } from '@/app/redux/actions/userActions';

export default function Doctors() {
  
    const dispatch=useDispatch();
    const doctors=useSelector(state=>state.getDrsForPatientsReducer.doctors);
    const isLoading=useSelector(state=>state.removeUserReducer.loading)
    useEffect(()=>{
     // dispatch(login("sysadmin","pass1234"));
      dispatch(getDoctorsForPatientAction());
      

    },[isLoading])

    const button = <div style={{
        fontSize: '1px', 
      }}>
    <Button text='Approve' variant='xs' ></Button>
    <Button text='Reject' variant='xs'
  ></Button>
    </div>

    const onRemoveHandler = (id)=>{
      //console.log(id)
      dispatch(removeUser(id))

    }
    


  return (
    <>
    <AdminNavbar/>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {doctors?.data?.map((person)=>{
        if(!person.isApproved)
        return
        return  <Card key={person.user} className="col-lg-4 offset-lg-1" title={person.name} subtitle="Doctor's Info"  text={
          <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.username}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>email: </h8>{person.email}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>dob: </h8>{person.dob}
          <br />
          <h8 style={{ fontWeight: 'bold' }}> affiliation: </h8>{person.affiliation}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>hourlyRate: </h8>{person.hourlyRate}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>educationalBackground: </h8>{person.educationalBackground}
          <br />
          </div>
        } buttonText='Remove' onClickButton={()=>{onRemoveHandler(person.user)}}>
       
        </Card>
       
      })
       }
       </div>
    </div>
    </>
  );
}
