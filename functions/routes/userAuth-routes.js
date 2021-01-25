const router = require("express").Router();
const {
  signUpUser,
  addFunkoPopTooUser,
} = require("../controllers/userController");

router.post("/signup", signUpUser);
router.post("/addFunkoPop", addFunkoPopTooUser);

module.exports = {
  routes: router,
};
