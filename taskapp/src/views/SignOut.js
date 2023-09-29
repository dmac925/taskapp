import React from "react";
import { useNavigate } from "react-router-dom";

const SignOut = (props) => {

  let navigate = useNavigate();
  return (
    <div className="secret_page">
      <h1>Thank you for visiting</h1>
      <button
        onClick={() => {
          props.logout();
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
};

export default SignOut;