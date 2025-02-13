import React from "react";
import loader from "../../../assets/images/Infinity@1x-1.3s-200px-200px.svg";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
