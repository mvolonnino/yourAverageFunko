import React, { useState, useEffect, useContext } from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
} from "mdbreact";
import Avatar from "@material-ui/core/Avatar";
import { MDBTooltip } from "mdb-react-ui-kit";
import ReactScrollableFeed from "react-scrollable-feed";
import firebase from "firebase";
import db from "../../../../fire";

import "./MessageModal.css";
import { API } from "../../../../utils";
import { UserContext } from "../../../../context";
import { IconSent } from "../../../../components";

const MessageModal = ({
  handleClick,
  messages,
  messageBetween,
  users,
  chatId,
  setAddlistener,
}) => {
  const { userState } = useContext(UserContext);
  const { user, authToken } = userState;
  const [userUID, setUserUID] = useState("");
  const [selUserUID, setSelUserUID] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState("");
  const [lastMessage, setLastMessage] = useState({
    message: "",
    timestamp: "",
  });
  const [state, setState] = useState({
    modal14: true,
  });
  // console.log({ userState, users, chatId });

  const toggle = (nr) => () => {
    let modalNumber = "modal" + nr;
    setState({
      [modalNumber]: !state[modalNumber],
    });
    setAddlistener(false);
  };

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    setUserMessage(value);
    setStatus("");
  };

  const handleMsgSend = () => {
    if (userMessage) {
      const chatMessage = {
        message: userMessage,
        uid: userUID,
        displayName: user.displayName,
        photoURL: user.photoURL,
        timestamp: firebase.firestore.Timestamp.now().toDate(),
      };
      API.sendMessageToChat({
        authToken,
        chatId,
        chatMessage,
        userUID,
        selUserUID,
      })
        .then((res) => {
          if (res.status === 200) {
            setUserMessage("");
            setStatus(res.status);
            setLastMessage({
              message: res.data[1].message,
              timestamp: res.data[1].timestamp,
            });
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (!userUID) {
      setUserUID(user.uid);
      const selUser = users.filter((selUser) => selUser.uid !== user.uid);
      setSelUserUID(selUser[0].uid);
    }
  }, [chatId]);

  return (
    <MDBContainer>
      <MDBModal
        isOpen={state.modal14}
        toggle={(toggle(14), handleClick)}
        centered
        size="lg"
        className="messageModal"
      >
        <MDBModalHeader
          toggle={(toggle(14), handleClick)}
        >{`Messages between ${messageBetween}`}</MDBModalHeader>

        <MDBModalBody className="chatModalBody">
          <ReactScrollableFeed>
            {messages.map((messageObj) => {
              const { message, displayName, timestamp, photoURL } = messageObj;
              const date = new Date(timestamp).toLocaleDateString();
              const time = new Date(timestamp).toLocaleTimeString();

              return (
                <MDBModalBody key={timestamp}>
                  <div
                    className={`message ${
                      messageBetween !== displayName && "message_sender"
                    }`}
                  >
                    <Avatar
                      src={photoURL}
                      alt={displayName}
                      className="message_photo"
                    />
                    <span className="chatDisplayName">{displayName}</span>
                    <p>{message}</p>
                    <span className="time">
                      <MDBTooltip
                        tag="a"
                        wrapperProps={{ href: "#" }}
                        placement="top"
                        title={`Sent on ${date} at ${time}`}
                        className="timeTooltip"
                      >
                        <MDBIcon icon="clock" className="clockIcon" />
                      </MDBTooltip>
                    </span>
                    <span className="anchor" id={timestamp}></span>
                  </div>
                  {/* <hr className="chatLine" /> */}
                </MDBModalBody>
              );
            })}
          </ReactScrollableFeed>
        </MDBModalBody>

        <MDBModalFooter className={`justify-content-center`}>
          <input
            type="text"
            placeholder="say something.."
            className="messageInput"
            value={userMessage}
            onChange={(e) => handleInputChange(e)}
          />
          <MDBBtn color="secondary" onClick={handleMsgSend}>
            send
          </MDBBtn>
          {status === 200 ? (
            <IconSent icon="check-circle" lastMessage={lastMessage} />
          ) : null}
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default MessageModal;
