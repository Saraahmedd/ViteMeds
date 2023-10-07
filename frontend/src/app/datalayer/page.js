"use client"
import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';

const Home = () => {
   const dispatch = useDispatch();
   dispatch(login("sysadmin","pass1234"))
   const selector = useSelector(state => state.loginReducer.user)
  //  console.log(selector)

  return (
    <div>home</div>
  )
}

export default Home