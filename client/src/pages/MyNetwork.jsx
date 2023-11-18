import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/myNetwork.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ConnectionSVG,SentSVG,HandShackSVG} from "../components/MySVGIcons"

import UserListComponent from "../components/UserList";
import ConnectionRequest from "../components/ConnectionRequests";
import ConnectionSent from "../components/ConnectionSent";
import MyConnections from "../components/MyConnections";


const MyNetwork = () => {
  const [showAllUser, setShowAllUser] = useState(false);
  const [showConnectionRequest, setShowConnectionRequest] = useState(false);
  const [showConnectionSent, setShowConnectionSent] = useState(false);
  const [showMyConnections, setShowMyConnections] = useState(false);
  const [myId, setMyId] = useState("");
  const navigate = useNavigate();

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
      <div className="mynetwork-container">
        <div className="left-sidebar">
          <div className="left-menu">
            <section className="side-menu">
              <h6 className="section-heading">Manage Networks</h6>
              <div className="side-menu-item">
                <div className="itme-svg"><ConnectionSVG/></div>
                <div
                  className="item-link"
                  onClick={() => {
                    setShowMyConnections(!showMyConnections);
                  }}
                >
                  Connections
                </div>
              </div>
              <div className="side-menu-item">
                <div className="itme-svg"><SentSVG/></div>
                <div
                  className="item-link"
                  onClick={() => {
                    setShowConnectionSent(!showConnectionSent);
                  }}
                >
                  sent
                </div>
              </div>
              <div className="side-menu-item">
                <div className="itme-svg"><HandShackSVG/></div>
                <div
                  className="item-link"
                  onClick={() => {
                    setShowConnectionRequest(!showConnectionRequest);
                  }}
                >
                  recieved
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="main-section">
          <div>
            <div className="actions">
                
               <div className="primary-button" onClick={() => {
                  setShowAllUser(!showAllUser);
                }}>
                All User</div>
              {showAllUser && <UserListComponent senderId={myId} />}
              {showConnectionSent && <ConnectionSent senderId={myId} />}
              {showMyConnections && <MyConnections senderId={myId} />}
              {showConnectionRequest && <ConnectionRequest senderId={myId} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNetwork;
