import { ValidRegister } from "../../utils/Valid.js";
import { postAPI } from "../../utils/fetchData";
import { getAPI } from "../../utils/fetchData";


export const register = (userRegister) => async (dispatch) => {
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
  } catch (err) {
    dispatch({ type: "ALERT", payload: { error: err.response.data.msg } });
  }
};

export const refreshToken = () => async (dispatch) => {
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
    dispatch({ type: "AUTH", payload: res.data });


    dispatch({ type: "ALERT", payload: {} });
  } catch (err) {
    dispatch({ type: "ALERT", payload: {} });

    // dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    // dispatch({ type: ALERT, payload: { error: err.response.data.msg } });
    // localStorage.removeItem("logged");
  }
};
