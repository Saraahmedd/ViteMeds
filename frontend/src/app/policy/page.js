import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const PolicyPage = () => {
  return (
    <div className='w-100'>
      <Navbar />
      <div className="page-div container justify-content-center align-items-center m-5 mx-auto">
        <h1 className="text-primary text-center"><strong>Company Policy</strong></h1>
        <h3 className='text-center'>XClinics Clinic</h3>
        <div className='d-flex justify-content-center align-items-center'><hr className='w-50'/></div>
        <div className="card bg-light rounded shadow p-5 m-5 border-0 align-self-center mx-auto">
        <h4 className='text-primary'>Data Collection</h4>
        <p>
          At XClinics, we take your privacy seriously. We collect and store personal information
          provided by users during the registration process, including but not limited to names, email
          addresses, date of birth, and contact information.
        </p>
        <br />

        <h4 className='text-primary'>Data Usage</h4>
        <p>
          Your personal data is used solely for the purpose of providing healthcare services through
          our platform. This may include connecting you with medical professionals, processing payments,
          and sending appointment reminders.
        </p>
        <br />

        <h4 className='text-primary'>Data Security</h4>
        <p>
          We implement strict security measures to safeguard your data. All communication between your
          device and our servers is encrypted to protect your information. We also regularly update our
          security protocols to ensure the highest level of protection.
        </p>
        <br />

        <h4 className='text-primary'>Third-Party Services</h4>
        <p>
            XClinics may use third-party services for certain functions, such as payment processing
          and analytics. These third parties may have their own privacy policies, and we encourage
          users to review them.
        </p>

        <h4 className='text-primary'>Cookies and Tracking</h4>
        <p>
          We use cookies and similar technologies to improve your experience on our platform. These
          technologies collect information about your browsing behavior and preferences.
        </p>
        <br />

        <h4 className='text-primary'>User Guidelines</h4>
        <p>
          We expect all users to adhere to our community guidelines, which include respectful and
          appropriate behavior in interactions with healthcare providers and other users.
        </p>
        <br />

        <h4 className='text-primary'>Changes to Policy</h4>
        <p>
            XClinics reserves the right to update this policy at any time. Users will be notified of
          any significant changes.
        </p>
        <br />

        <h4 className='text-primary'>Contact Us</h4>
        <p>
          If you have any questions or concerns about our privacy policy, please contact us at
          [Contact Email].
        </p>
        <br />

        <p className='text-center mt-5 text-primary'>
          <strong>
          This policy was last updated October 2023.
          </strong>
        </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyPage;
