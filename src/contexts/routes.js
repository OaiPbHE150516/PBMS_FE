import { ROUTE_CONSTANTS } from "../constants";
import {
  Budget,
  Calendar,
  Chart,
  ExpectTransaction,
  ExportImport,
  Loan,
  Overview,
  Transaction,
  Wallet,
} from "../pages";

export const routes = [
  {
    path: ROUTE_CONSTANTS.OVERVIEW_PAGE,
    isPrivate: false,
    component: <Overview />,
  },
  {
    path: ROUTE_CONSTANTS.WALLET_PAGE,
    isPrivate: false,
    component: <Wallet />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.TRANSACTION_PAGE,
    isPrivate: false,
    component: <Transaction />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.EXPECTED_TRANSACTION_PAGE,
    isPrivate: false,
    component: <ExpectTransaction />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.LOAN_PAGE,
    isPrivate: false,
    component: <Loan />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.EXPORT_IMPORT_PAGE,
    isPrivate: false,
    component: <ExportImport />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CALENDAR_PAGE,
    isPrivate: false,
    component: <Calendar />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.CHART_PAGE,
    isPrivate: false,
    component: <Chart />,
    exact: true,
  },
  {
    path: ROUTE_CONSTANTS.BUDGET_PAGE,
    isPrivate: false,
    component: <Budget />,
    exact: true,
  },
];
