const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./congif");
const logger = require("morgan");
// const { main } = require("./getFunkoData");

const app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

// IMPORT ROUTES
const funkoPopRoutes = require("./routes/funkoPop-routes");
const userRoutes = require("./routes/userAuth-routes");

// MIDDLEWARE ROUTES
app.use("/api/funkoPop", funkoPopRoutes.routes);
app.use("/api/user", userRoutes.routes);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://youraveragefunko-vols8994.firebaseio.com",
});
const db = admin.firestore();

exports.app = functions.https.onRequest(app);

app.listen(config.port, () =>
  console.log("APP is listening on url http://localhost:" + config.port)
);
