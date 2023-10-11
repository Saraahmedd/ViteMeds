"use client"
const { default: Box } = require("./Box");
import "./Box.css"
import Link from 'next/link'
import AdminNavbar from "./pharmacistapps/AdminNavbar";

export default function AdminHomePage(){
return(
  <>
  <AdminNavbar></AdminNavbar>
   <div className="d-lg-flex justify-content-center align-items-center min-vh-100">
   <Box head="Pharmacists" link="http://localhost:3000/admin/pharmacists"></Box>
    <Box head="Admins"link="http://localhost:3000/admin/admins"></Box>
    <Box head="Patients" link="http://localhost:3000/admin/patients"></Box>
    <Box head="Pharmacist Applications" link="http://localhost:3000/admin/pharmacistapps"></Box>
    <Box head="Medicines" link="http://localhost:3000/admin/medicines"></Box>
    </div>
      
      </>
)}