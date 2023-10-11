import {Button} from  '../../../../components/Button';
import {useState} from 'react' ;
import Modal from 'react-bootstrap/Modal' ;

function AddModal(props) {
  const [selectedFile, setSelectedFile] = useState(null);

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileChange(file); // Pass the selected file to the parent component
    };

  const { onHide , onFileChange} = props

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Add Medicine
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Name </h3>
        <p>
        <input
        type="text"
        placeholder="Medicine Name"
        className="search-input"
      />
        </p>
        <h3>Quantity </h3>
        <p>
        <input
        type="integer"
        placeholder="Quantity"
        className="search-input"
      />
       <h3>Medicinal use </h3>
        <p>
        <input type="text" placeholder="Medicinal use"  className="search-input" />
       <h3>Description </h3>
        <p>
        <input type="text" placeholder="Description" className="search-input" />
       <h3>Upload Photo</h3>
        <p>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        </p>
        </p>
        </p>
        </p>
      </Modal.Body>
      <Modal.Footer>
      <Button text="Add" className="desc-button"   onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal ;