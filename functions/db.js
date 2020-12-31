const firebase = require("firebase");
const config = require("./congif");

const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;
