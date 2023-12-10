"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "@/components/ChangePassword";
import { Button } from "@tremor/react";
import { TextInput } from "@tremor/react";



// EXAMPLE USAGE


function Profile() {

  
  const dispatch = useDispatch();
  
  const pharmacist = JSON.parse(localStorage.getItem("userInfo")).data.user
    .data;






  return (
    <div className="h-full overflow-hidden pl-10">
      <main
        id="dashboard-main"
        className="h-[calc(100vh-10rem)] overflow-auto px-4 py-10"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <div>
            <ProfilePicture
              src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=826&t=st=1701985608~exp=1701986208~hmac=a251fffe7681073919cbd4f67698f31bfb8d2eab7041e13e952e15e751e4c535"
              size="90"
            ></ProfilePicture>
          </div>
          <div>
            <br />
            <h1 className="text-2xl font-black text-white-800 slide-in-right">
              Welcome Back {pharmacist?.name}!
            </h1>
          </div>
        </div>
        <br />

        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <div className="flex prof w-3/5 rounded-xl p-10">
            <div>
                <div className="flex mt-[2rem]">
                <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.name}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/email.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.email}</p>
                </div>
                <div className="flex mt-5">
                  <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.dateOfBirth}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/mobile.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.phoneNumber}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/wallet.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.user.wallet}$</p>
                </div>
              </div>
            <div>
            <div className="ml-[8rem] inline-block h-[270px] min-h-[1em] mt-5 w-0.5 self-stretch bg-purple-100 opacity-100 dark:opacity-50"></div>
            </div>

            <div>
            <h1 className="ml-[6rem] mt-[2rem] text-3xl text-white-400">Employment</h1>
            <div className="flex mt-[3rem] ml-[7.5rem]">
            <Image src="/hospital.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.affiliation}</p>
            </div>
            <div className="flex mt-5 ml-[7.5rem]">
            <Image src="/salary.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.salary}</p>
            </div>
            <div className="flex mt-5 ml-[7.5rem]">
            <Image src="/hourly.svg" height={25} width={25}></Image> <p className="ml-3 text-2xl">{pharmacist?.hourlyRate}</p>
            </div>
            </div>
            
          </div>
          <div>
          <ChangePassword></ChangePassword>
          </div>
      <div>
    </div>

         
        </div>
      </main>
    </div>
  );
}

export default Profile;

