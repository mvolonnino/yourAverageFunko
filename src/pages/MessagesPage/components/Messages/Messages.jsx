import { useEffect, useContext } from "react";

import "./Messages.css";
import { API } from "../../../../utils";
import { UserContext } from "../../../../context";
import { CardMessage } from "../../components";

const Messages = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { uid } = userState.user;
  const { authToken, chats } = userState;

  useEffect(() => {
    if (chats.length === 0) {
      console.log("fetching user messages...");
      API.getUserMessages(authToken, uid)
        .then((res) => {
          const { data } = res;
          userDispatch({
            type: "SET_CHATS",
            chats: data,
          });
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
          <CardMessage key={id} messages={messages} users={users} chatId={id} />
        );
      })}
      {chats.length === 0 ? (
        <div className="justify-content-center">
          Looks like you have no messages yet, check out our other users and
          send a message to see them here!
        </div>
      ) : null}
    </div>
  );
};

export default Messages;
