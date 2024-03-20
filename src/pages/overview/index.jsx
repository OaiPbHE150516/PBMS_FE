import React, { useEffect, useState } from "react";
import "../../css/Overview.css";
import { PageTitle } from "../../components";
import ReactApexChart from "react-apexcharts";
import {
  lastWeekData,
  surplusData,
  walletData,
  thisMonthData,
} from "../../contexts/overview";
import logo from "../.././assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getTotalWallets, getWallets } from "../../redux/walletSlice";
import useAppSelector from "../../hooks/useAppSelector";
import * as dayjs from "dayjs";
import { getTransaction } from "../../redux/transactionSlice";
import { get7LastTransaction } from "../../redux/overviewLastTransactionSlice";

const OverViewCard = () => {
  const totalWallets = useAppSelector((state) => state.totalwallet.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalWallets());
  }, [dispatch]);
  return (
    <div class="col-xxl-6 col-md-6 card_Overview_Wallet">
      <div class="card info-card sales-card">
        <div class="card-body">
          <h5 class="card-title">Tổng quát</h5>
          <table class="table">
            <tbody>
              <tr>
                <th>Tổng tiền trong ví</th>
                <th className="tdMoney">{totalWallets.totalBalance}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const WalletViewCard = (data) => {
  const wallets = useAppSelector((state) => state.wallet.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWallets());
  }, []);

  return (
    <div class="col-xxl-6 col-md-6 card_Overview_Wallet">
      <div class="card info-card revenue-card">
        <div class="card-body">
          <h5 class="card-title">Ví</h5>
          <table class="table">
            <tbody>
              {wallets.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td
                    className={
                      item.balance < 0 ? "tdMoney red" : "tdMoney green"
                    }
                  >
                    {item.balance.toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LastMonthViewCard = () => {
  return (
    <div class="col-lg-4 card_Month">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tháng trước</h5>
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
                    {item.money.toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ThisMonthViewCard = () => {
  return (
    <div class="col-lg-4 card_Month">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tháng hiện tại</h5>
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
                    {item.money.toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const NextMonthViewCard = () => {
  return (
    <div class="col-lg-4 card_Month">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tháng tới</h5>
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
                    {item.money.toLocaleString("vi-VN")} đ
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Last7DaysViewCard = () => {
  const lastTransaction = useAppSelector((state) => state.lastTransaction.values);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get7LastTransaction());
  }, [dispatch]);

  const last7WeekData = [
    {
      series: [
        {
          name: "Thu nhập",
          data: Object.entries(lastTransaction).map(([key, transaction]) => transaction.totalAmountIn),
          color: "#00FF00",
        },
        {
          name: "Chi tiêu",
          data: Object.entries(lastTransaction).map(([key, transaction]) => transaction.totalAmountOut),
          color: "#FF0000",
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
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: Object.entries(lastTransaction).map(([key, transaction]) => `${transaction.dayDetail.dayStr}, ${transaction.dayDetail.monthYearStr}`),
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
            },
          },
        },
      },
    },
  ];

  return (
    <div className="col-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Các ngày gần nhất</h5>
        </div>
        <ReactApexChart
          options={last7WeekData[0].options}
          series={last7WeekData[0].series}
          type={last7WeekData[0].options.chart.type}
          height={350}
        />
      </div>
    </div>
  );
};

const SurplusViewCard = () => {
  return (
    <div className="col-6">
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Số dư</h5>
        </div>
        <ReactApexChart
          options={surplusData[0].options}
          series={surplusData[0].series}
          type={surplusData[0].options.chart.type}
          height={350}
        />
      </div>
    </div>
  );
};

const MostTransactionViewCard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.values);

  const retrieveValues = () => {
    dispatch(getTransaction());
  };

  useEffect(() => {
    retrieveValues();
  }, []);

  return (
    <div class="col-6">
      <div class="card top-selling overflow-auto">
        <div class="card-body pb-0">
          <h5 class="card-title">Các giao dịch gần nhất</h5>

          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Thời gian</th>
                <th scope="col" className="thCate">
                  Danh mục
                </th>
                <th scope="col">Ví</th>
                <th scope="col">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions.resultDTO) &&
                transactions.resultDTO.map((transaction, index) => (
                  <tr>
                    <td>{transaction.transactionDateMinus}</td>
                    <td
                      className={
                        parseFloat(transaction.totalAmount) < 0
                          ? "tdCateRed"
                          : "tdCateGreen"
                      }
                    >
                      <div>
                        <td>{transaction.category.nameVN}</td>
                      </div>
                    </td>
                    <td>{transaction.wallet.name}</td>
                    <td
                      className={
                        parseFloat(transaction.totalAmount) < 0
                          ? "red"
                          : "green"
                      }
                    >
                      {transaction.totalAmount.toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BudgetListViewCard = () => {
  const budgets = useAppSelector((state) => state.budget.values);
  const dispatch = useDispatch();
  const retrieveValues = () => {
    dispatch(getWallets());
};

useEffect(() => {
    retrieveValues();
}, []);
  return (
    <div class="col-6">
      <div class="card top-selling overflow-auto">
        <div class="card-body">
          <h5 class="card-title">Ngân sách</h5>
          <table class="table table-borderless">
            <tbody>
              {budgets.map((item) => (
                <tr>
                  <th scope="row">
                    <img src={logo} alt="" />
                  </th>
                  <td style={{ width: "100%" }}>
                    <table class="table table-borderless">
                      <tbody>
                        <tr>
                          <td scope="col" className="tdStartDay">
                            {dayjs(item.beginDate).format("DD/MM/YYYY")}
                          </td>
                          <th scope="col" className="thPercent">
                            {item.percentProgress} %
                          </th>
                          <td scope="col" className="tdEndDay">
                            {dayjs(item.endDate).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div class="progress">
                              <div
                                class="progress-bar"
                                role="progressbar"
                                style={{ width: `${item.percentProgress}%` }}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td scope="col" className="tdStartDay">
                            0 đ
                          </td>
                          <th></th>
                          <td scope="col" className="tdEndDay">
                            {item.targetAmount.toLocaleString("vi-VN")} đ
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
  );
};

const Overview = () => {
  return (
    <div className="Overview">
      <PageTitle title="Tổng quan" />
      <section className="section dashboard">
        <div className="row">
          <div className="col-md-4">
            <div className="row Overview_Wallet">
              <div className="col-lg-12">
                <OverViewCard />
              </div>
            </div>
            <div className="row Overview_Wallet">
              <div className="col-lg-12">
                <WalletViewCard />
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row Month">
              <div className="col-lg-4">
                <LastMonthViewCard />
              </div>
              <div className="col-lg-4">
                <ThisMonthViewCard />
              </div>
              <div className="col-lg-4">
                <NextMonthViewCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section dashboard">
        <div className="row Last_Surplus">
          <Last7DaysViewCard />
          <SurplusViewCard />
        </div>
      </section>
      <section class="section dashboard">
        <div className="row MostTransaction">
          <MostTransactionViewCard />
          <BudgetListViewCard />
        </div>
      </section>
    </div>
  );
};

export default Overview;
