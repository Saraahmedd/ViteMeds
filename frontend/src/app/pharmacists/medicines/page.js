'use client'
import React from 'react';
import {useState} from 'react' ;
import  {Card} from '../../../../components/Card'; 
import {Button} from '../../../../components/Button'; 
import  AddModal  from './PharmacistComponents/AddModal';
import  EditableField  from './PharmacistComponents/EditableField';
// import EditModal  from './MedicineModals/EditModal';

import DescriptionModal  from './PharmacistComponents/DescriptionModal';
import 'bootstrap/dist/css/bootstrap.min.css';








function MedicineList() {
    const [modalAddShow, setModalAddShow] = useState(false);
    const [modalDescShow, setModalDescShow] = useState(false);
    // const [modalEditShow, setModalEditShow] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState(null); 

    const handleCardClick = (medicine) => {
      setSelectedMedicine(medicine);
      setModalDescShow(true);
    };

    // const handleEdit = () => {
    //   setModalEditShow(true);
    //   setModalDescShow(false);
    // };

    // const handleSaveEdit = () => {
    //   // Save edited data (implement this part later)
    //   setEModalEditShow(false);
    // };
    const medicines = [
      {
        name: 'Ibuprofen 200mg Tablets',
        description: 'Pain relief and anti-inflammatory medication',
        price: 9.99,
        quantity: 100,
        sales: 50,
        expiryDate: '2024-12-31',
        medicinalUses: ['Fever reduction', 'Pain relief', 'Inflammation'],
        medicineIngredients: ['Ibuprofen', 'Microcrystalline cellulose', 'Croscarmellose sodium']
       ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Amoxicillin 500mg Capsules',
        description: 'Antibiotic for bacterial infections',
        price: 14.99,
        quantity: 75,
        sales: 30,
        expiryDate: '2023-10-15',
        medicinalUses: ['Bacterial infections', 'Respiratory infections', 'Ear infections'],
        medicineIngredients: ['Amoxicillin', 'Lactose', 'Magnesium stearate']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Lisinopril 10mg Tablets',
        description: 'Blood pressure control medication',
        price: 11.49,
        quantity: 60,
        sales: 20,
        expiryDate: '2024-06-30',
        medicinalUses: ['Hypertension', 'Heart failure'],
        medicineIngredients: ['Lisinopril', 'Silicon dioxide', 'Magnesium stearate']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Claritin 10mg Tablets',
        description: 'Antihistamine for allergy relief',
        price: 8.25,
        quantity: 90,
        sales: 40,
        expiryDate: '2023-11-30',
        medicinalUses: ['Allergy relief', 'Hay fever', 'Itchy eyes'],
        medicineIngredients: ['Loratadine', 'Corn starch', 'Povidone']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Tums Antacid Chewable Tablets',
        description: 'Antacid for heartburn relief',
        price: 6.99,
        quantity: 120,
        sales: 55,
        expiryDate: '2024-09-15',
        medicinalUses: ['Heartburn relief', 'Acid indigestion'],
        medicineIngredients: ['Calcium carbonate', 'Dextrose', 'Corn starch']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Melatonin 3mg Tablets',
        description: 'Sleep aid for insomnia',
        price: 5.49,
        quantity: 80,
        sales: 25,
        expiryDate: '2024-03-31',
        medicinalUses: ['Sleep aid', 'Insomnia'],
        medicineIngredients: ['Melatonin', 'Dicalcium phosphate', 'Microcrystalline cellulose']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      },
      {
        name: 'Pepto-Bismol Liquid',
        description: 'Digestive aid for upset stomach',
        price: 7.99,
        quantity: 60,
        sales: 35,
        expiryDate: '2023-12-31',
        medicinalUses: ['Upset stomach relief', 'Indigestion', 'Diarrhea'],
        medicineIngredients: ['Bismuth subsalicylate', 'Sodium saccharin', 'Methylcellulose']
        ,  image: 'https://m.media-amazon.com/images/I/71E8kN0jYML._AC_UF1000,1000_QL80_.jpg' 
      }
    ];
    
      
      





  
      return (
        <div>
          {/* <Navbar/> */}
          <div className="search-container">
          <input
            type="text"
            placeholder="Search For Medicine"
            className="search-input"
          />
          <Button text="Search"  className="search-button" onClick={() => console.log('Button clicked')} />
          </div>
           
           <Button text="Add Product" className="add-button"   onClick={() => setModalAddShow(true)}/>
    
           <AddModal
            show={modalAddShow}
            onHide={() => setModalAddShow(false)} 
          />

        
       
    
    
        <div className="container-fluid ">
           <div className="row">
    
           
           
          {medicines.map((medicine) => (
            //  <div key={medicine.id} className="col-md-6 col-lg-4">
           
            <Card
            className="col-lg-4"
              key={medicine.id}
            
              title={medicine.name}
              subtitle={`Price: ${medicine.price}`}
              onClickButton={() => handleCardClick(medicine)}
              buttonText={'Details'}
             
    
            //   FOR PHARMACIST
               text={`Quantity: ${medicine.quantity}`}
               //
              image={<img src={medicine.image}  alt="DoctorImage"  style={{ maxHeight: '150px' , maxWidth: '100px'}} />}
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
              onSave={(newValue) => handleSave(newValue, 'price')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Quantity</h5>
            
            </div>
            <EditableField
            
              value={selectedMedicine.quantity}
              onSave={(newValue) => handleSave(newValue, 'quantity')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Description</h5>
            
            </div>
            <EditableField
            
              value={selectedMedicine.description}
              onSave={(newValue) => handleSave(newValue, 'description')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Sales</h5>
            
            </div>
            <EditableField
              
              value={selectedMedicine.sales}
              onSave={(newValue) => handleSave(newValue, 'sales')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Expiry Date</h5>
            
            </div>
            <EditableField
              
              value={selectedMedicine.expiryDate}
              onSave={(newValue) => handleSave(newValue, 'expiryDate')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Medicinal Uses</h5>
             
            </div>
            <EditableField
             
              value={selectedMedicine.medicinalUses.join(', ')}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicinalUses')}
            />
          
            <div className="info-container d-flex align-items">
              <h5>Medicine Ingredients</h5>
             
            </div>
            <EditableField
              
              value={selectedMedicine.medicineIngredients.join(', ')}
              onSave={(newValue) => handleSave(newValue.split(',').map(item => item.trim()), 'medicineIngredients')}
            />
          </div>
          
          }
          
          image={<img src={selectedMedicine.image}  alt="DoctorImage"  style={{  float: 'right',  marginLeft: '10px',  maxHeight: '200px', maxWidth: '150px',}} />}
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