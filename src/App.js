import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LoginPage, HomePage, FunkosPage } from "./pages";
import { useDataLayerValue } from "./context/DataLayer";
import { auth } from "./fire";
import "./App.css";
import { Navbar } from "./components";
import API from "./utils/API";

function App() {
  const [{ user, authToken }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const {
          uid,
          displayName,
          email,
          photoURL,
          phoneNumber,
          providerData,
        } = authUser;

        if (!user) {
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
                  photoUrl: photoURL,
                  phoneNumber: phoneNumber,
                  providerId: providerData[0].providerId,
                },
              });
            }
          });
        }
      }

      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <div className="loader">Your Average Funko</div>;
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
