import React from "react";
import LoginTablet from "./LoginTablet";
import LoginPhone from "./LoginPhone";

const Login = () => {
  return (
    <div>
      <div className="phone:hidden tablet:block">
        <LoginTablet />
      </div>
      <div className="phone:block tablet:hidden">
        <LoginPhone />
      </div>
    </div>
  );
};

export default Login;
