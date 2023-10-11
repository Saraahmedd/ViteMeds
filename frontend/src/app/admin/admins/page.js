"use client"
import React, { useEffect, useMemo, useState } from 'react';
import {DoctorAppsTable} from '../doctorapps/DoctorAppsTable'
import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';
import CenteredModalAdmin from './CenteredModalAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, removeUser } from '@/app/redux/actions/userActions';
import { login } from '@/app/redux/actions/authActions';



export default function Admins() {
  

    
  const tableHeaders = ['Username','Password'];
  const [modalShow,setModalShow]=useState(false);
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const admins = useSelector(state=>state.getUsersReducer.user)
   const CreateisLoading = useSelector(state=>state.registerReducer.loading)
  const RemoveisLoading = useSelector(state=>state.removeUserReducer.loading)
  // const UpdateisLoading = useSelector(state=>state.updateHealthPackageReducer.loading)

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
      return admins.data.map((value) => (
        
       value.role==='administrator' ? {
        
        username: value.username, 
        password: value.password,
        button: generateButton(value._id)
      
      }  : {
        
        
      
      }));
    }
    return [];
  }, [admins,modalShow,RemoveisLoading]);
  
  useEffect(()=>{
    
    dispatch(login("sysadmin","pass1234"));
    
    dispatch(getAllUsers());
    
    }
  

  ,[dispatch,modalShow,CreateisLoading,RemoveisLoading])
 

    
    
  

  return (
    <>
    <AdminNavbar/>
    
   
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <Button text='Add Admin' onClick={()=>{setModalShow(true)}}></Button>
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
