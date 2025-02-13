import React from "react";
import { Link } from "react-router-dom";

const CardHeader = (props) => {
  return (
    <div className="card-header">
      <div className="d-flex align-items-center justify-content-between">
        <h5>{props.title}</h5>
        {props.hide == undefined ? (
          <Link className="btn main-btn" to={`${props.link}`}>
            {props.btn_name}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CardHeader;
