import {Button} from  '../../../../../components/Button';
import {useState} from 'react' ;
import Modal from 'react-bootstrap/Modal' ;

function DescriptionModal(props) {

  const {subheader, text , image ,  onHide} = props

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Medicine description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {image}
        <h4>{subheader}</h4>
       
        <p>
        {text}
        </p>
      </Modal.Body>
      <Modal.Footer>
      
        <Button text="Close" className="desc-button"   onClick={onHide}/>
      </Modal.Footer>
    </Modal>
  );
}
export default DescriptionModal;