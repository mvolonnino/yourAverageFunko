const router = require("express").Router();
const {
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
} = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/addFunkoPop", verifyToken, addFunkoPopTooUser);
router.post("/uploadPhoto", verifyToken, updateUserPhoto);
router.post("/sendMessage", verifyToken, sendMessageToChat);

router.get("/getUserFunkoPops/:uid", getUserFunkoPops);
router.get("/getUserWantList/:uid", getUserWantList);
router.get("/getAll", getAllUsers);
router.get("/getSelectedUser/:uid", getSelectedUser);
router.get("/getSelectedUserCollection/:uid", getSelectedUserCollection);
router.get("/getSelectedUserWantList/:uid", getSelectedUserWantList);
router.get("/getUserMessages/:uid", verifyToken, getUserMessages);

router.delete("/deleteFunkoPop", removeFunkoPopFromUser);
router.delete("/deleteFromWant", removeFunkoPopFromWant);

module.exports = {
  routes: router,
};
