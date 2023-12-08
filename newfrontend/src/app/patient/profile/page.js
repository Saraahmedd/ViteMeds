"use client";
import React from "react";
import TableComponent from "@/components/Table";
import ProfilePicture from "@/components/ProfilePicture";
import MinifiedUserCard from "@/components/MinifiedUserCard";

// EXAMPLE USAGE

const columns = ["Transaction ID", "User", "Item", "Status", "Amount", "Link"];
const fields = ["transactionID", "user", "item", "status", "amount", "link"];
const badgeColumns = ["status"];
const buttons = [
  { size: "xs", variant: "secondary", color: "gray", label: "See details" },
];
const transactions = [
  {
    transactionID: "#123456",
    user: "Lena Mayer",
    item: "Under Armour Shorts",
    status: "Ready for dispatch",
    amount: "$ 49.90",
    link: "#",
  },
  {
    transactionID: "#999999",
    user: "John Doe",
    item: "Test Item",
    status: "Shipped",
    amount: "$ 99.99",
    link: "#",
  },
];

function Profile() {
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
              Welcome Back Yassin!
            </h1>
            <p className="mb-6 text-white-600">
              Here's an overview of your monthly transactions.
            </p>
          </div>
        </div>
        <br />

        <div className="flex flex-wrap gap-x-4 gap-y-8">
          <div className="prof h-96 w-3/5 rounded-xl p-10"></div>
          <div className="prof h-96 w-[35rem] rounded-xl p-10"></div>
          <TableComponent
            columns={columns}
            fields={fields}
            rows={transactions}
            badgeColumns={badgeColumns}
            buttons={buttons}
          />
        </div>
      </main>
    </div>
  );
}

export default Profile;
