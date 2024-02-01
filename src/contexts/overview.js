export const lastWeek = [
  {
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
  },
];

export const surplus = [
  {
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
  },
];
