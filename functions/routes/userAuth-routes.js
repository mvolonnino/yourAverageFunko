const router = require("express").Router();
const {
  signUpUser,
  signInUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
  removeFunkoPopFromUser,
  getAllUsers,
} = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/addFunkoPop", verifyToken, addFunkoPopTooUser);

router.get("/getUserFunkoPops/:uid", getUserFunkoPops);
router.get("/getAll", getAllUsers);

router.delete("/deleteFunkoPop", removeFunkoPopFromUser);

module.exports = {
  routes: router,
};
