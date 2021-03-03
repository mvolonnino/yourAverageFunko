import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "./Login.css";
import wavingPikachu from "../../../../img/waving-pikachu.png";
import thorEndgame from "../../../../img/thor-endgame.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../../../fire";
import { AlertError } from "../../../../components";
import {
  API,
  chooseProvider,
  createNewUser,
  signInWithProvider,
} from "../../../../utils";
import { UserContext } from "../../../../context";

function Login() {
  const { userState, userDispatch } = useContext(UserContext);
  const { authToken } = userState;
  const [elementsObj, setElementsObj] = useState({});
  const [userObj, setUserObj] = useState({});
  const [err, setErr] = useState("");
  const history = useHistory();

  const addSignUpMode = () => {
    elementsObj.container.classList.add("sign-up-mode");
    setErr("");
  };

  const remSignUpMode = () => {
    elementsObj.container.classList.remove("sign-up-mode");
    setErr("");
  };

  const handleChange = (e, type) => {
    if (err) {
      setErr("");
    }
    setUserObj({
      ...userObj,
      [type]: e.target.value,
    });
  };

  const setToken = (token) => {
    if (!authToken) {
      userDispatch({
        type: "SET_AUTHTOKEN",
        authToken: token,
      });
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { displayName, email, password } = userObj;
    if (err) {
      setErr("");
    }
    if (displayName && email && password) {
      const backendServer = await fetch("/status");
      const { status } = backendServer;
      if (status === 200) {
        createNewUser(userObj)
          .then((res) => {
            history.push("/home");
            const { data } = res.config;
            const authToken = res.data;
            const user = JSON.parse(data);
            setToken(authToken);
            userDispatch({
              type: "SET_USER",
              user,
            });
          })
          .catch((error) => {
            console.error({ error });
            const { message } = error;
            setErr(message);
          });
      } else setErr(backendServer.statusText);
    } else setErr("All fields need to be filled out!");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const { email, password } = userObj;

    if (err) {
      setErr("");
    }

    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          const { uid } = res.user;
          localStorage.setItem("userSignedIn", JSON.stringify(uid));
          history.push("/home");
        })
        .catch((error) => {
          const { code, message } = error;
          console.error({ code, message });
          setErr(message);
        });
    } else setErr("Email and Password must be filled out");
  };

  const handleAuthLogin = (e) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    const provider = chooseProvider(value);

    signInWithProvider(provider)
      .then((res) => {
        if (res.newUser) {
          history.push("/home");
          const { data } = res.res.config;
          const user = JSON.parse(data);
          const authToken = res.res.data;
          setToken(authToken);
          userDispatch({
            type: "SET_USER",
            user,
          });
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.error({ code, message });
        setErr(message);
      });
  };

  useEffect(() => {
    setElementsObj({
      container: document.querySelector(".login"),
    });
  }, []);

  return (
    <div className="login">
      <div className="forms-container">
        <div className="signin-signup">
          {/* sign in */}
          <form action="" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => handleChange(e, "email")}
              />
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
              />
              <div className="icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            {err && <AlertError err={err} />}
            <button
              type="submit"
              value="Login"
              className="button"
              onClick={handleSignIn}
            >
              Login
            </button>
            {/* social sign in */}
            <p className="social-text">Or Sign In with social platforms</p>
            <div className="social-media">
              <button
                className="social-icon"
                value="facebook"
                onClick={handleAuthLogin}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </button>
              <button
                className="social-icon"
                value="google"
                onClick={handleAuthLogin}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </button>
            </div>
          </form>
          {/* sign up */}
          <form action="" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <input
                type="text"
                placeholder="Display Name"
                onChange={(e) => handleChange(e, "displayName")}
              />
              <div className="icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => handleChange(e, "email")}
              />
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => handleChange(e, "password")}
              />
              <div className="icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
            </div>
            {err && <AlertError err={err} />}
            <button
              type="submit"
              value="Sign up"
              className="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            {/* social sign up */}
            <p className="social-text">Or Sign In with social platforms</p>
            <div className="social-media">
              <button
                className="social-icon"
                value="facebook"
                onClick={handleAuthLogin}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </button>
              <button
                className="social-icon"
                value="google"
                onClick={handleAuthLogin}
              >
                <FontAwesomeIcon icon={faGoogle} />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New Here?</h3>
            <p>Sign up for everything Funko.</p>
            <button
              className="button transparent"
              id="sign-up-btn"
              onClick={addSignUpMode}
            >
              Sign Up
            </button>
          </div>
          <img src={wavingPikachu} alt="waving funko" className="image" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Sign in for everything Funko.</p>
            <button
              className="button transparent"
              id="sign-in-btn"
              onClick={remSignUpMode}
            >
              Sign In
            </button>
          </div>
          <img src={thorEndgame} alt="waving funko" className="image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
