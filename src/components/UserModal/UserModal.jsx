import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import { API } from "../../utils";
import { UserContext } from "../../context";
import { GenreContainer, Loading } from "../../components";

import "./UserModal.css";

const UserModal = ({ selectedUser, setSelectedUser }) => {
  const { uid, displayName } = selectedUser;
  const [loading, setLoading] = useState(false);
  const [userCollection, setUserCollection] = useState([]);
  const [showUserCollection, setShowUserCollection] = useState(false);
  const [userWantList, setUserWantList] = useState([]);
  const [showUserWant, setShowUserWant] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState({
    modal14: true,
  });
  const timeout = 1000;

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setState({
      [modalNumber]: !state[modalNumber],
    });
    setUserCollection([]);
    setUserWantList([]);
    setMessage("");
    setSelectedUser({});
  };

  const getUserCollection = () => {
    setShowUserCollection(true);
    setShowUserWant(false);
    try {
      if (userCollection.length === 0) {
        setLoading(true);
        API.getSelectedUserCollection(uid).then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, timeout);
          const { data } = res;
          if (data.length > 0) {
            setUserCollection(data);
          } else {
            setMessage(
              "User currently has no funko pops saved in their collection!"
            );
          }
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const getUserWantList = () => {
    setShowUserCollection(false);
    setShowUserWant(true);
    try {
      if (userWantList.length === 0) {
        setLoading(true);
        API.getSelectedUserWantList(uid).then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, timeout);
          const { data } = res;
          if (data.length > 0) {
            setUserWantList(data);
          } else {
            setMessage("User currently has no funko pops in their want list");
          }
        });
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <MDBContainer>
      <MDBModal isOpen={state.modal14} toggle={toggle(14)} centered>
        <MDBModalHeader
          toggle={toggle(14)}
        >{`Average Funko User: ${displayName}`}</MDBModalHeader>
        <MDBModalBody>
          {loading ? (
            <div className="modalHeight">
              <Loading />
            </div>
          ) : (
            <>
              <div className="haveOrWant text-center">
                <button className="btn" onClick={getUserCollection}>
                  Collection
                </button>
                <button className="btn" onClick={getUserWantList}>
                  Want List
                </button>
              </div>
              {showUserCollection
                ? userCollection?.map((funkoSet, i) => {
                    return <GenreContainer funkoSet={funkoSet} key={i} />;
                  })
                : null}

              {showUserWant
                ? userWantList?.map((funkoSet, i) => {
                    return <GenreContainer funkoSet={funkoSet} key={i} />;
                  })
                : null}

              {message ? (
                <div className="text-center mt-3">{message}</div>
              ) : null}
            </>
          )}
        </MDBModalBody>
        <MDBModalFooter className="justify-content-center">
          <MDBBtn color="secondary">Send Message</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default UserModal;
