import React from 'react';
import Header from "../Components/Header/Header";
import "../CSS/Overview.css";

const Overview = ({ toggleSidebar }) => {

    return (
        <div className="Overview">
        <Header toggleSidebar={toggleSidebar} />
        Overview
      </div>
    );
};

export default Overview;