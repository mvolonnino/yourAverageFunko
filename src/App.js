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
            user: authUser.providerData[0],
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
