import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Retrieve the API URL from environment variables
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if needed
});

const NotificationList = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/getNotifications/${userId}`);
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
