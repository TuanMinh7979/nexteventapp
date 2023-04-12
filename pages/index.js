import React from "react";
import Main from "../components/global/Main";
import { useDispatch } from "react-redux";
import { AuthContext } from "@/context/AuthContextProvider";
import { getEvents } from "@/redux/eventSlice";
import { useContext } from "react";
import { useEffect } from "react";
import Dashboard from "./dashboard";
const Index = () => {
  const { user, accessToken, refreshTokenHdl } = useContext(AuthContext);
  const dispatch = useDispatch();
  useEffect(() => {
    refreshTokenHdl();
  }, [dispatch]);
  useEffect(() => {
    //thay vi luu vao store ta se dispatch moi lan ung dung reload
    if (user && user._id) {
      dispatch(getEvents({ userId: user._id, token: accessToken }));
    }
  }, [accessToken]);
  return (
    <>
      <Dashboard></Dashboard>
    </>
  );
};

export default Index;