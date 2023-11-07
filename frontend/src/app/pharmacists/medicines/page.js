'use client'
import React, { useEffect } from 'react';
import {useState} from 'react' ;
import  {Card} from '../../../../components/Card'; 
import {Button} from '../../../../components/Button'; 
import  AddModal  from '../../../../components/AddModal';
import  EditableField  from '../../../../components/EditableField';

// import EditModal  from './MedicineModals/EditModal';

import DescriptionModal  from '../../../../components/PharmacistMedicineModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getMedicinesAction } from '@/app/redux/actions/medicineActions';

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
    const {loading } = useSelector(state => state.addMedicineReducer)
    const {loading: loading2 } = useSelector(state => state.editMedicineReducer)
 useEffect(()=> {
  // dispatch(login("amir","password123"))
      dispatch(getMedicinesAction( {...name, ...medUse}))

    },[dispatch,name,medUse,modalAddShow,modalDescShow,selectedMedicine,loading, loading2])

    const handleCardClick = (medicine) => {
      setSelectedMedicine(medicine);
      setModalDescShow(true);
    };


   
      return (
        <div className='m-5'>
        <h1 className="row text-primary text-center"><strong> XPharmacy Medicine</strong></h1>
        <hr />
        <div className="row div d-flex m-2 ms-0">
        <div className="col-md-2 search-container">
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
            <option value="">All medicinal Uses</option>
            {medUses?.map((medUse, index) => (
              <option key={index} value={medUse}>
                {medUse}
              </option>
            ))}
          </select>
        </div>
        </div>
           
           <Button text="Add Product" className="add-button m-3 mb-4"   onClick={() => setModalAddShow(true)}/>
    
           <AddModal
            show={modalAddShow}
            onHide={() => setModalAddShow(false)} 
          />
    
        <div className="container-fluid ">
           <div className="row">
    
           
           
          {medicines?.map((medicine) => (           
            <Card
            className="col-lg-4"
              key={medicine.id}
            
              title={medicine.name}
              subtitle={`Price: ${medicine.price}`}
              onClickButton={() => handleCardClick(medicine)}
              buttonText={'Details'}
             
                   text={`Quantity: ${medicine.quantity} - sales: ${medicine.sales}`}
               //
              image={<img src={medicine?.imageURL? medicine.imageURL : '/medication.svg'}  
              alt="Image"  style={{ maxHeight: '50px' , maxWidth: '50px'}} />}
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
              edit={true}
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
              edit={true}
              onSave={(newValue) => handleSave(newValue, 'quantity')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Description</h5>
            
            </div>
            <EditableField
             id={selectedMedicine._id}
             hide={() => setModalDescShow(false)}
             nameOfField={"description"}
             edit={false}
             
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
              edit={false}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicinalUses')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Medicine Ingredients</h5>
             
            </div>
            <EditableField
             id={selectedMedicine._id}
             nameOfField={"medicineIngredients"}
             hide={() => setModalDescShow(false)}
             edit={true}
              
              value={selectedMedicine.medicineIngredients.join(', ')}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicineIngredients')}
            />
          </div>
          
          }
          
          image={<img src={selectedMedicine?.imageURL? selectedMedicine.imageURL : '/medication.svg'}  alt="Image"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
        />

        
      )}
        </div>
        </div>
        </div>
      );
     
    }
    
    export default MedicineList;