const express = require("express");
const { addFunkoPop } = require("../controllers/funkoPopController");

const router = express.Router();

router.post("/funkoPop", addFunkoPop);

module.exports = {
  routes: router,
};
