import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo.png";
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

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="Sidebar">
      <div className="Logo">
        <img src={logo} alt="" />
        <span>PBMS</span>
      </div>
      <div className="listSidebar">
        <div
          className={selected === 1 ? "content active" : "content"}
          onClick={() => setSelected(1)}
        >
          <Link to="/">
            <BsFillMenuButtonWideFill />
            <span>Overview</span>
          </Link>
        </div>
        <div
          className={selected === 2 ? "content active" : "content"}
          onClick={() => setSelected(2)}
        >
          <Link to="/transaction">
            <BsDatabaseCheck />
            <span>Transaction</span>
          </Link>
        </div>
        <div
          className={selected === 3 ? "content active" : "content"}
          onClick={() => setSelected(3)}
        >
          <Link to="/wallet">
            <BsFillWalletFill />
            <span>Wallet</span>
          </Link>
        </div>
        <div
          className={selected === 4 ? "content active" : "content"}
          onClick={() => setSelected(4)}
        >
          <Link to="/budget">
            <BsReceipt />
            <span>Budget</span>
          </Link>
        </div>
        <div
          className={selected === 5 ? "content active" : "content"}
          onClick={() => setSelected(5)}
        >
          <Link to="/expect">
            <BsCoin />
            <span>Expect Transaction</span>
          </Link>
        </div>
        <div
          className={selected === 6 ? "content active" : "content"}
          onClick={() => setSelected(6)}
        >
          <Link to="/chart">
            <BsBarChart />
            <span>Chart</span>
          </Link>
        </div>
        <div
          className={selected === 7 ? "content active" : "content"}
          onClick={() => setSelected(7)}
        >
          <Link to="/calendar">
            <BsCalendar2Week />
            <span>Calendar</span>
          </Link>
        </div>
        <div
          className={selected === 8 ? "content active" : "content"}
          onClick={() => setSelected(8)}
        >
          <Link to="/loan">
            <BsBank2 />
            <span>Loan</span>
          </Link>
        </div>
        <div
          className={selected === 9 ? "content active" : "content"}
          onClick={() => setSelected(9)}
        >
          <Link to="/export">
            <BsFileEarmarkZip />
            <span>Export/Import</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
