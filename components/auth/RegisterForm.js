import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authAction";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { postAPI } from "../../utils/fetchData";
import { ValidRegister } from "@/utils/Valid";
const RegisterForm = () => {
  const initState = { name: "", account: "", password: "", cf_password: "" };

  const [userRegister, setUserRegister] = useState(initState);
  const { name, account, password, cf_password } = userRegister;
  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const dispatch = useDispatch();

  const hdlChangInput = (e) => {
    const { value, name } = e.target;
    setUserRegister({ ...userRegister, [name]: value });
  };

  const router = useRouter()
  const hdlSubmit = async (e) => {
    e.preventDefault();
    const check = ValidRegister(userRegister);

    if (check.errLength > 0) {
      return dispatch({
        type: "ALERT",
        payload: { error: check.errMsg },
      });
    }
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });
      const res = await postAPI("/auth/register", userRegister);

      dispatch({ type: "ALERT", payload: { success: "Register Success!" } });
      router.push("/login")
    } catch (err) {
      console.log(err)
      dispatch({ type: "ALERT", payload: { error: err.response.data.msg } });
    }
  };







  return (
    <form onSubmit={hdlSubmit}>
      <div className="form-group">
        <label htmlFor="account">Name </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          style={{ width: "100%", border: "1px solid black" }}
          onChange={hdlChangInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="account">Email/ Phone/ </label>
        <input
          type="text"
          style={{ width: "100%", border: "1px solid black" }}
          id="account"
          name="account"
          value={account}
          onChange={hdlChangInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">password </label>
        <div className="pass">
          <input
            type={typePass ? "text" : "password"}
            style={{ width: "100%", border: "1px solid black" }}
            id="password"
            name="password"
            value={password}
            onChange={hdlChangInput}
          />
          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Confirm password </label>
        <div className="pass">
          <input
            type={typeCfPass ? "text" : "password"}
            style={{ width: "100%", border: "1px solid black" }}
            id="cf_password"
            name="cf_password"
            value={cf_password}
            onChange={hdlChangInput}
          />
          <small onClick={() => setTypeCfPass(!typeCfPass)}>
            {typeCfPass ? "Hide" : "Show"}
          </small>
        </div>
      </div>
      <div className="flex">
        {" "}
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            margin: "16px auto",
            width: "60%",
            padding: "6px",
            borderRadius: "12px",
          }}
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
