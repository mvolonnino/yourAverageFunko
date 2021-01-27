const router = require("express").Router();
const {
  signUpUser,
  addFunkoPopTooUser,
  getUserFunkoPops,
} = require("../controllers/userController");
const verifyToken = require("../verifyToken");

router.post("/signup", signUpUser);
router.post("/addFunkoPop", verifyToken, addFunkoPopTooUser);

router.get("/getUserFunkoPops", getUserFunkoPops);

module.exports = {
  routes: router,
};
