// ActiveIconNotification.js
import React, { useState } from 'react';

const NotificationCard = ({ notifications, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{marginBottom:"400px"}}>
      <div className="bg-gray-800 text-white p-4 rounded shadow-lg max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button className="text-white" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="mt-2">
          {notifications.map((notification, index) => (
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
    <div className="relative inline-block">
      <div
        className="text-white text-2xl cursor-pointer"
        onClick={() => setIsNotificationVisible(!isNotificationVisible)}
      >
        {notifications?.length > 0 ?  '🔔': '🔕'  }
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
