// // pages/policy.js
// import React from 'react';

// const PolicySection = ({ title, description }) => (
//   <div className="bg-gradient-to-r from-blue-900 to-blue-800 hover:to-blue-700 text-white p-8 rounded-xl mb-8 shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1">
//     <h3 className="text-3xl font-bold mb-4">{title}</h3>
//     <p className="text-lg leading-relaxed mb-4">
//       {description}
//     </p>
//     <p className="text-lg leading-relaxed">
//       Further details are available in our full policy documentation. Please contact our support team for more information or any queries.
//     </p>
//   </div>
// );

// const PolicyPage = () => {
//   return (
//     <>
//       <style>
//         {`
//           @keyframes moveBackground {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }

//           .animated-background {
//             animation: moveBackground 20s linear infinite;
//             background-size: 400% 400%;
//             background-image: linear-gradient(45deg, #1a3b5d 25%, #162c47 25%, #162c47 50%, #1a3b5d 50%, #1a3b5d 75%, #162c47 75%, #162c47);
//           }
//         `}
//       </style>
//       <div className="min-h-screen bg-blue-950 text-gray-100 animated-background">
//         <div className="container mx-auto px-4 py-16">
//           <div className="mb-16 text-center">
//             <h1 className="text-6xl font-extrabold text-gray-100">Our Policies</h1>
//             <p className="mt-4 text-xl text-blue-300">Dedicated to providing exceptional service with full transparency and integrity.</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <PolicySection
//               title="Privacy Policy"
//               description="We prioritize your privacy and protect your personal and health information with the highest level of security. Our comprehensive policy outlines the measures we take to safeguard your data, ensuring compliance with all legal standards."
//             />

//             <PolicySection
//               title="Prescription Policy"
//               description="Our prescription policy is designed with your health and safety in mind. We adhere to strict pharmaceutical guidelines to ensure every prescription is accurately fulfilled. Our pharmacists are always available to discuss your medication, providing expert advice and support."
//             />

//             <PolicySection
//               title="Return & Refund Policy"
//               description="We strive to make returns and refunds as straightforward as possible. Our policy outlines the procedures for returning products, including special considerations for prescription medications, to ensure a hassle-free experience for our customers."
//             />

//             <PolicySection
//               title="Terms of Service"
//               description="By utilizing our services, you agree to our terms of service. These terms are designed to create a clear understanding of our mutual rights and responsibilities, ensuring a smooth and positive experience for all our customers."
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PolicyPage;


// 'use client';

// import React, { useState } from 'react';

// const PolicySection = ({ title, description, isSelected, onClick }) => (
//   <div 
//     className={`bg-gradient-to-r from-blue-900 to-blue-800 hover:to-blue-700 text-white p-8 rounded-xl mb-8 shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${isSelected ? 'selected' : 'blurred'}`} 
//     onClick={onClick}
//   >
//     <h3 className="text-3xl font-bold mb-4">{title}</h3>
//     <p className="text-lg leading-relaxed mb-4">
//       {description}
//     </p>
//     <p className="text-lg leading-relaxed">
//       Further details are available in our full policy documentation. Please contact our support team for more information or any queries.
//     </p>
//   </div>
// );

// const PolicyPage = () => {
//   const [selectedPolicy, setSelectedPolicy] = useState(null);

//   return (
//     <>
//       <style>
//         {`
//           @keyframes moveBackground {
//             0% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//             100% { background-position: 0% 50%; }
//           }

//           .animated-background {
//             animation: moveBackground 20s linear infinite;
//             background-size: 400% 400%;
//             background-image: linear-gradient(45deg, #1a3b5d 25%, #162c47 25%, #162c47 50%, #1a3b5d 50%, #1a3b5d 75%, #162c47 75%, #162c47);
//           }

//           .selected {
//             position: fixed;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             z-index: 10;
//           }

//           .blurred {
//             filter: blur(2px);
//           }
//         `}
//       </style>
//       <div className="min-h-screen bg-blue-950 text-gray-100 animated-background">
//         <div className="container mx-auto px-4 py-16">
//           <div className="mb-16 text-center">
//             <h1 className="text-6xl font-extrabold text-gray-100">Our Policies</h1>
//             <p className="mt-4 text-xl text-blue-300">Dedicated to providing exceptional service with full transparency and integrity.</p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12">
//             <PolicySection
//               title="Privacy Policy"
//               description="We prioritize your privacy and protect your personal and health information with the highest level of security. Our comprehensive policy outlines the measures we take to safeguard your data, ensuring compliance with all legal standards."
//               isSelected={selectedPolicy === 'Privacy Policy'}
//               onClick={() => setSelectedPolicy('Privacy Policy')}
//             />

//             <PolicySection
//               title="Prescription Policy"
//               description="Our prescription policy is designed with your health and safety in mind. We adhere to strict pharmaceutical guidelines to ensure every prescription is accurately fulfilled. Our pharmacists are always available to discuss your medication, providing expert advice and support."
//               isSelected={selectedPolicy === 'Prescription Policy'}
//               onClick={() => setSelectedPolicy('Prescription Policy')}
//             />

//             <PolicySection
//               title="Return & Refund Policy"
//               description="We strive to make returns and refunds as straightforward as possible. Our policy outlines the procedures for returning products, including special considerations for prescription medications, to ensure a hassle-free experience for our customers."
//               isSelected={selectedPolicy === 'Return & Refund Policy'}
//               onClick={() => setSelectedPolicy('Return & Refund Policy')}
//             />

//             <PolicySection
//               title="Terms of Service"
//               description="By utilizing our services, you agree to our terms of service. These terms are designed to create a clear understanding of our mutual rights and responsibilities, ensuring a smooth and positive experience for all our customers."
//               isSelected={selectedPolicy === 'Terms of Service'}
//               onClick={() => setSelectedPolicy('Terms of Service')}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default PolicyPage;


//Perfect Code
 
'use client';
import React, { useState } from 'react';
import './policy.css';

const PolicySection = ({ title, description, isSelected, onClick }) => (
  <div 
    className={`bg-gradient-to-r from-blue-900 to-blue-800 hover:to-blue-700 text-white p-8 rounded-xl mb-8 shadow-2xl transition-opacity duration-300 ease-in-out transform hover:-translate-y-1 ${isSelected ? 'selected' : ''}`} 
    onClick={onClick}
  >
    <h3 className="text-3xl font-bold mb-4">{title}</h3>
    <p className="text-lg leading-relaxed mb-4">
      {description}
    </p>
    <p className="text-lg leading-relaxed">
      Further details are available in our full policy documentation. Please contact our support team for more information or any queries.
    </p>
  </div>
);

const PolicyPage = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  return (
    <>
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .animated-background {
            animation: moveBackground 20s linear infinite;
            background-size: 400% 400%;
            background-image: linear-gradient(45deg, #1a3b5d 25%, #162c47 25%, #162c47 50%, #1a3b5d 50%, #1a3b5d 75%, #162c47 75%, #162c47);
          }

          .selected {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }

          .overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 5;
          }
        `}
      </style>
      <div className="min-h-screen bg-blue-950 text-gray-100 animated-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16 text-center">
            <h1 className="text-6xl font-extrabold text-gray-100">Our Policies</h1>
            <p className="mt-4 text-xl text-blue-300">Dedicated to providing exceptional service with full transparency and integrity.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <PolicySection
              title="Privacy Policy"
              description="We prioritize your privacy and protect your personal and health information with the highest level of security. Our comprehensive policy outlines the measures we take to safeguard your data, ensuring compliance with all legal standards."
              isSelected={selectedPolicy === 'Privacy Policy'}
              onClick={() => setSelectedPolicy('Privacy Policy')}
            />

            <PolicySection
              title="Prescription Policy"
              description="Our prescription policy is designed with your health and safety in mind. We adhere to strict pharmaceutical guidelines to ensure every prescription is accurately fulfilled. Our pharmacists are always available to discuss your medication, providing expert advice and support."
              isSelected={selectedPolicy === 'Prescription Policy'}
              onClick={() => setSelectedPolicy('Prescription Policy')}
            />

            <PolicySection
              title="Return & Refund Policy"
              description="We strive to make returns and refunds as straightforward as possible. Our policy outlines the procedures for returning products, including special considerations for prescription medications, to ensure a hassle-free experience for our customers."
              isSelected={selectedPolicy === 'Return & Refund Policy'}
              onClick={() => setSelectedPolicy('Return & Refund Policy')}
            />

            <PolicySection
              title="Terms of Service"
              description="By utilizing our services, you agree to our terms of service. These terms are designed to create a clear understanding of our mutual rights and responsibilities, ensuring a smooth and positive experience for all our customers."
              isSelected={selectedPolicy === 'Terms of Service'}
              onClick={() => setSelectedPolicy('Terms of Service')}
            />
          </div>
        </div>
      </div>
      {selectedPolicy && <div className="overlay" onClick={() => setSelectedPolicy(null)} />}
    </>
  );
};

export default PolicyPage;

