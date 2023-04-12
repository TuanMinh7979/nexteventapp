import React, { useState, useEffect } from "react";

import LoginPass from "../components/auth/LoginPass";
import { AuthContext } from "../context/AuthContextProvider";
import { ThemeContext } from "../context/ThemeContextProvider";
import { useContext } from "react";
import { useRouter } from 'next/router';
import SocialLogin from "@/components/auth/SocialLogin";
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const { user, accessToken } = useContext(AuthContext);

  useEffect(() => {

    if (accessToken) {
      let url = "/";

      router.push(url);
    }
  }, [accessToken]);
  return (
    <AuthContext.Consumer>
      {(authContextState) => {
        return (
          <ThemeContext.Consumer>
            {(ThemeContextState) => {
              const { active } = ThemeContextState;
              const theme = ThemeContextState[active];
              return (
                <div
                  style={{
                    backgroundColor: theme.bodyColor,
                    height: "100vh",
                  }}
                >
                  <div
                    className="auth_page"
                    style={{
                      backgroundColor: theme.bodyColor,
                      color: "black",
                    }}
                  >
                    <div className="auth_box">
                      <h3
                        style={{ fontWeight: "bold" }}
                        className="text-uppecase text-center mb-4"
                      >
                        LOGIN
                      </h3>
                      <SocialLogin
                        navigate={router.push}
                        googleSignIn={authContextState.googleSignIn}
                      ></SocialLogin>
                      <LoginPass loginHdl={authContextState.loginHdl} />

                      <small
                        className="row-auto my-2 text-primary"
                        style={{ cursor: "pointer" }}
                      >
                        <Link href="/forgot_password" className="">
                          Forgot password?
                        </Link>
                      </small>

                      <p>
                        You dont have an account?<Link href="/register"> Register now</Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            }}
          </ThemeContext.Consumer>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default Login;
