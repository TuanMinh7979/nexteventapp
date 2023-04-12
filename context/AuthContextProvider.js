import React, { createContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { auth } from "../config/fb.js";
import { postAPI } from "../utils/fetchData.js";
import { getAPI } from "../utils/fetchData.js";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();

  const changeAuth = (user, accessToken) => {
    setUser(user);
    setAccessToken(accessToken);
  };

  const googleSignIn = async () => {
    try {
      console.log("call google sign in---------------")
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);


      dispatch({ type: "ALERT", payload: { loading: true } });
      const loginRes = await postAPI("/auth/google_login", {
        email: res.user.email,
        name: res.user.displayName,
        picture: res.user.photoURL
      });
      const { user, accessToken } = loginRes.data;
      console.log("REcive", user, accessToken)
      setUser(user);
      setAccessToken(accessToken);
      dispatch({ type: "ALERT", payload: { loading: false } });
      localStorage.setItem("logged", "myusername");
    } catch (err) {
      // handle error
      console.log(err)
    }
  };

  const loginHdl = async (userLogin) => {
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      const loginRes = await postAPI("/auth/login", userLogin);
      const { user, accessToken } = loginRes.data;
      console.log("REcive", user, accessToken)
      setUser(user);
      setAccessToken(accessToken);

      dispatch({
        type: "ALERT",
        payload: { success: loginRes.data.msg },
      });

      localStorage.setItem("logged", "myusername");
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.msg },
      });
    }
  };

  const refreshTokenHdl = async () => {
    const logged = localStorage.getItem("logged");
    //if not logged return

    if (!logged) {
      //if logged thi khong refresh token
      return;
    }
    //if login get new token

    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await getAPI("auth/refresh_token");

      const { user, accessToken } = res.data;

      setUser(user);
      setAccessToken(accessToken);

      dispatch({ type: "ALERT", payload: {} });
    } catch (err) {
      dispatch({ type: "ALERT", payload: {} });
    }
  };

  const signOut = () => {
    setUser({});
    setAccessToken("");
    localStorage.setItem("logged", "");
    sessionStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        changeAuth,
        googleSignIn,
        signOut,
        loginHdl,
        refreshTokenHdl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;