import { registerAction } from '@/app/redux/actions/authActions';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
function CenteredModalAdmin(props) {
  const dispatch=useDispatch();
  const { title, subheader, onHide } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordconfirmValue, setPasswordConfrimValue] = useState('');
  const handleUsernameChange = (e) => {
    setUsernameValue(e.target.value);
    //console.log(e.target.value)
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handlePasswordConfrimChange = (e) => {
    setPasswordConfrimValue(e.target.value);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    dispatch(registerAction({
      "username": usernameValue,
      "password": passwordValue,
      "passwordConfirm": passwordconfirmValue,
      "role": "administrator"
    }))
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
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-group my-3">
              <label htmlFor="usernameInput">Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                className="form-control my-1"
                id="usernameInput"
                placeholder="Enter Username"
                value={usernameValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="passwordInput">Password</label>
              <input
                onChange={handlePasswordChange}
                type="password"
                className="form-control my-1"
                id="passwordInput"
                placeholder="Password"
                value={passwordValue}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="passwordInput">Confrim Password</label>
              <input
                onChange={handlePasswordConfrimChange}
                type="password"
                className="form-control my-1"
                id="passwordInput"
                placeholder="Password"
                value={passwordconfirmValue}
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

export default CenteredModalAdmin;
