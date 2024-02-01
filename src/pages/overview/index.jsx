import React, { useState } from "react";
import "../../css/Overview.css";
import { PageTitle } from "../../components";
import ReactApexChart from "react-apexcharts";
import { lastWeek, surplus } from "../../contexts/overview";
const Overview = () => {
  return (
    <div className="Overview">
      <PageTitle title="Overview" />
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
            options={lastWeek[0].options}
            series={lastWeek[0].series}
            type="bar"
            height={350}
            style={{ margin: "20px 10px 10px 5px" }}
          />
        </div>
        <div className="Surplus table">
          <span className="Title">Surplus Fluctuations</span>
          <ReactApexChart
            options={surplus[0].options}
            series={surplus[0].series}
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
  );
};

export default Overview;
