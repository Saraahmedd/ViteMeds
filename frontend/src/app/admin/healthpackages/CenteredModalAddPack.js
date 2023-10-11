import { createHealthPackage, updateHealthPackage } from '@/app/redux/actions/healthPackagesActions';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
function CenteredModalAddPack(props) {
  const dispatch=useDispatch();

  const { title, subheader, onHide, edit, id  } = props;
  
  const [nameValue, setNameValue] = useState('');
  const [sessionDiscountValue, setSessionDiscountValue] = useState('');
  const [medicineDiscountValue, setMedicineDiscountValue] = useState('');
  const [subscriptionsDiscountValue, setSubscriptionsDiscountValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleNameChange = (e) => {
    setNameValue(e.target.value);
    console.log(e.target.value)
  };

  const handleSessionDiscountChange = (e) => {
    setSessionDiscountValue(e.target.value);
  };

  const handleMedicineDiscountChange = (e) => {
    setMedicineDiscountValue(e.target.value);
  };

  const handleSubscriptionsDiscountChange = (e) => {
    setSubscriptionsDiscountValue(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceValue(e.target.value);
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(id)
    if(edit === false){
    dispatch(createHealthPackage({
      "name": nameValue,
      "price": priceValue,
      "doctorDiscount": sessionDiscountValue,
      "medicineDiscount": medicineDiscountValue,
      "familyMemberSubDiscount": subscriptionsDiscountValue
    }))}else{
      const data={}
      if(nameValue) data.name=nameValue;
      if(priceValue) data.price=priceValue;
      if(sessionDiscountValue) data.doctorDiscount=sessionDiscountValue;
      if(medicineDiscountValue) data.medicineDiscount=medicineDiscountValue;
      if(subscriptionsDiscountValue) data.familyMemberSubDiscount=subscriptionsDiscountValue;
      dispatch(updateHealthPackage(id,data))
    }
props.onHide()
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{subheader}</h4>
        <p>
          <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="form-group my-3">
              <label htmlFor="nameInput">Name</label>
              <input
                onChange={handleNameChange}
                type="text"
                className="form-control my-1"
                id="nameInput"
                placeholder="Enter Name of Package"
                value={nameValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="sessionDiscountInput">Doctor Session Discount</label>
              <input
                onChange={handleSessionDiscountChange}
                type="text"
                className="form-control my-1"
                id="sessionDiscountInput"
                placeholder="Session Discount"
                value={sessionDiscountValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="medicineDiscountInput">Medicine Discount</label>
              <input
                onChange={handleMedicineDiscountChange}
                type="text"
                className="form-control my-1"
                id="medicineDiscountInput"
                placeholder="Medicine Discount"
                value={medicineDiscountValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="subscriptionsDiscountInput">Subscriptions Discount</label>
              <input
                onChange={handleSubscriptionsDiscountChange}
                type="text"
                className="form-control my-1"
                id="subscriptionsDiscountInput"
                placeholder="Subscriptions Discount"
                value={subscriptionsDiscountValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="priceInput">Price</label>
              <input
                onChange={handlePriceChange}
                type="text"
                className="form-control my-1"
                id="priceInput"
                placeholder="Price"
                value={priceValue}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CenteredModalAddPack;
