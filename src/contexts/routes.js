import { ROUTE_CONSTANTS } from "../constants";
import {
  Budget,
  Calendar,
  Chart,
  Expected,
  Loan,
  Overview,
  Transaction,
  Wallet,
  Callaborator,
  Report,
  Setting,
} from "../pages";

export const routes = [
  {
    path: ROUTE_CONSTANTS.OVERVIEW_PAGE,
    isPrivate: false,
    component: <Overview />,
  },
  {
    path: ROUTE_CONSTANTS.TRANSACTION_PAGE,
    isPrivate: false,
    component: <Transaction />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.WALLET_PAGE,
    isPrivate: false,
    component: <Wallet />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.BUDGET_PAGE,
    isPrivate: false,
    component: <Budget />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.EXPECTED_PAGE,
    isPrivate: false,
    component: <Expected />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CHART_PAGE,
    isPrivate: false,
    component: <Chart />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CALENDAR_PAGE,
    isPrivate: false,
    component: <Calendar />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.COLLABORATOR_PAGE,
    isPrivate: false,
    component: <Callaborator />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.LOAN_PAGE,
    isPrivate: false,
    component: <Loan />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.REPORT_PAGE,
    isPrivate: false,
    component: <Report />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.SETTING_PAGE,
    isPrivate: false,
    component: <Setting />,
    exact: true,
  },
 
];
