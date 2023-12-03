import React from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "./Button";

function DescriptionModal(props) {
  const { medicine, onHide } = props;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Medicine Description
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="medicine-details">
          <img
            src={"http://localhost:8080/" + medicine.imageURL}
            alt={medicine.name}
            className="medicine-image"
          />
          <div className="medicine-info">
            <h3>{medicine.name}</h3>
            <p>{medicine.description}</p>
            <p>Price: ${medicine.price}</p>
            {medicine.medicinalUses.length > 0 && (
              <div>
                <h5>Medicinal Uses:</h5>
                <ul>
                  {medicine.medicinalUses.map((use, index) => (
                    <li key={index}>{use}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button text="Close" className="desc-button" onClick={onHide} />
      </Modal.Footer>
    </Modal>
  );
}

export default DescriptionModal;
