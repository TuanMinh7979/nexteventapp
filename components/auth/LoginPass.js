import React, { useState } from "react";
import { useDispatch } from "react-redux";

const LoginPass = ({ loginHdl }) => {
  const initState = { account: "", password: "" };

  const [userLogin, setUserLogin] = useState(initState);
  const { account, password } = userLogin;
  const [typePass, setTypePass] = useState(false);

  const dispatch = useDispatch();

  const hdlChangInput = (e) => {
    const { value, name } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const hdlSubmit = (e) => {
    e.preventDefault();
    loginHdl(userLogin);
  };

  return (
    <form
      // style={{ border: "1px solid red" }}
      class="loginPassForm"
      onSubmit={hdlSubmit}
    >
      <div>
        <label htmlFor="account">Email </label>
        <div>
          <input
            type="text"
            id="account"
            name="account"
            value={account}
            onChange={hdlChangInput}
            style={{ width: "100%", border: "1px solid black" }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="password">Password </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={hdlChangInput}
            style={{ width: "100%", border: "1px solid black" }}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: "blue",
          color: "white",
          margin: "16px auto",
          width: "60%",
          padding: "6px",
          borderRadius: "12px",
        }}
        disabled={account && password ? false : true}
      >
        Login
      </button>
    </form>
  );
};

export default LoginPass;
