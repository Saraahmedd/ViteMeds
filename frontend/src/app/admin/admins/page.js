"use client"
import React, { useEffect, useMemo, useState } from 'react';
import {DoctorAppsTable} from '../../../../components/DoctorAppsTable'
import { Button } from '../../../../components/Button';
import CenteredModalAdmin from './CenteredModalAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from '@/app/redux/actions/userActions';


export default function Admins() {
  

    
  const tableHeaders = ['Username'];
  const [modalShow,setModalShow]=useState(false);
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const admins = useSelector(state=>state.getUsersReducer.user)
  const CreateisLoading = useSelector(state=>state.registerReducer.loading)
  const RemoveisLoading = useSelector(state=>state.removeUserReducer.loading)

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text='Remove' variant='xs' onClick={() => {setId(id)
          handleRemove(id)}}></Button>
      </div>
    );
  };
  const handleRemove =(id)=>{
    dispatch(removeUser(id))
   
  } 
   const adminlist = useMemo(() => {
    if (admins && admins.data) {
      const excludedAdminId =JSON.parse(localStorage.getItem('userInfo')).data.user._id ;
  
      return admins.data
        .filter((value) => {
          return value._id !== excludedAdminId;
        })
        .map((value) => {
          if (value.role === 'administrator') {
            return {
              username: value.username,
            };
          }
          return null; 
        })
        .filter((value) => value !== null && typeof value !== 'undefined');
    }
    return [];
  }, [admins,modalShow,RemoveisLoading]);
  
  
  useEffect(()=>{    
    dispatch(getAllUsers());
    }
  ,[dispatch,modalShow,CreateisLoading,RemoveisLoading])
 

  return (
    <> 
    <h3 className='my-1 mt-0 text-center text-title'>Admins</h3>
    <div className='underline-Bold mx-auto mb-5'></div>
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <Button text='Add Admin' variant='md' className="ms-auto" onClick={()=>{setModalShow(true)}}></Button>
      <CenteredModalAdmin
        show={modalShow}
        onHide={() => setModalShow(false)} 
        //title={"Add A New Admin"}
        title={"Please Enter Username And Password"}
        />
      <DoctorAppsTable headers={tableHeaders} data={adminlist}></DoctorAppsTable>
    </div>
    </>
  );
}
