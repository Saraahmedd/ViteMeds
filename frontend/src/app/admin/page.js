"use client"
const { default: Box } = require("./Box");
import "./Box.css"
import Link from 'next/link'
import AdminNavbar from "./doctorapps/AdminNavbar";

export default function AdminHomePage(){
return(
  <>
  <AdminNavbar></AdminNavbar>
   <div className="d-lg-flex justify-content-center align-items-center min-vh-100">
   <Box head="Doctors" link="http://localhost:3000/admin/doctors"></Box>
    <Box head="Admins"link="http://localhost:3000/admin/admins"></Box>
    <Box head="Patients" link="http://localhost:3000/admin/patients"></Box>
    <Box head="Doctor Applications" link="http://localhost:3000/admin/doctorapps"></Box>
    <Box head="Health Packages" link="http://localhost:3000/admin/healthpackages"></Box>
    </div>
      
      </>
)}