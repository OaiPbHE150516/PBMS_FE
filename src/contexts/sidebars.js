import {
  BsFillMenuButtonWideFill,
  BsDatabaseCheck,
  BsFillWalletFill,
  BsCoin,
  BsReceipt,
  BsCalendar2Week,
  BsBank2,
  BsFileEarmarkZip,
  BsFillGearFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { ROUTE_CONSTANTS } from "../constants";
export const sidebars = [
  {
    text: "Overview",
    icon: <BsFillMenuButtonWideFill />,
    path: ROUTE_CONSTANTS.OVERVIEW_PAGE,
    exact: true,
  },
  {
    text: "Transaction",
    icon: <BsFillWalletFill />,
    path: ROUTE_CONSTANTS.TRANSACTION_PAGE,
    exact: true,
  },
  {
    text: "Wallet",
    icon: <BsDatabaseCheck />,
    path: ROUTE_CONSTANTS.WALLET_PAGE,
    exact: true,
  },
  {
    text: "Budget",
    icon: <BsCoin />,
    path: ROUTE_CONSTANTS.BUDGET_PAGE,
    exact: true,
  },
  {
    text: "Expected",
    icon: <BsReceipt />,
    path: ROUTE_CONSTANTS.EXPECTED_PAGE,
    exact: true,
  },
  {
    text: "Chart",
    icon: <BsBank2 />,
    path: ROUTE_CONSTANTS.CHART_PAGE,
    exact: true,
  },
  {
    text: "Calendar",
    icon: <BsCalendar2Week />,
    path: ROUTE_CONSTANTS.CALENDAR_PAGE,
    exact: true,
  },
  {
    text: "Collaborators",
    icon: <BsFillPeopleFill />,
    path: ROUTE_CONSTANTS.COLLABORATOR_PAGE,
    exact: true,
  },
  {
    text: "Loan",
    icon: <BsBank2 />,
    path: ROUTE_CONSTANTS.LOAN_PAGE,
    exact: true,
  },
  {
    text: "Report",
    icon: <BsFileEarmarkZip />,
    path: ROUTE_CONSTANTS.REPORT_PAGE,
    exact: true,
  },
  {
    text: "Setting",
    icon: <BsFillGearFill />,
    path: ROUTE_CONSTANTS.SETTING_PAGE,
    exact: true,
  },
];
