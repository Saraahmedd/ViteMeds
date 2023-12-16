"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import {
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import { cancelOrder, viewOrderList } from "@/app/redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "@/components/ChangePassword";
import { Button, Card, Grid } from "@tremor/react";
import { TextInput } from "@tremor/react";
import { addAddressesAction } from "@/app/redux/actions/patientActions";
import { addAddressesReducer } from "@/app/redux/reducers/patientReducer";
import { BottomCallout } from "@/components/BottomCallout";
import { Modal } from "@/components/Modal";
import { cancelOrderReducer } from "@/app/redux/reducers/orderReducer";
import { translateDate } from "@/util";
import { ProductImage } from "@/components/ProductImage";



// EXAMPLE USAGE

const columns = ["Order ID", "Status", "Payment Method", "Total Price", "Created At", "Is Paid", ""];
const fields = ["_id", "status", "paymentMethod", "totalPrice", "createdAt", "isPaid", "detailsButton"];
const badgeColumns = ["status"];
const boolean = false
const columns2 = ["Street", "City", "State", "Zip Code", "Country"];
const fields2 = ["streetAddress", "city", "state", "zipCode", "country"];
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


  const [open, setOpen] = useState(false);

  const [newAddress, setNewAddress] = useState({
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    });
    // console.log(newAddress);

    setValidationErrors({
      ...validationErrors,
      [e.target.name]: e.target.value.trim() === "" ? `${e.target.name} is required` : "",
    });
    // console.log(validationErrors);
  };

  const {
    loading: addAddressLoading,
    success: addAddressSuccess,
    error: addAddressError,
  } = useSelector((state) => state.addAddressesReducer);

  const {
    loading: cancelOrderLoading,
    success: cancelOrderSuccess,
    error: cancelOrderError,
  } = useSelector((state) => state.cancelOrderReducer);


  const [selectedTab, setSelectedTab] = useState("Orders");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    dispatch(viewMyDetails());
    dispatch(viewOrderList());
  }, [dispatch, addAddressLoading, cancelOrderLoading]);

  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleModal = () => {
    setNewAddress({
      streetAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });
    setValidationErrors({
      streetAddress: false,
      city: false,
      state: false,
      zipCode: false,
      country: false,
    });

    setModalOpen(!isModalOpen);
  };

  const [validationErrors, setValidationErrors] = useState({
    streetAddress: !newAddress.streetAddress,
    city: !newAddress.city,
    state: !newAddress.state,
    zipCode: newAddress.zipCode,
    country: !newAddress.country,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = {
      streetAddress: !newAddress.streetAddress,
      city: !newAddress.city,
      state: !newAddress.state,
      zipCode: !newAddress.zipCode,
      country: !newAddress.country,
    };

    setValidationErrors(validation);

    if (!Object.values(validation).some((error) => error)) {
      dispatch(addAddressesAction(newAddress));
      setNewAddress({
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      setTimeout(() => {
        setShow(false);
        setModalOpen(!isModalOpen);
      }, 2000);
    }
  }



  const [selectedOrder, setSelectedOrder] = useState(null);


  const [disable, setDisabled] = useState(false);

  const onConfirm = () => {
    setDisabled(true);
    dispatch(cancelOrder(cancelId))
    // console.log("success is :", cancelOrderSuccess);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 7000);
    setTimeout(() => {
      setDisabled(!disable);
      setOpen(!open);
    }, 1000);
  }


  const [cancelId, setCancelId] = useState(null);

  const handleCancel = (id) => {
    setOpen(true);
    setCancelId(id);
  }



  const [visibleFeedback, setVisibleFeedback] = useState(false);

  const [orderModal, setOrderModal] = useState(false);


  const onCancel = () => {
    setOpen(!open);
  }

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    // console.log(order);
    // console.log(order.medicines[0].medicine.name);
    setOrderModal(true);
  }



  return (
    <div className="h-full overflow-hidden pl-10">
      <main
        id="dashboard-main"
        className=" overflow-auto px-4 py-10"
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
              Welcome Back {patient?.name}!
            </h1>
          </div>
        </div>
        <br />

        <div numItems={3} className="flex flex-row gap-2">
          <Card>
            <h1 className="text-xl font-bold text-white-200">Personal Information</h1>
            <div className="flex mt-[2rem]">
              <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.name}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/email.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.email}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/birthday.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{translateDate(new Date(patient?.dateOfBirth))[0]}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/mobile.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">0{patient?.mobileNumber}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/wallet.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.user.wallet} USD</p>
            </div>
          </Card>
          <Card>
            <h1 className="text-xl font-bold text-white-200">Emergency Contact</h1>
            <div className="flex mt-5">
              <Image src="/user.svg" height={25} width={25}></Image> <p className="ml-3 text-lg">{patient?.emergencyContact.fullName}</p>
            </div>
            <div className="flex mt-5">
              <Image src="/mobile.svg" height={25} width={25} />
              <p className="ml-3 text-lg">0{patient?.emergencyContact.mobileNumber}
              </p>
            </div>
          </Card>
          <div className="">
            <ChangePassword />
          </div>
        </div>


        <Grid className="mt-2">
          <div className="w-3/5">
            <div className="flex">
              <ul className="flex flex-wrap text-sm font-semibold text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                <li className="me-2">
                  <a
                    role="button"
                    onClick={() => handleTabClick("Orders")}
                    className={`inline-block p-4 ${selectedTab === "Orders"
                      ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                      : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      }`}
                  >
                    My Orders
                  </a>
                </li>
                <li className="me-2">
                  <a
                    role="button"
                    onClick={() => handleTabClick("Addresses")}
                    className={`inline-block p-4 ${selectedTab === "Addresses"
                      ? "text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
                      : "rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      }`}
                  >
                    My Addresses
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>

            {/* Main modal */}
            {isModalOpen && (
              <Modal visible={isModalOpen} setVisible={setModalOpen}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                  {/* Modal content */}
                  {/* Modal header */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Add an Address
                  </h3>

                  {/* Modal body */}
                  <form className="mt-4">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="streetAddress"
                          className="block text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Street
                        </label>
                        <TextInput
                          type="text"
                          name="streetAddress"
                          onChange={handleChange}
                          error={validationErrors.streetAddress}
                          className="w-full px-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 mt-1"
                          placeholder="123 Shaarawy Street"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          City
                        </label>
                        <TextInput
                          type="text"
                          name="city"
                          onChange={handleChange}
                          error={validationErrors.city}
                          className="w-full px-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-1"
                          placeholder="Alexandria"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="state"
                          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          State
                        </label>
                        <TextInput
                          type="text"
                          name="state"
                          onChange={handleChange}
                          error={validationErrors.state}
                          className="w-full px-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-1"
                          placeholder="Giza"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="zipCode"
                          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Zip Code
                        </label>
                        <TextInput
                          type="number"
                          name="zipCode"
                          error={validationErrors.zipCode}
                          onChange={handleChange}
                          className="w-full px-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-1"
                          placeholder="20134"
                          required
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                        >
                          Country
                        </label>
                        <TextInput
                          type="text"
                          name="country"
                          error={validationErrors.country}
                          onChange={handleChange}
                          className="w-full px-8 py-2 rounded-lg font-semibold bg-gray-800 border border-gray-900 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400  mt-1"
                          placeholder="Egypt"
                          required
                        />
                      </div>
                    </div>
                    <Button
                      className="mt-5 tracking-wide font-semibold bg-purple-600 text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                      onClick={handleSubmit}
                      loading={addAddressLoading}
                      icon={() => (
                        <svg
                          className="me-1 -ms-1 w-5 h-5"
                          fill="white"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      )}
                    >
                      <span className="text-white">
                        Add New Address
                      </span>
                    </Button>
                  </form>
                 
                </div>
              </Modal>
            )}
          </div>

          <Modal visible={open} setVisible={setOpen}>
            <div className="p-4 md:p-5 text-center my-[5rem]">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to cancel this order?
              </h3>
              <Button
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                color="red"
                onClick={onConfirm}
                loading={cancelOrderLoading}
              >
                Yes, I'm sure
              </Button>
              <Button
                disabled={disable}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-semibold px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={onCancel}
              >
                No, cancel
              </Button>
            </div>

          </Modal>

          <Modal visible={orderModal} setVisible={setOrderModal}>
            <section className="h-6/6">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                  <div>
                    <h1 className="text-2xl font-semibold text-white-900">Your Order</h1>
                  </div>
                </div>
                <div>
                  <h4 className="my-3 flex items-center justify-center text-md text-white-400">Order ID : {selectedOrder?._id}</h4>
                </div>

                <div className="mb-5 mx-auto  max-w-md md:mt-12">
                  <div className="px-4 py-6 sm:px-8 sm:py-10">
                    <div className="flow-root">
                      <ul className="">
                        {selectedOrder?.medicines?.map((medicine) => (
                          <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 " key={medicine?._id}>
                            <div className="relative flex flex-1 flex-col justify-between">
                              <div className="sm:grid sm:grid-cols-2 my-2">
                                <div className="">
                                  <p className="text-base font-semibold text-white-900">{medicine?.medicine?.name}</p>
                                </div>

                                <p className="font-semibold text-white-900 sm:order-2 sm:text-right">
                                  {medicine?.quantity * medicine?.medicine?.price} USD <span className="ml-1 text-xs text-gray-400">({medicine?.quantity} x {medicine?.medicine?.price} USD)</span>
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-2 space-y-3 border-t border-b py-4">
                      <h4 className="my-3 text-xl font-semibold text-white-600">Delivery Address</h4>
                      <h1>{selectedOrder?.deliveryAddress?.streetAddress}, {selectedOrder?.deliveryAddress?.state}, {selectedOrder?.deliveryAddress?.city} {selectedOrder?.deliveryAddress?.zipCode}, {selectedOrder?.deliveryAddress?.country}</h1>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-semibold text-white-900">Total Price</p>
                      <p className="text-2xl font-semibold text-white-900"><span className="text-xs font-normal text-white-400">USD</span> {selectedOrder?.totalPrice}</p>
                    </div>

                    <div className="mt-6 text-center">

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Modal>

          {cancelOrderSuccess && show && (
            <BottomCallout
              message="You have successfully cancelled your order"
              variant="success"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}

          {cancelOrderError && show && (
            <BottomCallout
              message="There was an error cancelling your order"
              variant="error"
              visible={true}
              setVisible={setVisibleFeedback}
            />
          )}
 {addAddressSuccess && show && (
                    <BottomCallout
                      message="Adding Address was successful"
                      variant="success"
                      visible={true}
                      setVisible={setVisibleFeedback}
                    />
                  )}

                  {addAddressError && show && (
                    <BottomCallout
                      message="There was an error adding your new address"
                      variant="error"
                      visible={true}
                      setVisible={setVisibleFeedback}
                    />
                  )}
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
                detailsButton: (
                  <>
                    <Button
                      onClick={() => handleSelectOrder(order)}
                      className=" hover:underline focus:outline-none"
                      size="xs"
                      variant="secondary"
                      // color="gray"
                    >
                      See Details
                    </Button>
                    {order.status === "Pending" && (
                      <Button
                        onClick={() => handleCancel(order._id)}
                        className="ml-3 text-red-500 hover:underline focus:outline-none"
                        size="xs"
                        variant="secondary"
                        color="red"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </>

                ),
              }))}
              badgeColumns={badgeColumns}
            />) : (
            null
          )
          }

          {selectedTab === "Addresses" && patient ? (
            <TableComponent
              title="My Addresses"
              columns={columns2}
              fields={fields2}
              rows={
                patient?.user.deliveryAddress
                  .map((address) => ({
                    streetAddress: address.streetAddress,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode,
                    country: address.country,
                  }))
              }
              badgeColumns={badgeColumns}
            >
              <div className="ml-[1rem]">
                {selectedTab === "Addresses" ? (
                  <div role="button" onClick={handleToggleModal}>
                    <span className="">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  null
                )}
              </div>
            </TableComponent>
          ) : (
            null
          )}

        </Grid>
      </main>
    </div>
  );
}

export default Profile;
