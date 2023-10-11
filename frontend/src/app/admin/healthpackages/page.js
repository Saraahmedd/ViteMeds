"use client"
import React,{useEffect, useMemo, useState} from 'react';
import {DoctorAppsTable} from '../doctorapps/DoctorAppsTable'
import { Button } from '../../../../components/Button';
import AdminNavbar from '../doctorapps/AdminNavbar';
import { Card } from '../../../../components/Card';
import CenteredModalAddPack from './CenteredModalAddPack'
import { useDispatch, useSelector } from 'react-redux';
import { deleteHealthPackage, listHealthPackages } from '@/app/redux/actions/healthPackagesActions';
import { login } from '@/app/redux/actions/authActions';


export default function Admins() {
  const dispatch=useDispatch();
  const [id,setId]=useState(0);
  const healthpackages = useSelector(state=>state.getHealthPackagesReducer.healthPackages)
  const isLoading = useSelector(state=>state.deleteHealthPackageReducer.loading)
  const CreateisLoading = useSelector(state=>state.createHealthPackageReducer.loading)
  const UpdateisLoading = useSelector(state=>state.updateHealthPackageReducer.loading)

  const generateButton = (id) => {
    return (
      <div style={{ fontSize: '1px' }}>
        <Button text='Update' variant='xs' onClick={() => {setId(id)
          setModalShowsec(true)}}></Button>
        <Button text='Remove' variant='xs' onClick={() => handleRemove(id)}></Button>
      </div>
    );
  };
  const handleRemove =(id)=>{
    dispatch(deleteHealthPackage(id))
   
  } 
   const health = useMemo(() => {
    if (healthpackages && healthpackages.data) {
      return healthpackages.data.map((value) => ({
        name: value.name, 
        doctorDiscount: value.doctorDiscount,
        medicineDiscount: value.medicineDiscount,
        familyMemberSubDiscount: value.familyMemberSubDiscount,
        price: value.price,
        button: generateButton(value._id)
      }));
    }
    return [];
  }, [healthpackages,isLoading,modalShow,modalShowsec,CreateisLoading,UpdateisLoading]);
  
  useEffect(()=>{
    
    dispatch(login("sysadmin","pass1234"));
    
    dispatch(listHealthPackages());
    
    }
  

  ,[dispatch,isLoading,modalShow,modalShowsec,CreateisLoading,UpdateisLoading])
 

    
    
  const tableHeaders = ['Package Name','Doctor Session Discount','Medicine Discount','Subscriptions Discount','Price'];
  const [modalShow,setModalShow]=useState(false);
  const [modalShowsec,setModalShowsec]=useState(false);


  return (
    <>
    <AdminNavbar/>
    
   
    <div className=" justify-content-center align-items-center min-vh-100 container">
      <Button text='Add Package' onClick={()=>{setModalShow(true)}}></Button>
      <DoctorAppsTable headers={tableHeaders} data={health ? health : []}></DoctorAppsTable>
      <CenteredModalAddPack
        show={modalShow}
        onHide={() => setModalShow(false)} 
        //title={"Add A New Admin"}
        title={"Please Package Details"}
        edit={false}
        id={id}
        />
         <CenteredModalAddPack
        show={modalShowsec}
        onHide={() => setModalShowsec(false)} 
        //title={"Add A New Admin"}
        title={"Please Update Package Details"}
        edit={true}
        id={id}
        />
    
    </div>
    </>
  );
}
