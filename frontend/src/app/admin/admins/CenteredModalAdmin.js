import { registerAction } from '@/app/redux/actions/authActions';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

function CenteredModalAdmin(props) {
  const dispatch=useDispatch();
  const { title, subheader, onHide } = props;

  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordconfirmValue, setPasswordConfrimValue] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    }
    if (field === 'confirmpassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

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
      <Modal.Header closeButton className='bg-primary'>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title id="contained-modal-title-vcenter" className='px-2 text-global text-bold text-center'>
          {title}
        </Modal.Title>
        <hr />
        <h4>{subheader}</h4>
        <p>
          <form onSubmit={(e)=>handleSubmit(e)} className='m-3 p-3'>
            <div className="form-group my-3">
              <label htmlFor="usernameInput" className='text-semibold text-global'>Username</label>
              <input
                onChange={handleUsernameChange}
                type="text"
                className="form-control my-1 p-2"
                id="usernameInput"
                placeholder="Enter Username"
                value={usernameValue}
              />
            </div>
            <div className="row">
            <div className="col-md-6 form-group my-3 row">
                <label htmlFor="passwordInput" className='text-semibold text-global'>Password</label>
                <div className='col-md-10'>
                  <input
                  onChange={handlePasswordChange}
                  type={showPassword ? 'text' : 'password'}
                  className="form-control my-1 p-2"
                  id="passwordInput"
                  placeholder="Password"
                  value={passwordValue}
                />
                </div>
                <div className="col-md-2 d-flex align-items-center bg-light rounded">
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('password')}
                    className="border-0 bg-light rounded mx-auto">
                    <Image src={showPassword ? "/hide.svg" : "/show.svg"} width={35} height={35} />
                  </button>
                </div>
            </div>
            <div className="row col-md-6 form-group my-3">
                <label htmlFor="passwordInput" className='text-semibold text-global'>Confrim Password</label>
              <div className='col-md-10'>
                <input
                  onChange={handlePasswordConfrimChange}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="form-control py-2"
                  id="passwordInput"
                  placeholder="Password"
                  value={passwordconfirmValue}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center bg-light rounded">
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmpassword')}
                  className="border-0 bg-light rounded mx-auto">
                  <Image src={showConfirmPassword ? "/hide.svg" : "/show.svg"} width={35} height={35} />
                </button>
              </div>
            </div>
            </div>
            <div className="row justify-content-end align-items-center mt-5 mb-2">
                <button type="submit" className="btn btn-primary mx-auto col-md-4">Submit</button>
            </div>
          </form>
        </p>
      </Modal.Body>
    </Modal>
  );
}

export default CenteredModalAdmin;
