const firebase = require("../db");
const User = require("../models/user");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res, next) => {
  try {
    const user = req.body;
    const uiDoc = await firestore.collection("users").doc(user.uid);
    const data = await uiDoc.get();
    if (data.exists) {
      const token = jwt.sign(
        {
          uid: data.data().user.uid,
        },
        process.env.TOKEN_SECRET
      );
      res.header("auth-token", token).send(token);
    } else {
      await uiDoc.set({ user });
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

module.exports = {
  signUpUser,
};
