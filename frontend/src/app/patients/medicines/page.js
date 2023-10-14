'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import  {Card} from '../../../../components/Card'; 
import {Button} from '../../../../components/Button'; 
import  DescriptionModal  from './MedicineModals/DescriptionModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicinesAction } from '@/app/redux/actions/medicineActions';
import { login } from '@/app/redux/actions/authActions';


function MedicineList() {
  const [selectedMedicinalUse, setSelectedMedicinalUse] = useState(null);
  const [modalDescShow, setModalDescShow] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null); 
  const [name,setName] = useState({});
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.getMedicinesReducer.medicines?.data)
  const medUses = useSelector(state => state.getMedicinesReducer.medicines?.medUses)

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setModalDescShow(true);
  };
  const handleMedicinalUseChange = (event) => {
    setSelectedMedicinalUse(event.target.value); 
  };
 
  const [medUse,setMedUse] = useState({});

 
useEffect(()=> {
    dispatch(getMedicinesAction( {...name, ...medUse}))
  },[dispatch,name,medUse])
  
      return (
      <div className='m-5'>
        <h1 className="row text-primary text-center"><strong> XPharmacy Medicine</strong></h1>
        <hr />
       <div className="div d-flex m-2 ms-0">
      <div className="search-container m-2">
        <input
          onChange={ (e)=> setName( {"name": {"regex": e.target.value }} )}
          type="text"
          placeholder="Search For Medicine"
          className="px-2 search-input input-style rounded border-primary"
        />
        </div>

        <div className="search-container m-2">
          <select
            onChange={(e) => setMedUse( e.target.value ===""?{}: {"medicinalUses": {"in": e.target.value}})}
            className="px-2 search-input input-style rounded border-primary"
          >
            <option value="">All medicinal Uses</option>
            {medUses?.map((medUse, index) => (
              <option key={index} value={medUse}>
                {medUse}
              </option>
            ))}
          </select>
        </div>
        </div>
     
      <div className="container-fluid ">
         <div className="row">
        {medicines?.map((medicine) => (
          <Card
          className="col-lg-4"
            key={medicine.id}
            title={medicine.name}
            subtitle={`Price: ${medicine.price} - Description: ${medicine.description}`}
            onClickButton={() => handleCardClick(medicine)}
            buttonText={'Details'}        
            image={<img src={medicine.image? medicine.image : '/medication.svg'}  alt="Image"  style={{ maxHeight: '50px' , maxWidth: '50px'}} />}
          />
        ))}

{selectedMedicine && (
      <DescriptionModal
      show={modalDescShow}
      onHide={() => setModalDescShow(false)}
      subheader={selectedMedicine.name}
      text={
        <div>
          <p>Price: {selectedMedicine.price}</p>
          <p>Description: {selectedMedicine.description}</p>
          <p>Medicinal Uses: {selectedMedicine.medicinalUses.join(', ')}</p>
        </div>
      }
      
      image={<img src={selectedMedicine.image? selectedMedicine.image : '/medication.svg'}  alt="Image"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
    />
    )}
      </div>
      </div>
      {/* <Footer/> */}
      </div>
      );
     
    }
    
    export default MedicineList;