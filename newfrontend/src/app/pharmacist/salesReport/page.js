"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { getTotalSales } from "@/app/redux/actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { BottomCallout } from "@/components/BottomCallout";
import { Button } from "@tremor/react";
import { Modal } from "@tremor/react";
import {viewOrderDetails} from "@/app/redux/actions/orderActions";

// EXAMPLE USAGE

const columns = ["Order ID", "Payment Method", "Total Price", "Created At", "Status", "Is Paid"];
const fields = ["_id",  "paymentMethod", "totalPrice", "createdAt","status", "isPaid"];
const badgeColumns = ["status"];
const buttons = [
  { size: "xs", variant: "secondary", color: "purple", label: "See details" },
];
function SalesReport() {

    const formatDate = (dateString) => {
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };
    
        const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    
        return formattedDate;
        
      };
  
  const dispatch = useDispatch();
  
  const  Sales  = useSelector((state) => state.getTotalSalesReducer?.totalSales);
  const orders = Sales?.salesData;
  const totalsales = Sales?.totalSales;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);

  const handleViewDetails = (orderId) => {
     useEffect(() => {

        if (orderId) {
          dispatch(fetchOrderDetails(orderId));
        }
      }, [dispatch, orderId]);
      
    const order = useSelector((state) => state.viewOrderDetailsReducer(orderId));
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  const handleCloseOrderDetailsModal = () => {
    setShowOrderDetailsModal(false);
    setSelectedOrder(null);
  };


  useEffect(() => {
    dispatch(getTotalSales());
  }, [dispatch]);
  
console.log(orders);
console.log(selectedOrder);
  return (
    <div className="h-full overflow-hidden pl-10">
      <div className="flex flex-wrap gap-x-4 gap-y-8">

        {/* First row with three columns containing images */}
        <div className="flex flex-wrap gap-x-4 mb-8" >
          <div className="w-1/3">
            {/* Image 1 */}
            <Image src="/image1.png" width={600} height={400} style={{ backgroundColor: "transparent", marginBottom: '10px' }} />
          </div>
          <div className="w-1/3">
            {/* Image 2 */}
            <Image src="/image2.png" width={600} height={600} style={{ backgroundColor: "transparent", marginBottom: '10px' }} />
          </div>
        </div>

        {/* Second row with the table and filters */}
        <div className="w-full overflow-auto scrollbar-transparent">
          {/* Table */}
          {orders? (
            <div className="max-h-[500px]">
            <TableComponent
              title="Total Sales"
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
                onClick: (id) => handleViewDetails(id)
                }
                ]}
            />
            </div>
          ) : (
            null
          )}
        </div>
    {/* Order Details Modal */}
    {selectedOrder && (
          <div className="modal">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button onClick={handleCloseOrderDetailsModal}>Close</button>
            </div>
            <div className="modal-body">
              {/* Display order details here */}
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>Total Price:</strong> {selectedOrder.totalPrice}</p>
              <p><strong>Created At:</strong> {formatDate(selectedOrder.createdAt)}</p>

              {/* Add more details as needed */}
              <p><strong>Delivery Address:</strong></p>
              <p>{selectedOrder.deliveryAddress.country}, {selectedOrder.deliveryAddress.state}, {selectedOrder.deliveryAddress.city}, {selectedOrder.deliveryAddress.streetAddress}, {selectedOrder.deliveryAddress.zipCode}</p>

              <table className="table">
                <thead>
                  <tr>
                    <th style={{ color: 'steelblue' }}>Medicine</th>
                    <th style={{ color: 'steelblue' }}>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.medicines.map((item) => (
                    <tr key={item._id}>
                      <td>{item.medicine.name}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </div>
  </div>
  );
}

export default SalesReport;
