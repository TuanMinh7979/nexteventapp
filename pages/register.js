import React from "react";
import Link from "next/link";
import RegisterForm from "../components/auth/RegisterForm";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";
const Register = () => {
  const themeContext = useContext(ThemeContext);
  const { active } = themeContext;
  const theme = themeContext[active];

  return (
    <div
      className="auth_page"
      style={{
        backgroundColor: theme.bodyColor,
        height: "100vh",
      }}
    >
      <div className="auth_box">
        <h3 className="text-uppecase text-center mb-4">Register</h3>
        <RegisterForm />

        <p>
          {`Already have an account?`}
          <Link href="/login"> Login now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
