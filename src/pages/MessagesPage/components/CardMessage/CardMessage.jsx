import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./CardMessage.css";
import { UserContext } from "../../../../context";
import { MessageModal, NewMessageAlert } from "../../components";
import db from "../../../../fire";

const CardMessage = ({ messages, users, chatId }) => {
  const history = useHistory();
  const { userState } = useContext(UserContext);
  const { uid } = userState.user;
  const [showMessages, setShowMessages] = useState(false);
  const [msgs, setMsgs] = useState(messages);
  const [messageAlert, setMessageAlert] = useState(false);
  const [chatMsgHeader, setChatMsgHeader] = useState("");
  const [lastMessage, setLastMessage] = useState({
    date: "",
    time: "",
  });

  const handleClick = () => {
    setShowMessages(!showMessages);
    if (messageAlert) {
      db.collection("chats")
        .doc(chatId)
        .get()
        .then((doc) => {
          const { seen } = doc.data();
          seen[uid] = true;
          db.collection("chats")
            .doc(chatId)
            .update({
              seen,
            })
            .then(() => {
              setMessageAlert(false);
              history.push({
                state: false,
              });
            });
        });
    }
  };

  useEffect(() => {
    const length = messages.length;
    setLastMessage({
      date: new Date(messages[length - 1].timestamp).toLocaleDateString(),
      time: new Date(messages[length - 1].timestamp).toLocaleTimeString(),
    });

    const chatHeader = users.filter((user) => user.uid !== uid);
    setChatMsgHeader(chatHeader[0].displayName);

    console.log("snapshot listener firing...", chatId);
    db.collection("chats")
      .doc(chatId)
      .onSnapshot((snapshot) => {
        const data = { ...snapshot.data(), id: chatId };
        if (data) {
          const { seen } = data;
          setMsgs(data.messages);
          if (!seen[uid]) {
            setMessageAlert(true);
            history.push({
              state: true,
            });
          }
        }
      });
  }, [messages]);

  return (
    <div className="card myCard unique-color-dark mb-1 text-white">
      {showMessages ? (
        <MessageModal
          handleClick={handleClick}
          messages={msgs}
          messageBetween={chatMsgHeader}
          users={users}
          chatId={chatId}
        />
      ) : null}
      <div className="card-header messageHeader" onClick={handleClick}>
        <div className="chatMsg">
          <h3>{chatMsgHeader}</h3>
          <div className="messageAlerts">
            <p className="messageText">{`Messages: ${msgs.length}`}</p>
            {messageAlert ? <NewMessageAlert /> : null}
          </div>
        </div>
        <p className="lastMessage">{`Last message: ${lastMessage.date} at ${lastMessage.time}`}</p>
      </div>
    </div>
  );
};

export default CardMessage;
