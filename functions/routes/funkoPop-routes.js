const express = require("express");
const {
  bulkAddFunkoPop,
  getAllFunkoPops,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
  userAddFunkoPop,
} = require("../controllers/funkoPopController");
const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/bulkAdd", bulkAddFunkoPop);
router.post("/userAdd", userAddFunkoPop);

router.get("/getAll", getAllFunkoPops);
router.get("/getName/:name", getFunkoPopName);
router.get("/getGenre/:genre", getFunkoPopGenre);
router.get("/search/:query", getFunkoPopQuery);

module.exports = {
  routes: router,
};
