"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, registerAction } from '../redux/actions/authActions';
import { removeUser } from '../redux/actions/userActions';
import { addMedicine, editMedicine, deleteMedicine, getMedicineById, getMedicinesAction } from '../redux/actions/medicineActions';
import { viewPatients, viewPatient } from '../redux/actions/patientActions';
import { getPharmacists, getPharmacist } from '../redux/actions/pharmacistActions'
const Testing = () => {
  const dispatch = useDispatch();

  // const selector = useSelector(state => state.authReducer)
  // const selector = useSelector(state => state.patientReducer)
  const selector = useSelector(state => state.pharmacistReducer)
  // const selector = useSelector(state => state.medicineReducer)



  useEffect(() => {

    // dispatch(login({
    //   email: "amir",
    //   password: "password123"
    // }))
    // dispatch(login("sysAdmin", "pass1234"))

    //   name: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     trim: true,
    //     maxlength: [40, 'A medicine name must have less or equal then 40 characters'],
    //     minlength: [10, 'A medicine name must have more or equal then 10 characters'],
    // },

    // description: {
    //     type: String,
    //     required: [true, 'A medicine must have a description'],
    // },
    // price: {
    //     type: Number,
    //     required: [true, 'A medicine must have a price'],
    // },
    // quantity: {
    //     type: Number,
    //     required: [true, 'A medicine must have a quantity'],
    // },
    // sales: {
    //     type: Number,
    //     default: 0,
    //  },
    // expiryDate: {
    //     type: Date,
    //     required: [true, 'A medicine must have a expiry date'],
    // },
    // medicinalUses: {
    //     type: [String],
    //     required: [true, 'A medicine must have a medicinal use'],

    // },

    // medicineIngredients: {
    //     type: [String],
    //     required: [true, 'A medicine must have medicinal ingredients'],
    // }
    // dispatch(addMedicine({
    //   "name": "eklngwkenaglrnmgrjng4",
    //   "description": "test",
    //   "price": 100,
    //   "quantity": 100,
    //   "expiryDate": "2021-07-21T00:00:00.000Z",
    //   "medicinalUses": [
    //     "test"
    //   ],
    //   "medicineIngredients": [
    //     "test"
    //   ]

    // }))
    // dispatch(editMedicine("60f6b0c6f4d7b5b8e0f5b7f6", {
    //   "name": "test",
    //   "description": "test",
    //   "price": 100,
    // }))
    // dispatch(deleteMedicine("60f6b0c6f4d7b5b8e0f5b7f6"))
    // dispatch(getMedicineById("60f6b0c6f4d7b5b8e0f5b7f6"))
    // dispatch(getMedicinesAction({}))
    // dispatch(viewPatients())
    // dispatch(viewPatient("60f6b0c6f4d7b5b8e0f5b7f6"))
    // dispatch(getMedicinesAction({}))
    // dispatch(getPharmacists())
    dispatch(getPharmacist("60f6b0c6f4d7b5b8e0f5b7f6"))


  }


    , [dispatch])



  return (

    <div>
      {/* <h1 dr={selector}>Testing</h1> */}

      <h1 >

      </h1>



    </div>
  )
}

export default Testing