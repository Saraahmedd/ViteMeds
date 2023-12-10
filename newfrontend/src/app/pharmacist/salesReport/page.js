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
  Button,
  Card,
  DateRangePicker,
  Select,
  SelectItem,
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
  { size: "xs", variant: "secondary", color: "purple", label: "See details" },
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
    console.log(date);
    dispatch(getFilteredOrders(selectedMedicine, date.from, date.to));
    dispatch(getMedicinesAction({}));
  }, [dispatch, selectedMedicine, date]);

  return (
    <div>
      <div className="flex overflow-hidden gap-x-4 gap-y-8">
        <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
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
                  color: "purple",
                  label: "See details",
                  function: (id) => handleViewDetails(id),
                },
              ]}
            />
          ) : null}
        </div>
        <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
          <Card>
            <h1
              style={{
                textAlign: "center",
                fontSize: "2rem",
                marginBottom: "16px",
                fontWeight: "bold",
              }}
            >
              Order Details
            </h1>
            <hr style={{ borderTop: "2px solid #333", marginBottom: "16px" }} />
            {selectedOrder && (
              <>
                <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong>Status:</strong> {selectedOrder.status}
                </p>
                <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                </p>
                <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong>Total Price:</strong> {selectedOrder.totalPrice}$
                </p>
                <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong>Created At:</strong>{" "}
                  {formatDate(selectedOrder.createdAt)}
                </p>
                {/* Add more details as needed */}
                <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong>Delivery Address:</strong>{" "}
                  {selectedOrder.deliveryAddress.country},{" "}
                  {selectedOrder.deliveryAddress.state},{" "}
                  {selectedOrder.deliveryAddress.city},{" "}
                  {selectedOrder.deliveryAddress.streetAddress},{" "}
                  {selectedOrder.deliveryAddress.zipCode}
                </p>

                {/* Medicines */}
                <div style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
                  <strong
                    style={{
                      fontSize: "1.5rem",
                      marginBottom: "5px",
                      color: "purple",
                    }}
                  >
                    Medicines:
                  </strong>
                  {selectedOrder.medicines.map((item) => {
                    console.log(item);

                    return (
                      <div key={item._id}>
                        <p style={{ marginBottom: "5px" }}>
                          <strong style={{ marginRight: "3px" }}>Name:</strong>{" "}
                          {item.medicine?.name}
                          <strong
                            style={{ marginRight: "10px", marginLeft: "30px" }}
                          >
                            Quantity:
                          </strong>{" "}
                          {item.quantity}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SalesReport;
