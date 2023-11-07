'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import  {Card} from '../../../../components/Card'; 
import  DescriptionModal  from './MedicineModals/DescriptionModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicinesAction } from '@/app/redux/actions/medicineActions';






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
// dispatch(login("sysadmin","pass1234"))
    dispatch(getMedicinesAction( {...name, ...medUse}))
  },[dispatch,name,medUse])

    return (
      <div>
        <div className='m-5'>
        <h1 className="row text-primary text-center"><strong> XPharmacy Medicine</strong></h1>
        <hr />
        <div className="m-3 ms-0">
      <div className="row m-2 ms-0">
      <div className="col-md-2  search-container">
        <input
          onChange={ (e)=> setName( {"name": {"regex": e.target.value }} )}
          type="text"
          placeholder="Search For Medicine"
          className="px-2 search-input input-style rounded border-primary"
        />
        </div>

        <div className="col-md-2 search-container">
          <select
            onChange={(e) => setMedUse( e.target.value ===""?{}: {"medicinalUses": {"in": e.target.value}})}
            className="px-2 search-input input-style rounded border-primary"
          >
            <option value="">Select Med Use</option>
            {medUses?.map((medUse, index) => (
              <option key={index} value={medUse}>
                {medUse}
              </option>
            ))}
          </select>
        </div>
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
  
         
            image={<img src={medicine.imageURL? medicine.imageURL : '/medication.svg'}  alt="Image"  style={{ maxHeight: '50px' , maxWidth: '50px'}} />}
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
      
      image={<img src={selectedMedicine.imageURL? selectedMedicine.imageURL : '/medication.svg'}  alt="Image"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
    />
    )}



        
      </div>
      </div>
      {/* <Footer/> */}
      </div>
    </div>

    );
   
  }
  
  export default MedicineList;