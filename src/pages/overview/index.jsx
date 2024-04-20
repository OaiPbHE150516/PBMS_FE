import React, { useEffect, useState } from "react";
import "../../css/Overview.css";
import { PageHelper, PageTitle } from "../../components";
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
import { getBudgets } from "../../redux/budgetSlice";
import { getMostTransaction } from "../../redux/overviewMostTransactionSlice";
import { filterTransactionLastMonth } from "../../redux/filterTransactionLastSlice";
import { filterTransactionThisMonth } from "../../redux/filterTransactionThisSlice";
import { GoogleLogin } from "@react-oauth/google";
import { signin } from "../../redux/authenSlice";
import { getBalanceHistory } from "../../redux/balanceHistorySlice";

const OverViewCard = () => {
  const user = useAppSelector((state) => state.authen.user);
  const totalWallets = useAppSelector((state) => state.totalwallet.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalWallets());
  }, [user]);
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

const WalletViewCard = () => {
  const user = useAppSelector((state) => state.authen.user);
  const wallets = useAppSelector((state) => state.wallet.values);
  const activeWallets = wallets.filter(
    (item) => item.activeState.activeStateID === 1
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getWallets());
  }, [user]);
  return (
    <div class="col-xxl-6 col-md-6 card_Overview_Wallet">
      <div class="card info-card revenue-card">
        <div class="card-body">
          <h5 class="card-title">Ví</h5>
          <table class="table">
            <tbody>
              {activeWallets.map((item) => (
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
  const user = useAppSelector((state) => state.authen.user);
  const filterLastMonth = useAppSelector(
    (state) => state.filterTransactionLast
  );
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const series = filterLastMonth.categoryWithTransactionData.map(
    (item) => item.percentage
  );
  const labels = filterLastMonth.categoryWithTransactionData.map(
    (item) => item.categoryType.name
  );
  const labelColors = ["#00E396", "#FF0000", "#FFE15D"];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterTransactionLastMonth({ month, year }));
  }, [month, year, user]);

  const lastMonthTransaction = [
    {
      series: series,
      options: {
        chart: {
          width: 380,
          type: "donut",
        },
        labels: labels,
        colors: labelColors,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  ];
  return (
    <div class="col-lg-4 card_Month">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tháng trước</h5>
          <ReactApexChart
            options={lastMonthTransaction[0].options}
            series={lastMonthTransaction[0].series}
            type={lastMonthTransaction[0].options.chart.type}
          />
        </div>
        {user != null ? (
          <>
            <div class="card-body">
              <table class="table">
                <tbody>
                  {filterLastMonth.categoryWithTransactionData.map(
                    (item, index) => (
                      <tr key={index}>
                        <th>{item.categoryType.name}</th>
                        <td className="tdMoney">{item.totalAmountStr}</td>
                      </tr>
                    )
                  )}
                  <tr>
                    <th>Tổng</th>
                    <th className="tdMoney">
                      {filterLastMonth.totalAmountOfMonthStr}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const ThisMonthViewCard = () => {
  const user = useAppSelector((state) => state.authen.user);
  const filterThisMonth = useAppSelector(
    (state) => state.filterTransactionThis
  );

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const series = filterThisMonth.categoryWithTransactionData.map(
    (item) => item.percentage
  );
  const labels = filterThisMonth.categoryWithTransactionData.map(
    (item) => item.categoryType.name
  );
  const labelColors = ["#00E396", "#FF0000", "#FFE15D"];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterTransactionThisMonth({ month, year }));
  }, [month, year, user]);

  const thisMonthTransaction = [
    {
      series: series,
      options: {
        chart: {
          width: 380,
          type: "donut",
        },
        labels: labels,
        colors: labelColors,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    },
  ];
  return (
    <div class="col-lg-4 card_Month">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Tháng hiện tại</h5>
          <ReactApexChart
            options={thisMonthTransaction[0].options}
            series={thisMonthTransaction[0].series}
            type={thisMonthTransaction[0].options.chart.type}
          />
        </div>
        {user != null ? (
          <>
            {" "}
            <div class="card-body">
              <table class="table">
                <tbody>
                  {filterThisMonth.categoryWithTransactionData.map(
                    (item, index) => (
                      <tr key={index}>
                        <th>{item.categoryType.name}</th>
                        <td className="tdMoney">{item.totalAmountStr}</td>
                      </tr>
                    )
                  )}
                  <tr>
                    <th>Tổng</th>
                    <th className="tdMoney">
                      {filterThisMonth.totalAmountOfMonthStr}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Last7DaysViewCard = () => {
  const user = useAppSelector((state) => state.authen.user);
  const lastTransaction = useAppSelector(
    (state) => state.lastTransaction.values
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get7LastTransaction());
  }, [user]);

  const last7WeekData = [
    {
      series: [
        {
          name: "Thu nhập",
          data: Object.entries(lastTransaction).map(
            ([key, transaction]) => transaction.totalAmountIn
          ),
          color: "#00FF00",
        },
        {
          name: "Chi tiêu",
          data: Object.entries(lastTransaction).map(
            ([key, transaction]) => transaction.totalAmountOut
          ),
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
          categories: Object.entries(lastTransaction).map(
            ([key, transaction]) =>
              `${transaction.dayDetail.dayStr} ${transaction.dayDetail.monthYearStr}`
          ),
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString("vi-VN");
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
          <h5 className="card-title">7 ngày gần nhất</h5>
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
  const user = useAppSelector((state) => state.authen.user);
  const balanceHistory = useAppSelector((state) => state.balanceHistory.values);

  const dispatch = useDispatch();

  const wallets = useAppSelector((state) => state.wallet.values);

  const activeWallets = wallets.filter(
    (item) => item.activeState.activeStateID === 1
  );

  useEffect(() => {
    dispatch(getWallets());
  }, [user]);

  const [walletValue, setWalletValue] = useState(0);

  const handleWalletValueChange = (event) => {
    const selectedWalletID = parseInt(event.target.value);
    setWalletValue(selectedWalletID);
  };
  useEffect(() => {
    if (walletValue !== 0) {
      dispatch(getBalanceHistory({ walletID: walletValue }));
    }
  }, [walletValue, user]);

  const date = balanceHistory?.map((item) => item.date);

  const totalAmount = balanceHistory?.map((item) => item.totalAmount);

  const balanceData = [
    {
      series: [
        {
          name: "Total Amount",
          data: totalAmount,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: date,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val.toLocaleString("vi-VN");
            },
          },
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toLocaleString("vi-VN");
            },
          },
          // tickAmount: 10,
        },
      },
    },
  ];

  return (
    <div className="col-6">
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Số dư của ví</h5>
        </div>
        <div className="row" style={{ "margin-left": "20px" }}>
          <div className="col-md-1">Ví:</div>
          <div className="col-md-10">
            <select value={walletValue} onChange={handleWalletValueChange}>
              <option value={0}>---Chọn ví---</option>
              {activeWallets.map((item) => (
                <option value={item.walletID}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>


        <ReactApexChart
          options={balanceData[0].options}
          series={balanceData[0].series}
          type={balanceData[0].options.chart.type}
          height={350}
        />
      </div>
    </div>
  );
};

const MostTransactionViewCard = () => {
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const mostTransactions = useSelector((state) => state.mostTransaction.values);
  const [number, setNumber] = useState(5);
  useEffect(() => {
    dispatch(getMostTransaction(number));
  }, [user, number]);
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div class="col-6">
      <div class="card top-selling overflow-auto">
        <div class="card-body pb-0">
          <h5 class="card-title">Các giao dịch gần nhất</h5>
          <span>Số lượng giao dịch: </span>
          <select value={number} onChange={handleNumberChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Thời gian</th>
                <th scope="col">Danh mục</th>
                <th scope="col">Ví</th>
                <th scope="col">Số tiền</th>
              </tr>
            </thead>
            <tbody>
              {mostTransactions.map((transaction, index) => (
                <tr>
                  <td>{transaction.transactionDateMinus}</td>
                  <td
                    className={
                      parseFloat(transaction.category.categoryTypeID) !== 1
                        ? "red money"
                        : "green money"
                    }
                  >
                    <div>
                      <td>{transaction.category.nameVN}</td>
                    </div>
                  </td>
                  <td>{transaction.wallet.name}</td>
                  <td
                    className={
                      parseFloat(transaction.category.categoryTypeID) !== 1
                        ? "red money"
                        : "green money"
                    }
                  >
                    {transaction.category.categoryTypeID !== 1 ? "-" : "+"}
                    {transaction.totalAmountStr}
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
  const user = useAppSelector((state) => state.authen.user);
  const budgets = useAppSelector((state) => state.budget.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBudgets());
  }, [user]);

  return (
    <div class="col-6">
      <div class="card top-selling overflow-auto">
        <div class="card-body">
          <h5 class="card-title">Các hạn mức</h5>
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
                            {item.percentProgressStr}
                          </th>
                          <td scope="col" className="tdEndDay">
                            {dayjs(item.endDate).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3}>
                            <div className="container">
                              <div className="progress-bar progress-layer-1"></div>
                              <div
                                className="progress-bar progress-layer-2"
                                style={{
                                  width: `${Math.max(
                                    0,
                                    100 - item.percentProgress
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="col" className="tdStartDay">
                            0 đ
                          </th>
                          <th className="thPercent">{item.currentAmountStr}</th>
                          <th scope="col" className="tdEndDay">
                            {item.targetAmountStr}
                          </th>
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
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.authen.user);
  return (
    <div className="Overview">
      {user ? (
        <>
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
                  <div className="col-lg-6">
                    <ThisMonthViewCard />
                  </div>
                  <div className="col-lg-6">
                    <LastMonthViewCard />
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
        </>
      ) : (
        <>
          <PageHelper />
        </>
      )}
    </div>
  );
};

export default Overview;
