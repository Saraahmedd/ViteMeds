"use client";
import React from "react";
import TableComponent from "@/components/Table";
import PersonalCard from "@/components/PersonCard";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import {
  getTotalSales,
  getFilteredOrders,
} from "@/app/redux/actions/orderActions";

import { useDispatch, useSelector } from "react-redux";
import { BottomCallout } from "@/components/BottomCallout";
import {
  Badge,
  Button,
  Card,
  DateRangePicker,
  Select,
  SelectItem,
  Subtitle,
  Title,
} from "@tremor/react";
import { Modal } from "@tremor/react";
import { viewOrderDetails } from "@/app/redux/actions/orderActions";
import { getMedicinesAction } from "@/app/redux/actions/medicineActions";

// EXAMPLE USAGE

const columns = [
  "Order ID",
  "Payment Method",
  "Total Price",
  "Created At",
  "Status",
  "Is Paid",
];
const fields = [
  "_id",
  "paymentMethod",
  "totalPrice",
  "createdAt",
  "status",
  "isPaid",
];
const badgeColumns = ["status"];
const buttons = [
  { size: "xs", variant: "secondary", label: "See details" },
];
function SalesReport() {
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
  const medicines = useSelector(
    (state) => state.getMedicinesReducer.medicines?.data
  );
  const options = medicines
    ? medicines.map((medicine) => ({
        value: medicine._id,
        label: medicine.name,
      }))
    : [];
  const Sales = useSelector(
    (state) => state.getFilteredOrdersReducer?.filteredOrders
  );
  const orders = Sales?.orders;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const handleViewDetails = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [date, setDate] = useState("");
  useEffect(() => {
    dispatch(getFilteredOrders(selectedMedicine, date.from, date.to));
    dispatch(getMedicinesAction({}));
  }, [dispatch, selectedMedicine, date]);

  return (
    <div>
    <div className="flex overflow-hidden gap-x-4 gap-y-8">
      <div className={`prof h-400 overflow-hidden w-${selectedOrder ? '4/6' : 'full'} rounded-xl p-10`}>
        <div className="w-full flex flex-row gap-4 py-5 my-5">
          <DateRangePicker value={date} onValueChange={setDate} />
          <Select
            value={selectedMedicine}
            onValueChange={setSelectedMedicine}
          >
            {medicines?.map((medicine) => (
              <SelectItem key={medicine._id} value={medicine._id}>
                {medicine.name}
              </SelectItem>
            ))}
          </Select>
        </div>
        {orders ? (
          <TableComponent
            title="Sales Report"
            columns={columns}
            fields={fields}
            children={<>
            <Badge>Total Sales: {Sales.totalSales} USD</Badge>
            <Badge> Profit: {Sales.totalProfit}  USD</Badge>
            <Badge> Expenses: {Sales.totalExpenses}  USD</Badge>
            </>}
            rows={orders?.map((order) => ({
              _id: order._id,
              status: order.status,
              paymentMethod: order.paymentMethod,
              totalPrice: order.totalPrice,
              createdAt: formatDate(order.createdAt),
              isPaid: order.isPaid ? "Paid" : "Not Paid",
            }))}
            badgeColumns={badgeColumns}
            buttons={[
              {
                size: "xs",
                variant: "secondary",
                label: "See details",
                function: (id) => handleViewDetails(id),
              },
            ]}
          />
        ) : null}
      </div>
      {selectedOrder && (
        <div className="prof h-400 overflow-hidden w-3/6 rounded-xl p-10">
          <Card>
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
                      <p className="text-2xl font-semibold text-white-900">{selectedOrder?.totalPrice}<span className="text-xs font-normal text-white-400">USD</span> </p>
                    </div>

                    <div className="mt-6 text-center">

                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Card>
        </div>
      )}
    </div>
  </div>
);
}

export default SalesReport;
