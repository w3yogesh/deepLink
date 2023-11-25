import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/getNotifications/${userId}`);
      const data = response.data;
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <div className='notification' key={notification._id}>
          <span className='notification-msg'>{notification.message}</span>
          {/* <p>{notification.createdAt}</p> */}
          <span className='notification-time'>
          {new Date(notification.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
