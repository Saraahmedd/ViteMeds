"use client";
import React, { useEffect } from "react";
import { MedicineComponent } from "../../../../components/MedicineComponent";
import { login } from "@/app/redux/actions/authActions";

function MedicineList() {
  return (
    <div className="m-5">
      <MedicineComponent title="XPharmacy Medicine" role="patient" />
      {/* <Footer/> */}
    </div>
  );
}

export default MedicineList;
