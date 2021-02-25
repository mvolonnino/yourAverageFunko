import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  LoginPage,
  HomePage,
  FunkosPage,
  ResultsPage,
  UsersPage,
} from "./pages";
import { useDataLayerValue } from "./context/DataLayer";
import { auth } from "./fire";
import "./App.css";
import { Navbar, Loading } from "./components";
import API from "./utils/API";
import { useHistory } from "react-router-dom";

function App() {
  const [{ user, authToken }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const localSignIn = JSON.parse(localStorage.getItem("userSignedIn"));
        const { creationTime, lastSignInTime } = authUser.metadata;
        if (!user) {
          const {
            uid,
            displayName,
            email,
            photoURL,
            phoneNumber,
            providerData,
          } = authUser;

          if (displayName && localSignIn) {
            setLoading(true);
            // hit this login to get JWT from back end to be able to save funkos
            API.signInUser({
              uid,
              displayName,
              email,
              photoURL,
              phoneNumber,
              providerData,
            })
              .then((res) => {
                setLoading(false);
                if (res.status === 200) {
                  history.push("/home");
                  if (!authToken) {
                    dispatch({
                      type: "SET_AUTH_TOKEN",
                      authToken: res.headers["auth-token"],
                    });
                  }
                  dispatch({
                    type: "SET_USER",
                    user: {
                      uid: uid,
                      displayName: displayName,
                      email: email,
                      photoURL: photoURL,
                      phoneNumber: phoneNumber,
                      providerId: providerData[0].providerId,
                    },
                  });
                }
              })
              .catch((error) => console.error(error));
          }
        }
      }
    });
  }, [auth]);

  return (
    <Router>
      <div className="app">
        {loading ? (
          <Loading />
        ) : user ? (
          <>
            <Navbar />
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/funkos" component={FunkosPage} />
              <Route exact path="/results" component={ResultsPage} />
              <Route exact path="/users" component={UsersPage} />
            </Switch>
          </>
        ) : (
          <Route exact path="/" component={LoginPage} />
        )}
      </div>
    </Router>
  );
}

export default App;
