"use client";
import React, { useEffect } from "react";
import { MedicineComponent } from "../../../../components/MedicineComponent";
function MedicineList() {
  return (
    <div className="m-5">
      <MedicineComponent title="XPharmacy Medicine" role="admin" />
      {/* <Footer/> */}
    </div>
  );
}

export default MedicineList;
