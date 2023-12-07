import React from "react";
import Sidebar from "./Sidebar";
import { Person, Healing, ShoppingBasket } from "@mui/icons-material";

const menuItems = [
  { text: "Profile", icon: <Person /> },
  { text: "Medicines", icon: <Healing /> },
  { text: "Cart", icon: <ShoppingBasket /> },
  // Add more menu items as needed
];

const PatientSidebar = () => {
  return <Sidebar menuItems={menuItems} />;
};

export default PatientSidebar;
