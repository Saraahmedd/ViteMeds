import React, { useState } from "react";

const ChangePasswordModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePasswordChange = (e) => {
    // Handle password change logic here
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      {/* Trigger button to open the modal */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Change Password
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="w-full p-6 rounded-lg shadow md:w-96">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Change Password
            </h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="currentPassword"
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="input-field"
                  required
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  {/* Checkbox for accepting terms and conditions */}
                  <input
                    id="acceptTerms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-800 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="acceptTerms"
                    className="font-light text-gray-500"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Reset Password
              </button>
            </form>
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordModal;
