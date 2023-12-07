"use client";

import PersonalCard from "@/components/PersonCard";
import { ProductCard } from "@/components/ProductCard";
import TableComponent from "@/components/Table";
import MembersTable from "@/components/Table";
import { Card, Grid } from "@tremor/react";

const data = {
  email: "john.doe@mail.com",
  birthdate: "Jan 1, 1990",
  username: "johndoe",
  speciality: "Marketing",
  educationalBackground: "Bachelor's in Marketing",
  affiliation: "Denva Corp",
};

const buttons = {
  right: {
    label: "Reject",
    onClick: () => console.log("Purple button clicked"),
  },
  left: {
    label: "Accept",
    onClick: () => console.log("Transparent button clicked"),
  },
};

export default function Dashboard() {
  const columns = [
    "Transaction ID",
    "User",
    "Item",
    "Status",
    "Amount",
    "Link",
  ];
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
      status: "Cancelled",
      amount: "$ 99.99",
      link: "#",
    },
  ];
  return (
    <TableComponent
      columns={columns}
      fields={fields}
      rows={transactions}
      badgeColumns={badgeColumns}
      buttons={buttons}
    />
  );
}
