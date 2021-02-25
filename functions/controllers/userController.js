const firebase = require("../db");
const User = require("../models/user");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");

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
      if (userData.exists) {
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
          res.status(200).send({
            genre: funkoPop.genre,
            funkoData: newFunkoData,
          });
        } else {
          await userFunkoPopCollection.set(funkoPop);
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
    const userFunkoPopCollection = await firestore
      .collection("users")
      .doc(uid)
      .collection("userFunkoPops")
      .doc(genre);
    const userFunkoData = await userFunkoPopCollection.get();
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
      const user = {
        displayName: displayName,
        photoURL: photoURL,
        signedUp: signedUp,
      };

      userArr.push(user);
    });
    res.status(200).send(userArr);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  signUpUser,
  signInUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
  removeFunkoPopFromUser,
  getAllUsers,
};
