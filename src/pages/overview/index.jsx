import React from "react";
import "../../css/Overview.css";
import { PageTitle } from "../../components";
import ReactApexChart from "react-apexcharts";
import {
  lastWeekData,
  surplusData,
  overviewData,
  walletData,
  thisMonthData,
  mostTransaction,
  budgetListData,
} from "../../contexts/overview";
import logo from "../.././assets/Logo.png";
const Overview = () => {
  return (
    <div className="Overview">
      <PageTitle title="Overview" />
      <section class="section dashboard">
        <div class="row Over_Wallet">
          <div class="col-lg-12">
            <div class="row">
              {/* Overview */}
              <div class="col-xxl-6 col-md-6">
                <div class="card info-card sales-card">
                  <div class="card-body">
                    <h5 class="card-title">Overview</h5>
                    <table class="table">
                      <tbody>
                        {overviewData.map((item) => (
                          <tr>
                            <td>{item.name}</td>
                            <td
                              className={
                                item.money < 0 ? "tdMoney red" : "tdMoney green"
                              }
                            >
                              {item.money} đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Wallet */}
              <div class="col-xxl-6 col-md-6">
                <div class="card info-card revenue-card">
                  <div class="card-body">
                    <h5 class="card-title">Wallet</h5>
                    <table class="table">
                      <tbody>
                        {walletData.map((item) => (
                          <tr>
                            <td>{item.name}</td>
                            <td
                              className={
                                item.money < 0 ? "tdMoney red" : "tdMoney green"
                              }
                            >
                              {item.money} đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section dashboard">
        <div class="row Month">
          <div class="col-lg-12">
            <div class="row">
              {/* Last Month */}
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Last Month</h5>
                    <ReactApexChart
                      options={thisMonthData[0].options}
                      series={thisMonthData[0].series}
                      type={thisMonthData[0].options.chart.type}
                    />
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        {walletData.map((item) => (
                          <tr>
                            <td className={item.money < 0 ? "red" : "green"}>
                              {item.money} đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* This Month */}
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">This Month</h5>
                    <ReactApexChart
                      options={thisMonthData[0].options}
                      series={thisMonthData[0].series}
                      type={thisMonthData[0].options.chart.type}
                    />
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        {walletData.map((item) => (
                          <tr>
                            <td className={item.money < 0 ? "red" : "green"}>
                              {item.money} đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* Next Month */}
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Next Month</h5>
                    <ReactApexChart
                      options={thisMonthData[0].options}
                      series={thisMonthData[0].series}
                      type={thisMonthData[0].options.chart.type}
                    />
                  </div>
                  <div class="card-body">
                    <table class="table">
                      <tbody>
                        {walletData.map((item) => (
                          <tr>
                            <td className={item.money < 0 ? "red" : "green"}>
                              {item.money} đ
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section dashboard">
        <div className="row Last_Surplus">
          {/* Last 7 days */}
          <div className="col-6">
            <div className="card">
              <div class="card-body">
                <h5 class="card-title">Last 7 days</h5>
              </div>
              <ReactApexChart
                options={lastWeekData[0].options}
                series={lastWeekData[0].series}
                type={lastWeekData[0].options.chart.type}
                height={350}
              />
            </div>
          </div>
          {/* Surplus */}
          <div className="col-6">
            <div className="card">
              <div class="card-body">
                <h5 class="card-title">Surplus</h5>
              </div>
              <ReactApexChart
                options={surplusData[0].options}
                series={surplusData[0].series}
                type={surplusData[0].options.chart.type}
                height={350}
              />
            </div>
          </div>
        </div>
      </section>
      <section class="section dashboard">
        <div className="row MostTransaction">
          {/* Most recent transaction */}
          <div class="col-6">
            <div class="card top-selling overflow-auto">
              <div class="card-body pb-0">
                <h5 class="card-title">Most recent transaction</h5>

                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Time</th>
                      <th scope="col" className="thCate">
                        Category
                      </th>
                      <th scope="col">Wallet</th>
                      <th scope="col">Money</th>
                      <th scope="col">Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mostTransaction.map((item) => (
                      <tr>
                        <td>{item.time}</td>
                        <td
                          className={
                            item.money < 0 ? "tdCateRed" : "tdCateGreen"
                          }
                        >
                          <div>{item.category}</div>
                        </td>
                        <td>{item.wallet}</td>
                        <td className={item.money < 0 ? "red" : "green"}>
                          {item.money}
                        </td>
                        <td>{item.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Budget List */}
          <div class="col-6">
            <div class="card top-selling overflow-auto">
              <div class="card-body">
                <h5 class="card-title">Budget List</h5>
                <table class="table table-borderless">
                  <tbody>
                    {budgetListData.map((item) => (
                      <tr>
                        <th scope="row">
                          <img src={logo} alt="" />
                        </th>
                        <td style={{ width: "100%" }}>
                          <table class="table table-borderless">
                            <tbody>
                              <tr>
                                <td scope="col" className="tdStartDay">
                                  {item.startDate}
                                </td>
                                <th scope="col" className="thPercent">
                                  {item.percent} %
                                </th>
                                <td scope="col" className="tdEndDay">
                                  {item.endDate}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3}>
                                  <div class="progress">
                                    <div
                                      class="progress-bar"
                                      role="progressbar"
                                      style={{ width: `${item.percent}%` }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td scope="col" className="tdStartDay">
                                  {item.startMoney} đ
                                </td>
                                <th></th>
                                <td scope="col" className="tdEndDay">
                                  {item.endMoney} đ
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
