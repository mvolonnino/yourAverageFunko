const express = require("express");
const {
  addFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
} = require("../controllers/funkoPopController");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/add", addFunkoPop);
router.get("/getAll", getAllFunkoPops);
router.get("/getName/:name", getFunkoPopName);
router.get("/getGenre/:genre", getFunkoPopGenre);
router.get("/search/:query", getFunkoPopQuery);

module.exports = {
  routes: router,
};
