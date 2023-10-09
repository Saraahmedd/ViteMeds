"use client"
import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login, registerAction } from '../redux/actions/authActions';
import { removeUser } from '../redux/actions/userActions';
import { getMedicinesAction } from '../redux/actions/medicineActions'; 

const Home = () => {
   const dispatch = useDispatch();
  
  //  dispatch(login("sysadmin2","pass1234"))
  // dispatch(removeUser("6522d0b78e58385b58067e10"))
 
  const selector = useSelector(state => state.getMedicinesReducer.medicines)
 

  useEffect(() => {
    dispatch(getMedicinesAction({page: 1, limit: 3,sort: "price", price: {gte: 8.00}}))
    console.log(selector)
  }, [dispatch])
  



  return (
    <div>
    <h1>Medicines List</h1>
    <ul>
      {selector?.data?.map((medicine, index) => (
        <li key={index}>{medicine.name}</li>
      ))}
    </ul>
  </div>
  )
}

export default Home