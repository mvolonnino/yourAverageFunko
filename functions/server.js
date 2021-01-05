const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./congif");
const funkoPopRoutes = require("./routes/funkoPop-routes");
const { main } = require("./getFunkoData");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
  })
);
app.use(bodyParser.json());

app.use("/api", funkoPopRoutes.routes);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://youraveragefunko-vols8994.firebaseio.com",
});

const db = admin.firestore();

exports.app = functions.https.onRequest(app);

main();

app.listen(config.port, () =>
  console.log("APP is listening on url http://localhost:" + config.port)
);
