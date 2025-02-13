import React from "react";
import { Helmet } from "react-helmet";

const BreadCrumb = (props) => {
  return (
    <div>
      <Helmet>
        <title>{props.title} | System</title>
      </Helmet>
      <ol class="breadcrumb my-4">
        <li class="breadcrumb-item text-theme-light">Dashboard</li>
        <li class="breadcrumb-item active">{props.title}</li>
      </ol>
    </div>
  );
};

export default BreadCrumb;
