import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const CheckLogged = () => {
  const user = useAuth();

  if (user.logged) return <Navigate to="/home" />;
  return <Outlet />;
};

export default CheckLogged;