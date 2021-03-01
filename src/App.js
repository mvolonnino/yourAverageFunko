import { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

import {
  LoginPage,
  HomePage,
  FunkosPage,
  ResultsPage,
  UsersPage,
} from "./pages";
import { auth } from "./fire";
import "./App.css";
import { Navbar, Loading } from "./components";
import { API } from "./utils";
import { UserContext, FunkosProvider, UsersProvider } from "./context";

// context

function App() {
  const { userState, userDispatch } = useContext(UserContext);
  const { user, authToken } = userState;
  // const [{ user, authToken }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const localSignIn = JSON.parse(localStorage.getItem("userSignedIn"));
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
                    userDispatch({
                      type: "SET_AUTH_TOKEN",
                      authToken: res.headers["auth-token"],
                    });
                  }
                  userDispatch({
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
          <FunkosProvider>
            <Navbar />
            <UsersProvider>
              <Switch>
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/funkos" component={FunkosPage} />
                <Route exact path="/results" component={ResultsPage} />
                <Route exact path="/users" component={UsersPage} />
              </Switch>
            </UsersProvider>
          </FunkosProvider>
        ) : (
          <Route exact path="/" component={LoginPage} />
        )}
      </div>
    </Router>
  );
}

export default App;
