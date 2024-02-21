import React, { useState } from "react";
import "../../css/Overview.css";
import { PageTitle } from "../../components";
import ReactApexChart from "react-apexcharts";
import { lastWeek, surplus } from "../../contexts/overview";
const Overview = () => {
  return (
    <div className="Overview">
      <PageTitle title="Overview" />
    </div>
  );
};

export default Overview;
