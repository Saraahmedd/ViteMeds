"use client";

import { viewCart } from "@/app/redux/actions/cartActions";
import { makeOrder } from "@/app/redux/actions/orderActions";
import {
  addAddressesAction,
  viewMyDetails,
} from "@/app/redux/actions/patientActions";
import { ProductImage } from "@/components/ProductImage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const {
  Card,
  Grid,
  TextInput,
  Select,
  SelectItem,
  Button,
} = require("@tremor/react");

function Checkout() {
  const [governorate, setGovernorate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addNewAddress, setAddNewAddress] = useState(false);
  const [address, setAddress] = useState({});

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.getCartReducer.cart?.cart);
  const patient = useSelector(
    (state) => state.viewMyDetailsReducer.patient?.patient.user
  );

  const cartItems = useSelector(
    (state) => state.getCartReducer.cart?.cart?.items
  );

  const cartLoading = useSelector((state) => state.getCartReducer.loading);
  const patientLoading = useSelector(
    (state) => state.viewMyDetailsReducer.loading
  );

  useEffect(() => {
    dispatch(viewMyDetails());
    dispatch(viewCart());
  }, []);

  if (cartLoading || patientLoading) {
    return <></>;
  }

  function submitOrder() {
    if (addNewAddress) {
      dispatch(
        makeOrder({
          newDeliveryAddress: {
            ...address,
            country: "Egypt",
          },
          paymentMethod: paymentMethod,
        })
      );
    } else {
      dispatch(
        makeOrder({
          paymentMethod: paymentMethod,
          deliveryAddress: {
            ...address,
            country: "Egypt",
          },
        })
      );
    }
  }

  return (
    <Card className="grow flex-1 flex flex-col">
      <h1 className="font-bold text-4xl">Checkout</h1>
      <Grid className="flex-1 grow mt-4" numItems={2}>
        <div className="border-r-2 border-gray-800 h-full w-full p-5">
          <h1 className="font-bold text-xl">Address & Payment</h1>
          {addNewAddress && (
            <div className="w-full mt-3">
              <label for="address" className="font-semibold text-md">
                Street Name & House Number
              </label>
              <TextInput
                onChange={(e) => {
                  setAddress((a) => {
                    return {
                      ...a,
                      streetAddress: e.target.value,
                    };
                  });
                }}
                id="address"
                className="mt-2"
                placeholder="Example: 14 Omar St."
              />

              <div className="mt-3">
                <label for="country" className="font-semibold text-md">
                  Country
                </label>
                <Select disabled value="Egypt" id="country" className="mt-2">
                  <SelectItem value="Egypt">Egypt</SelectItem>
                </Select>
              </div>

              <div className="mt-3">
                <label for="gov" className="font-semibold text-md">
                  Governorate
                </label>
                <Select
                  id="gov"
                  onValueChange={(value) =>
                    setAddress((a) => ({
                      ...a,
                      city: value,
                    }))
                  }
                  value={address.city}
                  className="mt-2"
                >
                  <SelectItem value="Alexandria">Alexandria</SelectItem>
                  <SelectItem value="Ad Daqahliyah">Ad Daqahliyah</SelectItem>
                  <SelectItem value="Red Sea">Red Sea</SelectItem>
                  <SelectItem value="Beheira">Beheira</SelectItem>
                  <SelectItem value="Faiyum">Faiyum</SelectItem>
                  <SelectItem value="Gharbiyah">Gharbiyah</SelectItem>
                  <SelectItem value="Minufiyah">Minufiyah</SelectItem>
                  <SelectItem value="Minya">Minya</SelectItem>
                  <SelectItem value="Cairo">Cairo</SelectItem>
                  <SelectItem value="Qalyubiyah">Qalyubiyah</SelectItem>
                  <SelectItem value="Luxor">Luxor</SelectItem>
                  <SelectItem value="New Valley">New Valley</SelectItem>
                  <SelectItem value="Sharqiyah">Sharqiyah</SelectItem>
                  <SelectItem value="Suez">Suez</SelectItem>
                  <SelectItem value="Aswan">Aswan</SelectItem>
                  <SelectItem value="Assiut">Assiut</SelectItem>
                  <SelectItem value="South Sinai">South Sinai</SelectItem>
                  <SelectItem value="Kafr El Sheikh">Kafr El Sheikh</SelectItem>
                  <SelectItem value="Matrouh">Matrouh</SelectItem>
                  <SelectItem value="Qena">Qena</SelectItem>
                  <SelectItem value="North Sinai">North Sinai</SelectItem>
                  <SelectItem value="Sohag">Sohag</SelectItem>
                </Select>
              </div>

              <div className="mt-3 flex flex-row gap-x-2">
                <div className="flex-1">
                  <label className="font-semibold text-md" for="district">
                    District
                  </label>
                  <TextInput
                    onChange={(e) => {
                      setAddress((a) => ({
                        ...a,
                        state: e.target.value,
                      }));
                    }}
                    id="district"
                    className="mt-2"
                    placeholder="Example: Smouha"
                  />
                </div>

                <div className="flex-1">
                  <label className="font-semibold text-md" for="zip">
                    Zip Code
                  </label>
                  <TextInput
                    onChange={(e) => {
                      setAddress((a) => ({
                        ...a,
                        zipCode: e.target.value,
                      }));
                    }}
                    id="zip"
                    className="mt-2"
                    placeholder="Example: 21646"
                  />
                </div>
              </div>

              <div
                role="button"
                onClick={() => {
                  setAddNewAddress(false);
                  setAddress({});
                }}
                className="w-100 text-end mt-2"
              >
                <p className="text-sm">Use Saved Addresses</p>
              </div>
            </div>
          )}
          {!addNewAddress && (
            <div className="mt-3 flex flex-col">
              <label className="font-semibold text-md" for="myAddresses">
                Choose from Saved Addresses
              </label>
              <Select
                value={address}
                onValueChange={setAddress}
                placeholder="Select an Address.."
                className="mt-2"
                id="myAddresses"
              >
                {patient &&
                  patient.deliveryAddress.map((address, index) => {
                    return (
                      <SelectItem value={address} key={`dlv${index}`}>
                        {address.streetAddress}, {address.city}, {address.state}{" "}
                        {address.zipCode}, {address.country}
                      </SelectItem>
                    );
                  })}
              </Select>
              <div
                role="button"
                onClick={() => {
                  setAddress({});
                  setAddNewAddress(true);
                }}
                className="flex-row flex items-center ms-auto mt-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm">Add New Address</p>
              </div>
            </div>
          )}

          <div className="mt-3">
            <label className="font-semibold text-md" for="paymentMethod">
              Payment Method
            </label>
            <div className="rounded-lg border border-gray-800 mt-2 overflow-hidden">
              <div
                onClick={() => setPaymentMethod("COD")}
                role="button"
                className={`${
                  paymentMethod === "COD" ? "bg-blue-950" : "bg-gray-900"
                } h-[4rem] p-2 flex items-center`}
              >
                Cash on Delivery (COD)
              </div>
              <div
                onClick={() => setPaymentMethod("Stripe")}
                role="button"
                className={`${
                  paymentMethod === "Stripe" ? "bg-blue-950" : "bg-gray-900"
                } border-gray-800 border-t-2 h-[4rem] p-2 flex items-center`}
              >
                Card
              </div>
              <div
                onClick={() => {
                  if (patient.wallet < cart.totalPrice) return;
                  setPaymentMethod("Wallet");
                }}
                role="button"
                className={`${
                  paymentMethod === "Wallet"
                    ? "bg-blue-950"
                    : patient.wallet < cart?.totalPrice
                    ? "bg-gray-700"
                    : "bg-gray-900"
                } border-gray-800 border-t-2 h-[4rem] p-2 flex items-center`}
              >
                <span
                  className={
                    paymentMethod === "Wallet"
                      ? "text-white"
                      : patient.wallet < cart?.totalPrice && `text-gray-800`
                  }
                >
                  Wallet (Available Balance: {patient && patient.wallet} USD)
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-l-1 border-gray-800 h-full w-full p-5">
          <h1 className="font-bold text-xl">Cart Summary</h1>
          <div className="rounded-lg border border-gray-800 mt-2 overflow-hidden">
            {cart &&
              cart.items.map((item, index) => (
                <div
                  className={`${
                    index !== 0 ? "border-t-2" : ""
                  } bg-gray-900 h-[8rem] px-6 py-2 flex flex-row items-center border-gray-800`}
                >
                  <div className="w-[4rem] h-full">
                    <ProductImage
                      className="h-full"
                      url={`http://localhost:8080/${item.medicine.imageURL}`}
                    />
                  </div>
                  <div className="ml-6">
                    <h1 className="font-bold text-lg">{item.medicine.name}</h1>
                    <h1 className="font-semibold text-sm">
                      {item.quantity} x{" "}
                      {localStorage.getItem("discount")
                        ? item.currentPrice *
                          localStorage.getItem("discount") *
                          1
                        : item.currentPrice}{" "}
                      USD
                    </h1>
                  </div>
                  <div className="flex-1 grow justify-end">
                    <p className="text-end font-bold">
                      {localStorage.getItem("discount")
                        ? item.currentPrice *
                          localStorage.getItem("discount") *
                          1
                        : item.currentPrice}{" "}
                      USD
                    </p>
                  </div>
                </div>
              ))}

            <div
              className={`bg-gray-900 px-6 py-2 flex flex-row items-center border-t-2 border-gray-800`}
            >
              <p className="font-bold text-end">Total</p>
              <p className="ml-auto font-bold">
                {cart && localStorage.getItem("discount")
                  ? cart?.totalPrice.toFixed(2) *
                    localStorage.getItem("discount") *
                    1
                  : cart?.totalPrice.toFixed(2)}{" "}
                USD
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-4">
            <Button
              disabled={
                !paymentMethod ||
                !address.streetAddress ||
                !address.city ||
                !address.state ||
                !address.zipCode
              }
              onClick={submitOrder}
            >
              <span className="text-white">Complete Order</span>
            </Button>
          </div>
        </div>
      </Grid>
    </Card>
  );
}

export default Checkout;
