import React from 'react';
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

const ServicesPage = () => {
  return (
    <div className='w-100'>
      <Navbar/>
      <div className="page-div container justify-content-center align-items-center align-self-center mx-auto m-5 w-100 pb-5">
      <h1 className="text-primary text-center"><strong>Health Packages</strong></h1>
      <h2 className='text-center'>Choose the package that suits your needs</h2>

      <div className="w-100 row mt-5 justify-content-center ">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Silver Package</h3>
              <p className="card-subtitle text-primary pb-2 text-center">
                Subsbcribe for 3600EGP/year
              </p>

              <ul>
                <li><strong className='text-primary'>40%</strong> off any doctor's session price</li>
                <li><strong className='text-primary'>20%</strong> off any medicine ordered from our pharmacy platform.</li>
                <li><strong className='text-primary'>10%</strong> discount on subscriptions of family members in any package.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Gold Package</h3>
              <p className="card-subtitle text-primary pb-2 text-center">
                Subscribe for 6000EGP/year
              </p>
              <ul className=''>
                <li><strong className='text-primary'>60%</strong> off any doctor's appointment.</li>
                <li><strong className='text-primary'>30%</strong> off any medicine ordered from our pharmacy platform.</li>
                <li><strong className='text-primary'>15%</strong> discount on subscriptions of family members in any package.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center">Platinum Package</h3>
              <p className="card-subtitle text-primary pb-2 text-center">
              Subscribe for 9000EGP/year
              </p>
              <ul>
                <li><strong className='text-primary'>80%</strong> off any doctor's appointment.</li>
                <li><strong className='text-primary'>40%</strong> off any medicine ordered from our pharmacy platform.</li>
                <li><strong className='text-primary'>20%</strong> discount on subscriptions of family members in any package.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default ServicesPage;
