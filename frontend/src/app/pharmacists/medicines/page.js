'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import  {Card} from '../../../../components/Card'; 
import {Button} from '../../../../components/Button'; 
import  AddModal  from './PharmacistComponents/AddModal';
import  EditableField  from './PharmacistComponents/EditableField';
// import EditModal  from './MedicineModals/EditModal';

import DescriptionModal  from './PharmacistComponents/DescriptionModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicinesAction } from '@/app/redux/actions/medicineActions';
import { login } from '@/app/redux/actions/authActions';








function MedicineList() {
    const [modalAddShow, setModalAddShow] = useState(false);
    const [modalDescShow, setModalDescShow] = useState(false);
    // const [modalEditShow, setModalEditShow] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null); 
    const [name,setName] = useState({});
    const [medUse,setMedUse] = useState({});

    const dispatch = useDispatch();
    const medicines = useSelector(state => state.getMedicinesReducer.medicines?.data)
    const medUses = useSelector(state => state.getMedicinesReducer.medicines?.medUses)
 useEffect(()=> {
  dispatch(login("amir","password123"))
      dispatch(getMedicinesAction( {...name, ...medUse}))

    },[dispatch,name,medUse,modalAddShow,modalDescShow,selectedMedicine])

    const handleCardClick = (medicine) => {
      setSelectedMedicine(medicine);
      setModalDescShow(true);
    };


   
      return (
        <div>
          {/* <Navbar/> */}
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
           
           <Button text="Add Product" className="add-button"   onClick={() => setModalAddShow(true)}/>
    
           <AddModal
            show={modalAddShow}
            onHide={() => setModalAddShow(false)} 
          />

        
       
    
    
        <div className="container-fluid ">
           <div className="row">
    
           
           
          {medicines?.map((medicine) => (
            //  <div key={medicine.id} className="col-md-6 col-lg-4">
           
            <Card
            className="col-lg-4"
              key={medicine.id}
            
              title={medicine.name}
              subtitle={`Price: ${medicine.price}`}
              onClickButton={() => handleCardClick(medicine)}
              buttonText={'Details'}
             
    
            //   FOR PHARMACIST
               text={`Quantity: ${medicine.quantity} - sales: ${medicine.sales}`}
               //
              image={<img src={medicine.image}  alt="Image"  style={{ maxHeight: '150px' , maxWidth: '100px'}} />}
            />
           
           
          ))}

{selectedMedicine && (
        <DescriptionModal
          show={modalDescShow}
          onHide={() => setModalDescShow(false)}
          // onEdit={handleEdit}
          header={selectedMedicine.name}
          subheader={""}
          text={
            <div>
            <div className="info-container d-flex align-items">
              <h5>Price</h5>
            
            </div>
            <EditableField
            
              value={selectedMedicine.price}
              id={selectedMedicine._id}
              nameOfField={"price"}
              hide={() => setModalDescShow(false)}
              onSave={(newValue) => handleSave(newValue, 'price')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Quantity</h5>
            
            </div>
            <EditableField
               id={selectedMedicine._id}
              value={selectedMedicine.quantity}
              nameOfField={"quantity"}
              hide={() => setModalDescShow(false)}
              onSave={(newValue) => handleSave(newValue, 'quantity')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Description</h5>
            
            </div>
            <EditableField
             id={selectedMedicine._id}
             hide={() => setModalDescShow(false)}
             nameOfField={"description"}
             
              value={selectedMedicine.description}
              onSave={(newValue) => handleSave(newValue, 'description')}
            />
          
          
            
          
          
           
          
            <div className="info-container d-flex align-items">
              <h5>Medicinal Uses</h5>
             
            </div>
            <EditableField
              id={selectedMedicine._id}
              hide={() => setModalDescShow(false)}
              value={selectedMedicine.medicinalUses.join(', ')}
              nameOfField={"medicinalUses"}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicinalUses')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Medicine Ingredients</h5>
             
            </div>
            <EditableField
             id={selectedMedicine._id}
             nameOfField={"medicineIngredients"}
             hide={() => setModalDescShow(false)}
              
              value={selectedMedicine.medicineIngredients.join(', ')}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicineIngredients')}
            />
          </div>
          
          }
          
          image={<img src={selectedMedicine.image}  alt="Image"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
        />

        
      )}
      {/* <EditModal
      show={modalEditShow}
      onHide={() => setModalEditShow(false)}
      selectedMedicine={selectedMedicine}
      
/> */}

        </div>
        </div>
        {/* <Footer/> */}
        </div>
      );
     
    }
    
    export default MedicineList;