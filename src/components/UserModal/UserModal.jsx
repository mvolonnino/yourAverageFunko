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
import {
  GenreContainer,
  Loading,
  AlertError,
  IconSent,
} from "../../components";
import firebase from "firebase";

import "./UserModal.css";

const UserModal = ({ selectedUser, setSelectedUser }) => {
  const { userState } = useContext(UserContext);
  const { user, authToken } = userState;
  const { uid, displayName } = selectedUser;
  const [loading, setLoading] = useState(false);
  const [userCollection, setUserCollection] = useState([]);
  const [showUserCollection, setShowUserCollection] = useState(false);
  const [userWantList, setUserWantList] = useState([]);
  const [showUserWant, setShowUserWant] = useState(false);
  const [noUserFunkos, setNoUserFunkos] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lastMessage, setLastMessage] = useState({
    message: "",
    timestamp: "",
  });
  const [status, setStatus] = useState("");
  const [state, setState] = useState({
    modal14: true,
  });
  const timeout = 1000;

  const hanldeInputChange = (e) => {
    const { value } = e.currentTarget;
    setMessage(value);
    setError("");
  };

  const handleSendMessage = () => {
    setStatus("");
    if (message) {
      const userUID = user.uid;
      const selUserUID = uid;
      const uids = [`${userUID}||${uid}`, `${uid}||${userUID}`, userUID, uid];
      const users = [user, selectedUser];
      const chatMessage = {
        message,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.Timestamp.now().toDate(),
      };
      API.sendMessageToChat({
        authToken,
        uids,
        chatMessage,
        users,
        userUID,
        selUserUID,
      })
        .then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            console.log(res);
            setMessage("");
            setLastMessage({
              message: res.data[1].message,
              timestamp: res.data[1].timestamp,
            });
            setStatus(res.status);
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Error trying to send message, please try again.");
        });
    }
  };

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setState({
      [modalNumber]: !state[modalNumber],
    });
    setUserCollection([]);
    setUserWantList([]);
    setNoUserFunkos("");
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
            setNoUserFunkos(
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
            setNoUserFunkos(
              "User currently has no funko pops in their want list"
            );
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

              {noUserFunkos ? (
                <div className="text-center mt-3">{noUserFunkos}</div>
              ) : null}
            </>
          )}
        </MDBModalBody>
        <MDBModalFooter className="userFooter">
          <input
            type="text"
            placeholder="Say something..."
            onChange={(e) => hanldeInputChange(e)}
            value={message}
            className="chatInput"
          />
          <MDBBtn color="secondary" onClick={handleSendMessage}>
            Send Message
          </MDBBtn>
          {status === 200 ? (
            <IconSent icon="check-circle" lastMessage={lastMessage} />
          ) : null}
        </MDBModalFooter>
        {error ? <AlertError err={error} /> : null}
      </MDBModal>
    </MDBContainer>
  );
};

export default UserModal;
