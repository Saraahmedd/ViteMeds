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
      <Modal.Header closeButton className='bg-primary'>
      </Modal.Header>
      <Modal.Body>
        {!edit && <Modal.Title id="contained-modal-title-vcenter">
          <h3 className='text-bold text-center text-global'>Add Medicine</h3></Modal.Title>}
        {edit && <Modal.Title id="contained-modal-title-vcenter">
          <h3 className='text-bold text-center text-global'>Edit Medicine</h3></Modal.Title>}
        <hr />
        <div className="row">
          <div className="col-md-6">
            <label className='text-semibold'>Name</label>
            <p>
              <input
                type="text"
                placeholder="Medicine Name"
                className="form-control"
                value={reqbody?.name}
                onChange={(e) => handleInputChange(e, 'name')}
                disabled={edit}
              />
            </p>
          </div>
          <div className="col-md-6">          
            <label className='text-semibold'>Quantity</label>
            <p>
              <input
                type="number"
                placeholder="Quantity"
                className="form-control"
                value={reqbody?.quantity}
                onChange={(e) => handleInputChange(e, 'quantity')}
              />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className='text-semibold'>Medicinal use</label>
            <p>
              <input
                type="text"
                placeholder="Medicinal use"
                className="form-control"
                value={reqbody?.medicinalUses}
                onChange={(e) => handleInputChange(e, 'medicinalUses')
              }
              disabled={edit}
              />
            </p>
          </div>
          <div className="col-md-6">
            <label className='text-semibold'>Ingredients</label>
            <p>
              <input
                type="text"
              
                placeholder="Description"
                className="form-control"
                value={reqbody?.medicineIngredients}
                onChange={(e) => handleInputChange(e, 'medicineIngredients')}
              />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className='text-semibold'>Price</label>
            <p>
              <input
                type="number"

                placeholder="Price"
                className="form-control"
                value={reqbody?.price}
                onChange={(e) => handleInputChange(e, 'price')}
              />
            </p>
          </div>
          <div className="col-md-6">
            <label className='text-semibold'>Description</label>
              <p>
                <input
                  type="text"
                  disabled={edit}
                  placeholder="Description"
                  className="form-control"
                  value={reqbody?.description}
                  onChange={(e) => handleInputChange(e, 'description')}
                />
              </p>
          </div>
        </div>
        <div className="row">
                {/* Document 1 */}
                <div className="col-md-4 mb-2 mxx-auto">
                  <label htmlFor="document1" className="d-flex align-items-center justify-content-between form-label text-semibold">
                    Image
                    <span className="btn btn-outline-primary btn-md col-md-4">
                      <i className="bi bi-cloud-upload"></i> Upload
                      <input type="file" id="document1" className="d-none" onChange={(e) => handleFileUpload(e, 'image')} />
                    </span>
                  </label>
                </div>
          </div>
      </Modal.Body>
        <Button text= {edit ? "Edit" :"Add"} className="desc-button col-md-4 mx-auto my-3" size='md' onClick={handleAddMedicine} />
    </Modal>
  );
}

export default AddModal;
