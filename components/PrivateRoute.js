import React from "react";
import { useRouter } from "next/router";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import { useEffect } from "react";
const PrivateRoute = ({ children }) => {
  const { accessToken } = useContext(AuthContext);
  const router = useRouter()

  useEffect(() => {
    if (!accessToken) {
      router.push('/login');
    }
  }, [accessToken]);

  if (accessToken) return children;
  return <>403 this page never reach </>;
};

export default PrivateRoute;
