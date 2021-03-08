const router = require("express").Router();
const {
  signUpUser,
  signInUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
  getUserWantList,
  removeFunkoPopFromUser,
  removeFunkoPopFromWant,
  getAllUsers,
} = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/addFunkoPop", verifyToken, addFunkoPopTooUser);

router.get("/getUserFunkoPops/:uid", getUserFunkoPops);
router.get("/getUserWantList/:uid", getUserWantList);
router.get("/getAll", getAllUsers);

router.delete("/deleteFunkoPop", removeFunkoPopFromUser);
router.delete("/deleteFromWant", removeFunkoPopFromWant);

module.exports = {
  routes: router,
};
