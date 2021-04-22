const firebase = require("../db");
const User = require("../models/user");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
// const checkForChat = require("../helpers/checkForChat");

const signUpUser = async (req, res, next) => {
  try {
    const user = req.body;
    console.log({ user });
    const timestamp = admin.firestore.Timestamp.now();
    const formatTime = timestamp.toDate();

    const uidDoc = await firestore.collection("users").doc(user.uid);
    const data = await uidDoc.get();
    if (data.exists) {
      const token = jwt.sign(
        {
          uid: data.data().user.uid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    } else {
      await uidDoc.set(Object.assign({ user }, { signedUp: formatTime }));
      const token = jwt.sign(
        {
          uid: user.uid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const user = req.body;
    console.log({ user });

    const uidDoc = await firestore.collection("users").doc(user.uid);
    const data = await uidDoc.get();
    if (data.exists) {
      const token = jwt.sign(
        {
          uid: data.data().user.uid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    } else {
      res.status(400).send("No User Records");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addFunkoPopTooUser = async (req, res) => {
  try {
    const { uid, funko } = req.body;
    const funkoPop = new FunkoPop(funko);
    if (funkoPop.error) {
      res.status(422).send({ funkoPop });
    } else {
      const dbUser = await firestore.collection("users").doc(uid);
      const userData = await dbUser.get();
      // user collection
      if (userData.exists && funko.user) {
        const userFunkoPopCollection = await firestore
          .collection("users")
          .doc(uid)
          .collection("userFunkoPops")
          .doc(funkoPop.genre);
        const userFunkoData = await userFunkoPopCollection.get();
        if (userFunkoData.exists) {
          let newFunkoData = [];
          const dbFunkoData = userFunkoData.data().funkoData;
          dbFunkoData.map((dbFunko) => {
            newFunkoData.push(dbFunko);
          });
          newFunkoData.push(funkoPop.funkoData[0]);
          await userFunkoPopCollection.update({
            funkoData: newFunkoData,
          });
          console.log("funko pop added to collection: ", funkoPop);
          res.status(200).send({
            genre: funkoPop.genre,
            funkoData: newFunkoData,
          });
        } else {
          await userFunkoPopCollection.set(funkoPop);
          console.log("funko pop added to collection: ", funkoPop);
          res.status(200).send(funkoPop);
        }
        // want list collection
      } else if (userData.exists && funko.want) {
        const wantFunkoPopCollection = await firestore
          .collection("users")
          .doc(uid)
          .collection("userWantList")
          .doc(funkoPop.genre);
        const wantFunkoData = await wantFunkoPopCollection.get();
        if (wantFunkoData.exists) {
          let newFunkoData = [];
          const dbFunkoData = wantFunkoData.data().funkoData;
          dbFunkoData.map((dbFunko) => {
            newFunkoData.push(dbFunko);
          });
          newFunkoData.push(funkoPop.funkoData[0]);
          await wantFunkoPopCollection.update({
            funkoData: newFunkoData,
          });
          console.log("funko pop added to want list: ", funkoPop);
          res.status(200).send(funkoPop);
        } else {
          await wantFunkoPopCollection.set(funkoPop);
          console.log("funko pop added to want list: ", funkoPop);
          res.status(200).send(funkoPop);
        }
      } else {
        res.status(404).send("User does not exist!");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const removeFunkoPopFromUser = async (req, res) => {
  try {
    const { uuid, uid, genre } = req.body;
    console.log("remove funko pop from collection: ", uuid);
    const userFunkoPopCollection = await firestore
      .collection("users")
      .doc(uid)
      .collection("userFunkoPops")
      .doc(genre);
    const userFunkoData = await userFunkoPopCollection.get();
    if (userFunkoData.exists) {
      const dbFunkoDatadata = userFunkoData.data().funkoData;
      const newFunkoPopArr = dbFunkoDatadata.filter(
        (funkoPop) => funkoPop.uuid !== uuid
      );
      if (newFunkoPopArr.length > 0) {
        await userFunkoPopCollection.update({
          funkoData: newFunkoPopArr,
        });
        res.status(200).send(newFunkoPopArr);
      } else {
        await userFunkoPopCollection.delete();
        res.status(200).send(newFunkoPopArr);
      }
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const removeFunkoPopFromWant = async (req, res) => {
  try {
    const { uuid, uid, genre } = req.body;
    console.log("remove funko pop from want list: ", uuid);
    const userWantCollection = await firestore
      .collection("users")
      .doc(uid)
      .collection("userWantList")
      .doc(genre);
    const userFunkoData = await userWantCollection.get();
    if (userFunkoData.exists) {
      const dbFunkoData = userFunkoData.data().funkoData;
      const newFunkoPopArr = dbFunkoData.filter(
        (funkoPop) => funkoPop.uuid !== uuid
      );

      if (newFunkoPopArr.length > 0) {
        await userWantCollection.update({
          funkoData: newFunkoPopArr,
        });
        res.status(200).send(newFunkoPopArr);
      } else {
        await userWantCollection.delete();
        res.status(200).send(newFunkoPopArr);
      }
    } else {
      res.status(200).send([]);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

const getUserFunkoPops = async (req, res) => {
  try {
    const { uid } = req.params;
    const funkoArray = [];
    const userFunkoCollection = await firestore
      .collection("users")
      .doc(uid)
      .collection("userFunkoPops")
      .get();
    userFunkoCollection.forEach((doc) => {
      if (doc.exists) {
        const funkoPop = doc.data();
        funkoArray.push(funkoPop);
      }
    });
    res.status(200).send(funkoArray);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserWantList = async (req, res) => {
  try {
    const { uid } = req.params;
    const funkoArray = [];
    const userWantList = await firestore
      .collection("users")
      .doc(uid)
      .collection("userWantList")
      .get();
    userWantList.forEach((doc) => {
      if (doc.exists) {
        const funkoPop = doc.data();
        funkoArray.push(funkoPop);
      }
    });
    res.status(200).send(funkoArray);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const updateUserPhoto = async (req, res) => {
  try {
    const { uid, fileUpload } = req.body;
    const user = await firestore.collection("users").doc(uid);

    const userData = await user.get();

    console.log(userData.data());
    let data = userData.data().user;
    data.photoURL = fileUpload;
    console.log({ data });

    user.update({
      user: data,
    });
    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userRef = await firestore.collection("users");
    const queryRef = await userRef.orderBy("signedUp").get();
    const userArr = [];
    queryRef.forEach((doc) => {
      const displayName = doc.data().user.displayName;
      const photoURL = doc.data().user.photoURL;
      const time = doc.data().signedUp.toDate();
      const signedUp = time.toLocaleDateString();
      const uid = doc.data().user.uid;
      const user = {
        displayName: displayName,
        photoURL: photoURL,
        signedUp: signedUp,
        uid: uid,
      };

      userArr.push(user);
    });
    res.status(200).send(userArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// NOT IN USE
const getSelectedUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { collection, wantList } = req.body;
    const userRef = await firestore.collection("users").doc(uid);

    const userFunkoPops = await userRef.collection("userFunkoPops").get();

    const userWantList = await userRef.collection("userWantList").get();

    const selectedUserFunkoPopArr = [];
    const selectedUserWantListArr = [];

    // funkopops in user collection
    userFunkoPops.forEach((doc) => {
      const funkoSet = doc.data();
      selectedUserFunkoPopArr.push(funkoSet);
    });

    // funkopops in user want list
    userWantList.forEach((doc) => {
      const funkoSet = doc.data();
      selectedUserWantListArr.push(funkoSet);
    });

    res.status(200).send({ selectedUserFunkoPopArr, selectedUserWantListArr });
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const getSelectedUserCollection = async (req, res) => {
  try {
    const { uid } = req.params;
    const userRef = await firestore.collection("users").doc(uid);
    const userFunkoPops = await userRef.collection("userFunkoPops").get();

    const selectedUserFunkoPopsArr = [];
    userFunkoPops.forEach((doc) => {
      if (doc.exists) {
        const funkoSet = doc.data();
        selectedUserFunkoPopsArr.push(funkoSet);
      }
    });

    res.status(200).send(selectedUserFunkoPopsArr);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const getSelectedUserWantList = async (req, res) => {
  try {
    const { uid } = req.params;
    const userRef = await firestore.collection("users").doc(uid);
    const userWantList = await userRef.collection("userWantList").get();

    const selectedUserWantListArr = [];
    userWantList.forEach((doc) => {
      if (doc.exists) {
        const funkoSet = doc.data();
        selectedUserWantListArr.push(funkoSet);
      }
    });

    res.status(200).send(selectedUserWantListArr);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const sendMessageToChat = async (req, res) => {
  try {
    const { chatMessage, uids, users, chatId, selUserUID, userUID } = req.body;
    let newMessages = [];
    // let newSeenArr = [];

    if (!chatId) {
      const userID = users[0].uid;
      const selUserID = users[1].uid;
      const bothIDs = `${userID}||${selUserID}`;

      const chatRef = await firestore.collection("chats");
      const chatDocs = await chatRef
        .where("uids", "array-contains", bothIDs)
        .get();

      if (chatDocs.empty) {
        const doc = {
          messages: [chatMessage],
          uids: uids,
          users: users,
          lastMessageSent: chatMessage.timestamp,
          seen: {
            [userUID]: true,
            [selUserUID]: false,
          },
        };

        await firestore.collection("chats").add(doc);

        newMessages.push(doc, chatMessage);
        console.log("added Doc => ", doc);
      }

      chatDocs.forEach(async (doc) => {
        const docID = doc.id;
        let { messages } = doc.data();
        messages.push(chatMessage);
        newMessages.push(messages, chatMessage);
        await firestore
          .collection("chats")
          .doc(docID)
          .update({
            messages,
            lastMessageSent: chatMessage.timestamp,
            seen: {
              [userUID]: true,
              [selUserUID]: false,
            },
          });
        console.log("added messages => ", messages);
      });
    } else {
      const chatDocs = await firestore.collection("chats").doc(chatId).get();

      let { messages } = chatDocs.data();
      messages.push(chatMessage);
      newMessages.push(messages, chatMessage);
      await firestore
        .collection("chats")
        .doc(chatId)
        .update({
          messages,
          lastMessageSent: chatMessage.timestamp,
          seen: {
            [userUID]: true,
            [selUserUID]: false,
          },
        });
      console.log("added messages => ", messages);
    }
    res.status(200).send(newMessages);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

const getUserMessages = async (req, res) => {
  try {
    const { uid } = req.params;
    const chatRef = await firestore.collection("chats");
    let chatsArr = [];
    const chatDocs = await chatRef
      .where("uids", "array-contains", uid)
      .orderBy("lastMessageSent", "desc")
      .get();

    chatDocs.forEach((doc) => {
      const data = {
        ...doc.data(),
        id: doc.id,
      };
      chatsArr.push(data);
    });

    console.log(chatsArr);
    res.status(200).send(chatsArr);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error.message);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
  getUserWantList,
  removeFunkoPopFromUser,
  removeFunkoPopFromWant,
  updateUserPhoto,
  getAllUsers,
  getSelectedUser,
  getSelectedUserCollection,
  getSelectedUserWantList,
  sendMessageToChat,
  getUserMessages,
};
