const router = require("express").Router();
const {
  signUpUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
  removeFunkoPopFromUser,
  getAllUsers,
} = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/signup", signUpUser);
router.post("/addFunkoPop", verifyToken, addFunkoPopTooUser);

router.get("/getUserFunkoPops/:uid", getUserFunkoPops);
router.get("/getAll", getAllUsers);

router.delete("/deleteFunkoPop", removeFunkoPopFromUser);

module.exports = {
  routes: router,
};
