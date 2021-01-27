const firebase = require("../db");
const User = require("../models/user");
const FunkoPop = require("../models/funkoPop");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res, next) => {
  try {
    const user = req.body;
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
      await uidDoc.set({ user });
      const token = jwt.sign(
        {
          uid: user.uid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
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

const getUserFunkoPops = async (req, res) => {
  try {
    const { uid } = req.body;
    console.log({ uid });
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

module.exports = {
  signUpUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
};
