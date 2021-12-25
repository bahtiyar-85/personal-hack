import React from "react";
import { useAuth } from "../../contexts/authContext";
import Shop from "../Shop/Shop";
import Login from "./Login";

const Auth = () => {
  const { user } = useAuth();
//   console.log('user', user);
  return <div>{user ? <Shop /> : <Login />}</div>;
};

export default Auth;
