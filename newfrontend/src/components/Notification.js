// ActiveIconNotification.js
import React, { useState } from "react";

const NotificationCard = ({ notifications, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ marginBottom: "400px" }}
    >
      <div className="bg-gray-800 text-white p-4 rounded shadow-lg max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button className="text-white" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-2">
          {notifications?.map((notification, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-lg font-semibold">{notification.title}</h3>
              <p className="text-gray-300">{notification.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActiveIconNotification = ({ notifications }) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  return (
    <div className="relative inline-block ms-2">
      <div
        className="text-white text-2xl cursor-pointer"
        onClick={() => setIsNotificationVisible(!isNotificationVisible)}
      >
        {notifications?.length > 0 && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
              <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
            </svg>
          </>)}
        {notifications?.length === 0 && (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
            </svg>
          </>
        )}
      </div>
      {isNotificationVisible && (
        <NotificationCard
          notifications={notifications}
          onClose={() => setIsNotificationVisible(false)}
        />
      )}
    </div>
  );
};

export default ActiveIconNotification;
