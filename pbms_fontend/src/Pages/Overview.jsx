import React, { useState } from "react";
import Header from "../Components/Header/Header";
import "../CSS/Overview.css";
import ReactApexChart from "react-apexcharts";

const Overview = ({ toggleSidebar }) => {
  //Overview Last Week
  const [state, setState] = useState({
    series: [
      {
        name: "Spending",
        data: [44, 55, 57, 56, 61, 58, 63],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      yaxis: {
        title: {
          text: "VNĐ",
        },
      },
      fill: {
        opacity: 1,
        colors: ["#F70500", "#1D7100"],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " VNĐ";
          },
        },
      },
    },
  });

  //Surplus Fluctuations
  const [state1, setState1] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
    },
  });

  return (
    <div className="Overview">
      <Header toggleSidebar={toggleSidebar} />
      <div className="Screen">
        <div className="View_Wallet">
          <div className="View table">
            <span className="Title">Overview</span>
            <div className="TotalBudgetTransaction">
              <div className="TotalBudget">
                <span>Total Budget</span>
                <span>1.000.000 VNĐ</span>
              </div>
              <div className="TotalTransaction">
                <span>Total Transaction</span>
                <span>1.000.000 VNĐ</span>
              </div>
              <hr />
              <div className="Total">
                <span>Total</span>
                <span>1.000.000 VNĐ</span>
              </div>
            </div>
          </div>
          <div className="Wallet table">
            <span className="Title">Wallets</span>
            <div className="ListWallet">
              <div className="EachWallet">
                <span>Wallet 1</span>
                <span>1.000.000 VNĐ</span>
              </div>
              <div className="EachWallet">
                <span>Wallet 2</span>
                <span>1.000.000 VNĐ</span>
              </div>
              <div className="EachWallet">
                <span>Wallet 3</span>
                <span>1.000.000 VNĐ</span>
              </div>
              <div className="EachWallet">
                <span>Wallet 4</span>
                <span>1.000.000 VNĐ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="OverviewWeek_Surplus">
          <div className="OverviewWeek table">
            <span className="Title">Overview Last Week</span>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
              style={{ margin: "20px 10px 10px 5px" }}
            />
          </div>
          <div className="Surplus table">
            <span className="Title">Surplus Fluctuations</span>
            <ReactApexChart
              options={state1.options}
              series={state1.series}
              type="line"
              height={330}
              style={{ margin: "20px 10px 10px 5px" }}
            />
          </div>
        </div>
        <div className="Transaction_Budget">
          <div className="TransactionFeatured table">
            <span className="Title">Featured transactions</span>
            <div className="ListTransaction">
              <div className="EachTrans">
                <span>Transaction 1</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachTrans">
                <span>Transaction 2</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachTrans">
                <span>Transaction 3</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachTrans">
                <span>Transaction 4</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachTrans">
                <span>Transaction 5</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
            </div>
          </div>
          <div className="BudgetFeatured table">
            <span className="Title">Featured Budget</span>
            <div className="ListBudget">
              <div className="EachBudget">
                <span>Budget 1</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachBudget">
                <span>Budget 2</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachBudget">
                <span>Budget 3</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachBudget">
                <span>Budget 4</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
              <div className="EachBudget">
                <span>Budget 5</span>
                <span>
                  <div>1.000.000 VNĐ</div>
                  <div>22/1/2023</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
