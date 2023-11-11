"use client"
import React, { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/app/redux/actions/userActions';
import { getPharmacists } from '@/app/redux/actions/pharmacistActions';
import Image from 'next/image';


export default function DoctorApps() {
  const dispatch=useDispatch();
  const doctors=useSelector(state=>state.getPharmacistsReducer.pharmacists);
  const isLoading=useSelector(state=>state.removeUserReducer.loading)
  useEffect(()=>{
    dispatch(getPharmacists());
    

  },[isLoading])

  const button = <div style={{fontSize: '1px', }}>
  <Button text='Approve' variant='xs' ></Button>
  <Button text='Reject' variant='xs'></Button>
  </div>

  const onRemoveHandler = (id)=>{
    dispatch(removeUser(id))
  }
    
  function formatDateToDDMMYYYY(isoDate) {
    const date = new Date(isoDate);      
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}
 
  return (
    <>
    <h3 className='my-1 mt-0 text-center text-title'>Applications</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="justify-content-center align-items-center min-vh-100 mx-auto ">
      <div className='row'>
      {doctors?.data?.map((person)=>{
        if(person.isApproved)
        return
        return <div className="mx-auto col-md-6">
          <Card key={person.username} className="col-lg-8 mx-auto offset-lg-1 my-4 bg-light" title={<div className='text-capitalize ps-3'>{person.name}</div>} >
       {/* {button} */}
       <div className="p-3">
       <div className="row global-text">
            <div>
            <Image src='/mail-dark.svg' height={20} width={20} className="me-2"/> {person.email}
            </div>
          </div>
          <div className="row my-2">
          <div className='col-md-6'>
            <Image src='/username.svg' height={20} width={20} className="me-2"/> {person.user?.username}
          <br />
          </div>
          <div className='col-md-6'>
            <Image src='/birthday.svg' height={20} width={20} className="me-2"/>{formatDateToDDMMYYYY(person.dateOfBirth)}
          <br />
          </div>
          </div>
          <div className="row global-text mb-1">
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Affiliation: </h8>{person.affiliation}
            <br />
          </div>
          <div className="col-md-6">
            <h8 style={{ fontWeight: 'bold' }}>Hourly Rate: </h8>{person.hourlyRate}
            <br />
          </div>
          </div>
          <h8 style={{ fontWeight: 'bold' }}>educationalBackground: </h8>{person.educationalBackground}
          <br />
          </div>
        </Card>
        </div>
       
      })
       }
       </div>
    </div>
    </>
  );
}
