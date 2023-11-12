import { addMedicine, editMedicine } from '@/app/redux/actions/medicineActions';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';

function AddModal(props) {

  const [file,setFile] = useState({})
 
const { onHide, onFileChange, medicine, edit,reqbody,setReqbody,show,show2} = props;
  useEffect(() => {
    if (show || show2) {
      setReqbody(
        edit === false && !medicine
          ? {
              name: '',
              quantity: '',
              medicinalUses: [],
              description: '',
              image: null,
              price: '',
              medicineIngredients: [],
            }
          : {
              name: medicine?.name,
              quantity: medicine?.quantity,
              medicinalUses: medicine?.medicinalUses,
              description: medicine?.description,
              price: medicine?.price,
              medicineIngredients: medicine?.medicineIngredients,
            }
      );
    }
  }, [show, show2, edit, medicine]);
  
console.log(reqbody);
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };
 

  const dispatch = useDispatch();

  // Handle file selection

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === 'medicinalUses') {
      const medicinalUsesArray = value.split(',');
      setReqbody((prevReqbody) => ({
        ...prevReqbody,
        [field]: medicinalUsesArray,
      }));
    } else if (field === 'medicineIngredients') {
      const medicineIngredientsArray = value.split(',');
      setReqbody((prevReqbody) => ({
        ...prevReqbody,
        [field]: medicineIngredientsArray,
      }));
    } else {
      setReqbody((prevReqbody) => ({
        ...prevReqbody,
        [field]: value,
      }));
    }
  };

  

  const handleAddMedicine = () => {

    const combinedFormData = new FormData();
    for (const key in reqbody) {
      if (reqbody.hasOwnProperty(key)) {
        combinedFormData.append(key, reqbody[key]);
      }
     
    }
    combinedFormData.append('image', file);
    if(edit)
      dispatch(editMedicine(medicine?._id,combinedFormData))
    else
     dispatch(addMedicine(combinedFormData));

    setReqbody("")
    onHide();
     // Close the modal after dispatching the addMedicine action
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        {!edit && <Modal.Title id="contained-modal-title-vcenter">Add Medicine</Modal.Title>}
        {edit && <Modal.Title id="contained-modal-title-vcenter">Edit Medicine</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        
        <h3>Name</h3>
        <p>
          <input
            type="text"
            placeholder="Medicine Name"
            className="search-input"
            value={reqbody?.name}
            onChange={(e) => handleInputChange(e, 'name')}
            disabled={edit}
          />
        </p>
      
        <h3>Quantity</h3>
        <p>
          <input
            type="number"
            placeholder="Quantity"
            className="search-input"
            value={reqbody?.quantity}
            onChange={(e) => handleInputChange(e, 'quantity')}
          />
        </p>
        <h3>Medicinal use</h3>
        <p>
          <input
            type="text"
            placeholder="Medicinal use"
            className="search-input"
            value={reqbody?.medicinalUses}
            onChange={(e) => handleInputChange(e, 'medicinalUses')
          }
          disabled={edit}
          />
        </p>
        <h3>Ingredients</h3>
        <p>
          <input
            type="text"
          
            placeholder="Description"
            className="search-input"
            value={reqbody?.medicineIngredients}
            onChange={(e) => handleInputChange(e, 'medicineIngredients')}
          />
        </p>
        <h3>Description</h3>
        <p>
          <input
            type="text"
            disabled={edit}
            placeholder="Description"
            className="search-input"
            value={reqbody?.description}
            onChange={(e) => handleInputChange(e, 'description')}
          />
        </p>
        <h3>Price</h3>
        <p>
          <input
            type="number"

            placeholder="Price"
            className="search-input"
            value={reqbody?.price}
            onChange={(e) => handleInputChange(e, 'price')}
          />
        </p>
        <div className="row">
                {/* Document 1 */}
                <div className="col-md-4 mb-2">
                  <label htmlFor="document1" className="d-flex align-items-center justify-content-between form-label">
                    Image
                    <span className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-cloud-upload"></i> Upload
                      <input type="file" id="document1" className="d-none" onChange={(e) => handleFileUpload(e, 'image')} />
                    </span>
                  </label>
                </div>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button text= {edit ? "Edit" :"Add"} className="desc-button" onClick={handleAddMedicine} />
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
