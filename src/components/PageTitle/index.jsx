import React from "react";
import { ROUTE_CONSTANTS } from "../../constants";
import { Link } from "react-router-dom";


const PageTitle = ({ title }) => {
  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={ROUTE_CONSTANTS.OVERVIEW_PAGE}>Trang chủ</Link>
          </li>
          <li className="breadcrumb-item active">{title}</li>
        </ol>
      </nav>
    </div>
  );
};

export default PageTitle;
