import React, { useEffect, useState } from "react";
import "../../css/Overview.css";
import { PageHelper, PageTitle } from "../../components";
import ReactApexChart from "react-apexcharts";
import logo from "../.././assets/Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getTotalWallets, getWallets } from "../../redux/walletSlice";
import useAppSelector from "../../hooks/useAppSelector";
import * as dayjs from "dayjs";
import { get7LastTransaction } from "../../redux/overviewLastTransactionSlice";
import { getBudgets } from "../../redux/budgetSlice";
import { getMostTransaction } from "../../redux/overviewMostTransactionSlice";
import { filterTransactionLastMonth } from "../../redux/filterTransactionLastSlice";
import { filterTransactionThisMonth } from "../../redux/filterTransactionThisSlice";
import { getBalanceHistory } from "../../redux/balanceHistorySlice";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Progress from "../../components/Progress";

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

  const [showTable, setShowTable] = useState(false);
  return (
    <div class="col-xxl-6 col-md-6 card_Overview_Wallet">
      <div class="card info-card revenue-card">
        <div class="card-body">
          <div
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "space-between",
            }}
          >
            <Link to="/wallet">
              <h5 class="card-title">Ví</h5>
            </Link>
            <div class="card-text small">
              <div>
                <Form.Check
                  className="mb-0"
                  type="switch"
                  label=""
                  size={"lg"}
                  onChange={() => setShowTable(!showTable)}
                ></Form.Check>
              </div>
            </div>
          </div>

          {showTable && (
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
          )}
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

  const totalIn = filterLastMonth.categoryWithTransactionData.find(
    (item) => item.categoryType.categoryTypeID === 1
  );
  const totalOut = filterLastMonth.categoryWithTransactionData.find(
    (item) => item.categoryType.categoryTypeID === 2
  );
  const sumTotal = totalIn?.totalAmount - totalOut?.totalAmount;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterTransactionLastMonth({ month, year }));
  }, [month, year, user]);

  const [showTable, setShowTable] = useState(false);

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
          <div
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "space-between",
            }}
          >
            <h5 class="card-title">Tháng trước</h5>
            <div class="card-text small">
              <div>
                <Form.Check
                  className="mb-0"
                  type="switch"
                  label=""
                  size={"lg"}
                  onChange={() => setShowTable(!showTable)}
                ></Form.Check>
              </div>
            </div>
          </div>
        </div>
        {showTable && (
          <>
            {" "}
            {user != null ? (
              <>
                <ReactApexChart
                  options={lastMonthTransaction[0].options}
                  series={lastMonthTransaction[0].series}
                  type={lastMonthTransaction[0].options.chart.type}
                />
                <div class="card-body">
                  <table class="table">
                    <tbody>
                      {filterLastMonth.categoryWithTransactionData.map(
                        (item, index) => (
                          <tr key={index}>
                            <th>{item.categoryType.name}</th>
                            <th
                              className={
                                item.categoryType.categoryTypeID === 1
                                  ? "tdMoney green"
                                  : "tdMoney red"
                              }
                            >
                              {item.categoryType.categoryTypeID === 1
                                ? "+"
                                : "-"}
                              {item.totalAmountStr}
                            </th>
                          </tr>
                        )
                      )}
                      <tr>
                        <th>Tổng</th>
                        <th className="tdMoney">
                          {sumTotal.toLocaleString("vi-VN")} ₫
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
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

  const totalIn = filterThisMonth.categoryWithTransactionData.find(
    (item) => item.categoryType.categoryTypeID === 1
  );
  const totalOut = filterThisMonth.categoryWithTransactionData.find(
    (item) => item.categoryType.categoryTypeID === 2
  );
  const sumTotal = totalIn?.totalAmount - totalOut?.totalAmount;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filterTransactionThisMonth({ month, year }));
  }, [month, year, user]);

  const [showTable, setShowTable] = useState(true);

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
          <div
            style={{
              display: "flex",
              "align-items": "center",
              "justify-content": "space-between",
            }}
          >
            <h5 class="card-title">Tháng hiện tại</h5>
            <div class="card-text small">
              <div>
                <Form.Check
                  className="mb-0"
                  type="switch"
                  label=""
                  size={"lg"}
                  checked={showTable}
                  onChange={() => setShowTable(!showTable)}
                ></Form.Check>
              </div>
            </div>
          </div>
        </div>

        {showTable && (
          <>
            <ReactApexChart
              options={thisMonthTransaction[0].options}
              series={thisMonthTransaction[0].series}
              type={thisMonthTransaction[0].options.chart.type}
            />
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
                            <th
                              className={
                                item.categoryType.categoryTypeID === 1
                                  ? "tdMoney green"
                                  : "tdMoney red"
                              }
                            >
                              {item.categoryType.categoryTypeID === 1
                                ? "+"
                                : "-"}
                              {item.totalAmountStr}
                            </th>
                          </tr>
                        )
                      )}
                      <tr>
                        <th>Tổng</th>
                        <th className="tdMoney">
                          {sumTotal.toLocaleString("vi-VN")} ₫
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
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
  const [showTable, setShowTable] = useState(true);

  return (
    <div className="card">
      <div className="card-body">
        <div
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
          }}
        >
          <h5 className="card-title">7 ngày gần nhất</h5>
          <div class="card-text small">
            <div>
              <Form.Check
                className="mb-0"
                type="switch"
                label=""
                size={"lg"}
                checked={showTable}
                onChange={() => setShowTable(!showTable)}
              ></Form.Check>
            </div>
          </div>
        </div>
      </div>
      {showTable && (
        <ReactApexChart
          options={last7WeekData[0].options}
          series={last7WeekData[0].series}
          type={last7WeekData[0].options.chart.type}
          height={350}
        />
      )}
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

  const [showTable, setShowTable] = useState(false);

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
        },
      },
    },
  ];

  return (
    <div className="card">
      <div class="card-body">
        <div
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
          }}
        >
          <h5 class="card-title">Số dư của ví</h5>
          <div class="card-text small">
            <div>
              <Form.Check
                className="mb-0"
                type="switch"
                label=""
                size={"lg"}
                onChange={() => setShowTable(!showTable)}
              ></Form.Check>
            </div>
          </div>
        </div>
      </div>

      {showTable && (
        <>
          <div className="row" style={{ "margin-left": "20px" }}>
            <div className="col-md-2">Chọn ví:</div>
            <div className="col-md-10">
              <select value={walletValue} onChange={handleWalletValueChange}>
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
        </>
      )}
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

  const [showTable, setShowTable] = useState(true);

  return (
    <div class="card top-selling overflow-auto">
      <div class="card-body pb-0">
        <div
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
          }}
        >
          <Link to="/transaction">
            <h5 class="card-title">Các giao dịch gần nhất</h5>
          </Link>
          <div class="card-text small">
            <div>
              <Form.Check
                className="mb-0"
                type="switch"
                label=""
                size={"lg"}
                checked={showTable}
                onChange={() => setShowTable(!showTable)}
              ></Form.Check>
            </div>
          </div>
        </div>
        {showTable && (
          <>
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
          </>
        )}
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

  const budgetsFilter = budgets.filter((item) => item.percentProgress !== 0);

  console.log("budgetsFilter", budgetsFilter);
  const [showTable, setShowTable] = useState(false);
  return (
    <div class="card top-selling overflow-auto">
      <div class="card-body">
        <div
          style={{
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
          }}
        >
          <Link to="/budget">
            <h5 class="card-title">Các hạn mức chi</h5>
          </Link>
          <div class="card-text small">
            <div>
              <Form.Check
                className="mb-0"
                type="switch"
                label=""
                size={"lg"}
                onChange={() => setShowTable(!showTable)}
              ></Form.Check>
            </div>
          </div>
        </div>
        {showTable && (
          <>
            {budgetsFilter.map((item) => {
              return (
                <>
                  <b>{item.budgetName}</b>
                  <Progress data={item} />
                  <br/>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

const Overview = () => {
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
                <div className="row Overview_Wallet">
                  <div className="col-lg-12">
                    <MostTransactionViewCard />
                  </div>
                </div>
                <div className="row Overview_Wallet">
                  <div className="col-lg-12">
                    <BudgetListViewCard />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="row Month">
                  <div className="col-lg-12">
                    <Last7DaysViewCard />
                  </div>
                  <div className="col-lg-12">
                    <SurplusViewCard />
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="row Month">
                  <div className="col-lg-12">
                    <ThisMonthViewCard />
                  </div>
                  <div className="col-lg-12">
                    <LastMonthViewCard />
                  </div>
                </div>
              </div>
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
