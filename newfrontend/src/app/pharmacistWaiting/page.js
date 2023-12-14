'use client'

import React, { useState, useEffect } from 'react';


const ContractPage = () => {

    const userInfo = JSON.parse(localStorage.getItem("userInfo")).data.user;

    useEffect(() => {
        const userInfo = JSON.parse(localStorage?.getItem("userInfo")).data.user;
        if (userInfo.data.isApproved) {
          url = "/pharmacist/profile" ;
          setTimeout(() => {
            window.history.pushState({},"",url)
            window.location.reload()
          }, 1000);
        }
      }, [userInfo.pharmacist?.isApproved]);

  return (
    <div>
        <div className="text-center my-10 py-10">
        <h1 style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "2px",
                fontWeight: "bold",
            }} className="text-blue-500 text-center font-bold mt-5">Awaiting Review</h1>
        <h1>Your application is currently under review</h1>
        <div className='flex justify-center items-center my-4'><hr className='w-1/2'/></div>
        <h5 className='font-semibold my-3'>Thank you for your patience, we will get back to you soon.</h5>
        </div>
    </div>

  );
};

export default ContractPage;
