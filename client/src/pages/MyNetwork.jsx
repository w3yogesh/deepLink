import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/myNetwork.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ConnectionSVG, SentSVG, HandShackSVG } from "../components/MySVGIcons";

import UserListComponent from "../components/UserList";
import ConnectionRequest from "../components/ConnectionRequests";
import ConnectionSent from "../components/ConnectionSent";
import MyConnections from "../components/MyConnections";

const YourComponent = ({ activeTab, myId }) => {
  return (
    <div>
      {activeTab === "allUser" && <UserListComponent senderId={myId} />}
      {activeTab === "requests" && <ConnectionRequest senderId={myId} />}
      {activeTab === "sent" && <ConnectionSent senderId={myId} />}
      {activeTab === "myConnections" && <MyConnections senderId={myId} />}
    </div>
  );
};

const MyNetwork = () => {
  const [myId, setMyId] = useState("");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('allUser');


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const userAuth = async () => {
      const response = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = response.data;
      if (status) {
        setMyId(user._id);
        console.log(myId);
      } else {
        navigate("/login");
      }
    };
    userAuth();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mynetwork grid-container">
      <div className="mynetwork-container">
        
          <div className="left-sidebar">
          <div className="left-menu">
            <section className="side-menu">
              <h6 className="section-heading">Manage Networks</h6>
              <div className="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "myConnections" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("myConnections")}
                >
                  <div className="itme-svg">
                    <ConnectionSVG />
                  </div>
                  <span>Connections</span>
                </div>
              </div>
              <div className="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "sent" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("sent")}
                >
                  <div className="itme-svg">
                    <SentSVG />
                  </div>
                  <span>sent</span>
                </div>
              </div>
              <div className="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "requests" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("requests")}
                >
                  <div className="itme-svg">
                    <HandShackSVG />
                  </div>
                  <span>recieved</span>
                </div>
              </div>
              <div className="side-menu-item">
                <div
                  className={`item-link ${
                    activeTab === "allUser" ? "active" : ""
                  }`}
                  onClick={() => handleTabClick("allUser")}
                >
                  <div className="itme-svg">
                    <HandShackSVG />
                  </div>
                  <span>All Users</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="main-section">
          <div>
          <YourComponent activeTab={activeTab} myId={myId} />
            </div>
          </div></div>
      </div>
    </>
  );
};

export default MyNetwork;