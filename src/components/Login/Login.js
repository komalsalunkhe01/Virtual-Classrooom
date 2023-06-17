import { Button } from "@material-ui/core";
import React from "react";
import logo from "../../assets/logo.jpg";
import { useLocalContext } from "../../context/context";
import "./style.css";
const Login = () => {
  const { login, loggedInUser } = useLocalContext();

  console.log(loggedInUser);
  return (
    <div className="login">
      <div className="login__sub">
        <h1 className="login__heading">LearnReck</h1>
        <img className="login__logo" src={logo} alt="Classroom" />

        <Button
          className="login__btn"
          variant="contained"
          color="default"
          onClick={() => login()}
        >
          Login Now!
        </Button>
      </div>
    </div>
  );
};

export default Login;
