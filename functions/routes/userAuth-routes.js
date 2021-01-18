const router = require("express").Router();
const { signUpUser } = require("../controllers/userController");

router.post("/signup", signUpUser);

module.exports = {
  routes: router,
};
