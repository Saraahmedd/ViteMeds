import { addMedicine } from '@/app/redux/actions/medicineActions';
import { Button } from '../../../../../components/Button';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';

function AddModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reqbody, setReqbody] = useState({
    name: '',
    quantity: '',
    medicinalUse: '',
    description: '',
    photo: null,
    price: ""
  });

  const dispatch = useDispatch();

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onFileChange(file); // Pass the selected file to the parent component
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setReqbody((prevReqbody) => ({
      ...prevReqbody,
      [field]: value,
    }));
  };

  const { onHide, onFileChange } = props;

  const handleAddMedicine = () => {
    dispatch(addMedicine(reqbody));
    onHide(); // Close the modal after dispatching the addMedicine action
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Name</h3>
        <p>
          <input
            type="text"
            placeholder="Medicine Name"
            className="search-input"
            value={reqbody.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
        </p>
        <h3>Quantity</h3>
        <p>
          <input
            type="number"
            placeholder="Quantity"
            className="search-input"
            value={reqbody.quantity}
            onChange={(e) => handleInputChange(e, 'quantity')}
          />
        </p>
        <h3>Medicinal use</h3>
        <p>
          <input
            type="text"
            placeholder="Medicinal use"
            className="search-input"
            value={reqbody.medicinalUse}
            onChange={(e) => handleInputChange(e, 'medicinalUse')}
          />
        </p>
        <h3>Description</h3>
        <p>
          <input
            type="text"
            placeholder="Description"
            className="search-input"
            value={reqbody.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
        </p>
        <h3>Price</h3>
        <p>
          <input
            type="number"
            placeholder="Price"
            className="search-input"
            value={reqbody.price}
            onChange={(e) => handleInputChange(e, 'price')}
          />
        </p>
        <h3>Upload Photo</h3>
        <p>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button text="Add" className="desc-button" onClick={handleAddMedicine} />
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
