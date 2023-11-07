"use client"
import React, { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { Card } from '../../../../components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/app/redux/actions/userActions';
import { getPharmacists } from '@/app/redux/actions/pharmacistActions';


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
    
 
  return (
    <>
    <h3 className='my-1 mt-0 text-center text-title'>Applications</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className="justify-content-center align-items-center min-vh-100">
      <div className='row'>
      {doctors?.data?.map((person)=>{
        if(person.isApproved)
        return
        return <Card key={person.username} className="col-lg-4 offset-lg-1" title={person.name} subtitle="Application">
       {/* {button} */}
       <div className="">
          <h8 style={{ fontWeight: 'bold' }}> Username: </h8>{person.user?.username}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>email: </h8>{person.email}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>Date Of Birth: </h8>{person.dateOfBirth}
          <br />
          <h8 style={{ fontWeight: 'bold' }}> affiliation: </h8>{person.affiliation}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>hourlyRate: </h8>{person.hourlyRate}
          <br />
          <h8 style={{ fontWeight: 'bold' }}>educationalBackground: </h8>{person.educationalBackground}
          <br />
          </div>
        </Card>
       
      })
       }
       </div>
    </div>
    </>
  );
}
