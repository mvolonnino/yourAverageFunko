import { useEffect, useState } from "react";

import { LoginPage, HomePage } from "./pages";
import { useDataLayerValue } from "./context/DataLayer";
import { auth } from "./fire";
import "./App.css";

function App() {
  const [{ user }, dispatch] = useDataLayerValue();
  const [loading, setLoading] = useState(true);
  console.log({ user });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        if (!user) {
          dispatch({
            type: "SET_USER",
            user: {
              uid: authUser.uid,
              displayName: authUser.displayName,
              email: authUser.email,
              photoUrl: authUser.photoURL,
              phoneNumber: authUser.phoneNumber,
              providerId: authUser.providerId,
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
