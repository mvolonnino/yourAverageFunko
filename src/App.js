import { useEffect } from "react";
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
import { Navbar } from "./components";
import API from "./utils/API";
import LoadingComponent from "./utils/isLoading";

function App() {
  const [{ user, authToken, isLoading }, dispatch] = useDataLayerValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (!user) {
          const {
            uid,
            displayName,
            email,
            photoURL,
            phoneNumber,
            providerData,
          } = authUser;

          if (displayName) {
            API.signUpUser({
              uid,
              displayName,
              email,
              photoURL,
              phoneNumber,
              providerData,
            }).then((res) => {
              if (res.status === 200) {
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
            });
          }
        }
      }

      dispatch({
        type: "SET_IS_LOADING",
        isLoading: false,
      });
    });
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Router>
      <div className="app">
        {user ? (
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
