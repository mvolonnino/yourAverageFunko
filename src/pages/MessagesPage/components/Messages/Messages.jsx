import { useEffect, useState, useContext } from "react";

import "./Messages.css";
import { API } from "../../../../utils";
import { UserContext } from "../../../../context";
import { CardMessage } from "../../components";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const { userState } = useContext(UserContext);
  const { uid } = userState.user;
  const { authToken } = userState;

  useEffect(() => {
    if (chats.length === 0) {
      console.log("fetching user messages...");
      API.getUserMessages(authToken, uid)
        .then((res) => {
          const { data } = res;
          setChats(data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="messagesContainer">
      <h1>My Messages</h1>
      {chats?.map((chat, i) => {
        const { id, messages, users, seen } = chat;
        return (
          <CardMessage
            key={id}
            messages={messages}
            users={users}
            chatId={id}
            setChats={setChats}
            chats={chats}
            index={i}
            seen={seen}
          />
        );
      })}
    </div>
  );
};

export default Messages;
