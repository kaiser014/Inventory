import React from "react";
import { Navigate } from "react-router-dom";
import MasterLayout from "../components/layouts/MasterLayout";

const PrivateRoute = () => {
  return !localStorage.getItem("token") ? (
    <Navigate to="/" />
  ) : (
    <MasterLayout />
  );
};
export default PrivateRoute;
