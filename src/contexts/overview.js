export const lastWeekData = [
  {
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
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
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  },
];

export const surplusData = [
  {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
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
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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
  },
];

export const overviewData = [
  {
    name: "Total budget",
    money: 1000000000,
  },
  {
    name: "Total fixed expenses",
    money: -2000000,
  },
  {
    name: "Total",
    money: 998000000,
  },
];

export const walletData = [
  {
    name: "Wallet 1",
    money: 1000000000,
  },
  {
    name: "Wallet 2",
    money: -2000000,
  },
  {
    name: "Wallet 3",
    money: 9980000,
  },
];

export const thisMonthData = [
  {
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
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

export const mostTransaction = [
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: 1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: 1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: -1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: 1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: -1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: 1000000,
    content: "Comment 1",
  },
  {
    time: "10 phút",
    category: "Transaction 1",
    wallet: "Tiền mặt",
    money: -1000000,
    content: "Comment 1",
  },
];

export const budgetListData = [
  {
    startDate: "1/1/2023",
    endDate: "31/1/2023",
    startMoney: 20000,
    endMoney: 100000,
    percent: 20000/100000*100,
  },
  {
    startDate: "1/1/2023",
    endDate: "31/1/2023",
    startMoney: 20000,
    endMoney: 100000,
    percent: 20000/100000*100,
  },
  {
    startDate: "1/1/2023",
    endDate: "31/1/2023",
    startMoney: 20000,
    endMoney: 100000,
    percent: 20000/100000*100,
  }
];
