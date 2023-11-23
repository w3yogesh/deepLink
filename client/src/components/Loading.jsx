import React from "react";

const Loading = () => {
  return (
    <div className="loader">
      <div className="loader-circle"></div>
      <span className="loader-text">Loading...</span>
      <style>
        {`
          body {
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }

          .loader {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .loader-circle {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: pulse 1.5s ease-in-out infinite;
          }

          .loader-circle:before {
            content: "";
            display: block;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            border: 8px solid #7e3af2;
            border-color: #7e3af2 transparent #7e3af2 transparent;
            animation: loader 1.2s linear infinite;
          }

          .loader-text {
            color: #7e3af2;
            font-size: 24px;
            font-weight: bold;
            margin-top: 16px;
          }

          @keyframes loader {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            50% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.8);
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
