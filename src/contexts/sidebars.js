import {
  BsFillMenuButtonWideFill,
  BsDatabaseCheck,
  BsFillWalletFill,
  BsCoin,
  BsReceipt,
  BsBarChart,
  BsCalendar2Week,
  BsBank2,
  BsFileEarmarkZip,
} from "react-icons/bs";
import { ROUTE_CONSTANTS } from "../constants";
export const sidebars = [
  {
    text: "Overview",
    icon: <BsFillMenuButtonWideFill  />,
    path: ROUTE_CONSTANTS.OVERVIEW_PAGE,
    exact: true,
  },
  {
    text: "Wallet",
    icon: <BsDatabaseCheck />,
    path: ROUTE_CONSTANTS.WALLET_PAGE,
    exact: true,
  },
  {
    text: "Transaction",
    icon: <BsFillWalletFill />,
    path: ROUTE_CONSTANTS.TRANSACTION_PAGE,
    exact: true,
  },
  {
    text: "Expected Transaction",
    icon: <BsCoin />,
    path: ROUTE_CONSTANTS.EXPECTED_TRANSACTION_PAGE,
    exact: true,
  },
  {
    text: "Loan",
    icon: <BsReceipt />,
    path: ROUTE_CONSTANTS.LOAN_PAGE,
    exact: true,
  },
  {
    text: "Export Import",
    icon: <BsBarChart />,
    path: ROUTE_CONSTANTS.EXPORT_IMPORT_PAGE,
    exact: true,
  },
  {
    text: "Calendar",
    icon: <BsCalendar2Week />,
    path: ROUTE_CONSTANTS.CALENDAR_PAGE,
    exact: true,
  },
  {
    text: "Chart",
    icon: <BsBank2 />,
    path: ROUTE_CONSTANTS.CHART_PAGE,
    exact: true,
  },
  {
    text: "Budget",
    icon: <BsFileEarmarkZip />,
    path: ROUTE_CONSTANTS.BUDGET_PAGE,
    exact: true,
  },
];
