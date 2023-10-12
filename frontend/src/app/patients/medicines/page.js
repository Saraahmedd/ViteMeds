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
// dispatch(login("sysadmin","pass1234"))
    dispatch(getMedicinesAction( {...name, ...medUse}))
  },[dispatch,name,medUse])
      
      





  
      return (
        <div>
       <div className="div d-flex">
        <div className="rows">
          <div className="row my-3">
          <div className="status-filter">
          {/* <span className="mr-2">Filter by medicinal use:</span> */}
        {/* <select onChange={handleMedicinalUseChange} className='col-lg-2 mx-lg-1' value={selectedMedicinalUse || ''}>
          <option value="">All</option> */}
          {/* {allMedicinalUses.map((medicinalUse) => (
              <option key={medicinalUse} value={medicinalUse}>
                {medicinalUse}
              </option>
            ))} */}
        {/* </select> */}
      </div>
        </div>
      </div>
      <div className="search-container">
        <input
          onChange={ (e)=> setName( {"name": {"regex": e.target.value }} )}
          type="text"
          placeholder="Search For Medicine"
          className="search-input"
        />
        {/* <Button text="Search"  className="search-button" onClick={() => console.log('Button clicked')} /> */}
        </div>

        <div className="search-container">
          <select
            onChange={(e) => setMedUse( e.target.value ===""?{}: {"medicinalUses": {"in": e.target.value}})}
            className="search-input"
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
  
         
            image={<img src={medicine.image}  alt="Image"  style={{ maxHeight: '150px' , maxWidth: '100px'}} />}
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
      
      image={<img src={selectedMedicine.image}  alt="Image"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
    />
    )}



        
      </div>
      </div>
      {/* <Footer/> */}
      </div>
      );
     
    }
    
    export default MedicineList;