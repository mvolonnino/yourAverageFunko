const checkForChat = (values, chats) => {
  let correctChat = [];
  if (chats.length > 0) {
    chats.map((chat) => {
      let allFounded = values.every((match) => chat.users.includes(match));
      if (allFounded) {
        correctChat.push(chat);
      }
    });
  }

  return correctChat;
};

module.exports = checkForChat;
