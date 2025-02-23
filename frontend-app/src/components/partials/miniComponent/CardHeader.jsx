import React from "react";
import { Link } from "react-router-dom";
import GlobalFunction from "../../../GlobalFunction";

const CardHeader = (props) => {
  return (
    <div className="card-header">
      <div className="d-flex align-items-center justify-content-between">
        <h5>{props.title}</h5>
        {props.hide == undefined || GlobalFunction.isAdmin() ? (
          <Link className="btn main-btn" to={`${props.link}`}>
            <i className={`fa-solid ${props.icon}`}></i> {props.btn_name}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CardHeader;
