import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/myNetwork.css";

import UserListComponent from "../components/UserList";
import ConnectionRequest from "../components/ConnectionRequests";
import ConnectionSent from "../components/ConnectionSent";
import MyConnections from "../components/MyConnections";

import Button from "@mui/material/Button";


const MyNetwork = () => {
  const [showAllUser, setShowAllUser] = useState(false);
  const [showConnectionRequest, setShowConnectionRequest] = useState(false);
  const [showConnectionSent, setShowConnectionSent] = useState(false);
  const [showMyConnections, setShowMyConnections] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const myId = "6545fa65389a9cf8a2aa5757";


  return (
    <>
      <Navbar />
      <div className="mynetwork-container">
        <div className="left-sidebar">
          <div className="left-menu">
            <section className="side-menu">
              <h3>Manage Networks</h3>
              <div className="side-menu-item">
                <div className="itme-svg">svg</div>
                <div className="item-link">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowMyConnections(!showMyConnections);
                    }}
                  >Connections
                  </Button>
                 
                </div>
              </div>
              <div className="side-menu-item">
                <div className="itme-svg">svg</div>
                <div className="item-link">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowConnectionSent(!showConnectionSent);
                    }}
                  >
                    sent
                  </Button>
                  
                </div>
              </div>
              <div className="side-menu-item">
                <div className="itme-svg">svg</div>
                <div className="item-link">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowConnectionRequest(!showConnectionRequest);
                    }}
                  >
                    recieved
                  </Button>
                  
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="main-section">
          <div>
            <div className="actions">
              <Button
                variant="contained"
                onClick={() => {
                  setShowAllUser(!showAllUser);
                }}
              >
                All User
              </Button>
              {showAllUser && <UserListComponent senderId={myId} />}
              {showConnectionSent && (<ConnectionSent senderId={myId} />)}
              {showMyConnections && (<MyConnections senderId={myId} />)}
              {showConnectionRequest && (<ConnectionRequest senderId={myId} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNetwork;
