const express = require("express");
const {
  bulkAddFunkoPop,
  getAllFunkoPops,
  getAndPostGenreList,
  getAllGenres,
  getFunkoPopName,
  getFunkoPopGenre,
  getFunkoPopQuery,
  userAddFunkoPop,
  getPickedGenre,
} = require("../controllers/funkoPopController");
// const verifyToken = require("../verifyToken");

const router = express.Router();

router.post("/bulkAdd", bulkAddFunkoPop);
router.post("/userAdd", userAddFunkoPop);

// gets and posts to DB
router.get("/getGenres", getAndPostGenreList);

router.get("/getAll", getAllFunkoPops);
router.get("/getAllGenres", getAllGenres);
router.get("/getPickedGenre/:genre", getPickedGenre);
router.get("/getName/:name", getFunkoPopName);
router.get("/getGenre/:genre", getFunkoPopGenre);
router.get("/search/:query", getFunkoPopQuery);

module.exports = {
  routes: router,
};
