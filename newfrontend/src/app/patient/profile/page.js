"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import {
  addAddressesAction,
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import { cancelOrder, viewOrderList } from "@/app/redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { BottomCallout } from "@/components/BottomCallout";
import ChangePassword from "@/components/ChangePassword";


// EXAMPLE USAGE

const columns = ["Order ID", "Status", "Payment Method", "Total Price", "Created At", "Is Paid"];
const fields = ["_id", "status", "paymentMethod", "totalPrice", "createdAt", "isPaid"];
const badgeColumns = ["status"];
const buttons = [
  { size: "xs", variant: "secondary", color: "gray", label: "See details" },
];



const columns2 = ["Street", "City", "State", "Zip Code", "Country"];
const fields2= ["streetAddress", "city", "state", "zipCode", "country"];
function Profile() {

  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  };
  
  const dispatch = useDispatch();
  
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient
  );
  
  const orders = useSelector(
    (state) => state.viewOrderListReducer.orders
  );


  const [selectedTab, setSelectedTab] = useState("Orders");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    dispatch(viewMyDetails());
    dispatch(viewOrderList());
  }, [dispatch]);
  


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
            <h1 className="text-2xl font-black text-white-800">
              Welcome Back {patient?.name}!
            </h1>
          </div>
        </div>
        <br />

        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <div className="flex prof h-96 w-3/5 rounded-xl p-10">
            <div>
                <div className="flex mt-[2rem]">
                <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.name}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/email.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.email}</p>
                </div>
                <div className="flex mt-5">
                  <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.dateOfBirth}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/mobile.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.mobileNumber}</p>
                </div>
                <div className="flex mt-5">
                <Image src="/wallet.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.user.wallet}</p>
                </div>
              </div>
            <div>
            <div className="ml-[8rem] inline-block h-[270px] min-h-[1em] mt-5 w-0.5 self-stretch bg-purple-100 opacity-100 dark:opacity-50"></div>
            </div>

            <div>
            <h1 className="ml-[5.5rem] mt-[3rem] text-2xl text-white-200">Emergency Contact</h1>
            <div className="flex mt-[3rem] ml-[7.5rem]">
            <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.emergencyContact.fullName}</p>
            </div>
            <div className="flex mt-5 ml-[7.5rem]">
            <Image src="/mobile.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.emergencyContact.mobileNumber}</p>
            </div>
            </div>
            
          </div>
          <div>
          <ChangePassword></ChangePassword>
          </div>
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("Orders")}
            className={`inline-block p-4 ${
              selectedTab === "Orders"
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Orders
          </a>
        </li>
        <li className="me-2">
          <a
            href="#"
            onClick={() => handleTabClick("Addresses")}
            className={`inline-block p-4 ${
              selectedTab === "Addresses"
                ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            }`}
          >
            Addresses
          </a>
        </li>
      </ul>
      {selectedTab == "Orders" && orders ? (
           <TableComponent
           title="My Orders"
           columns={columns}
           fields={fields}
           rows={orders?.map((order) => ({
             _id: order._id,
             status: order.status,
             paymentMethod: order.paymentMethod,
             totalPrice: order.totalPrice,
             createdAt: formatDate(order.createdAt),
             isPaid: order.isPaid ? "Paid" : "Not Paid",
           }))}
           badgeColumns={badgeColumns}
           buttons={buttons}
         /> ) : (
          null
         )
      }
      
      {selectedTab === "Addresses" && patient ? (
          <TableComponent
            title="My Addresses"
            columns={columns2}
            fields={fields2}
            rows={patient?.user.deliveryAddress
              .map((address) => ({
                streetAddress: address.streetAddress,
                city: address.city,
                state:address.state,
                zipCode: address.zipCode,
                country :  address.country,
                
             }))}
            badgeColumns={badgeColumns}
          />
        ) : (
          null
        )}
         
        </div>
      </main>
    </div>
  );
}

export default Profile;
