import { useEffect, useState } from "react";

import { LoginPage, HomePage } from "./pages";
import { useDataLayerValue } from "./context/DataLayer";
import { auth } from "./fire";
import "./App.css";

function App() {
  const [{ user }, dispatch] = useDataLayerValue();
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
          providerId,
        } = authUser;

        if (!user) {
          dispatch({
            type: "SET_USER",
            user: {
              uid: uid,
              displayName: displayName,
              email: email,
              photoUrl: photoURL,
              phoneNumber: phoneNumber,
              providerId: providerId,
            },
          });
        }
      }

      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <div className="loader">Your Average Funko</div>;
  }

  return <div className="app">{user ? <HomePage /> : <LoginPage />}</div>;
}

export default App;
