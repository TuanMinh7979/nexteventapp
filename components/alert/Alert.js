import React from "react";
import Loading from "./Loading";
import ToastSuccess from "./ToastSuccess";
import ToastDanger from "./ToastDanger";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
export const Alert = () => {
  const alertState = useSelector((state) => state.alertState);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    setShowAlert(true);

    let timeToShow = 1000
    if (alertState.error) {
      timeToShow = 10000
    }
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, timeToShow);

    return () => clearTimeout(timeout);
  }, [alertState]);


  return (
    showAlert && (<div >

      {alertState.loading && <Loading />}

      {alertState.success && (
        <>
          <ToastSuccess
            title="Success"
            body={alertState.success}
            bgColor="bg-success"
          />
        </>
      )}

      {alertState.error && (
        <ToastDanger
          title="Error"
          body={alertState.error}
          bgColor="bg-danger"
        />
      )}
    </div>)

  );
};

export const showSuccessMsg = (msg) => {
  return <div className="successMsg">{msg}</div>;
};

export const showErrorMsg = (msg) => {
  return <div className="errMsg">{msg}</div>;
};
