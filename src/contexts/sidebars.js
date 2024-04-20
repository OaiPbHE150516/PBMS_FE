import {
  BsCoin,
  BsReceipt,
  BsCalendar2Week,
  BsBank2,
  BsFileEarmarkZip,
  BsFillGearFill,
  BsFillPeopleFill,
} from "react-icons/bs";
import { GrOverview } from "react-icons/gr";
import { AiOutlineTransaction } from "react-icons/ai";
import { LuWallet } from "react-icons/lu";
import { TbChartHistogram } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { ROUTE_CONSTANTS } from "../constants";
export const sidebars = [
  {
    text: "Tổng quan",
    icon: <GrOverview />,
    path: ROUTE_CONSTANTS.OVERVIEW_PAGE,
    exact: true,
  },
  {
    text: "Ví",
    icon: <LuWallet />,
    path: ROUTE_CONSTANTS.WALLET_PAGE,
    exact: true,
  },
  {
    text: "Giao dịch",
    icon: <AiOutlineTransaction />,
    path: ROUTE_CONSTANTS.TRANSACTION_PAGE,
    exact: true,
  },
  {
    text: "Hạn mức chi",
    icon: <BsCoin />,
    path: ROUTE_CONSTANTS.BUDGET_PAGE,
    exact: true,
  },

  {
    text: "Lịch ngân sách",
    icon: <BsCalendar2Week />,
    path: ROUTE_CONSTANTS.CALENDAR_PAGE,
    exact: true,
  },
  {
    text: "Chi tiêu chung",
    icon: <BsFillPeopleFill />,
    path: ROUTE_CONSTANTS.COLLABORATOR_PAGE,
    exact: true,
  },
  {
    text: "Hạng mục",
    icon: <MdOutlineCategory />,
    path: ROUTE_CONSTANTS.CATEGORY_PAGE,
    exact: true,
  },
];
