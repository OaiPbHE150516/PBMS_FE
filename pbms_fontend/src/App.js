import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Scroll from "./Components/Helper/Scroll";
import Overview from "./Pages/Overview";
import Transaction from "./Pages/Transaction";
import Wallet from "./Pages/Wallet";
import ExpectTransaction from "./Pages/ExpectTransaction";
import Chart from "./Pages/Chart";
import Calendar from "./Pages/Calendar";
import Loan from "./Pages/Loan";
import ExportImport from "./Pages/ExportImport";
import Budget from "./Pages/Budget";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="App">
      <BrowserRouter>
        {isSidebarVisible && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={<Overview toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/transaction"
            element={<Transaction toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/wallet"
            element={<Wallet toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/budget"
            element={<Budget toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/expect"
            element={<ExpectTransaction toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/chart"
            element={<Chart toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/calendar"
            element={<Calendar toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/loan"
            element={<Loan toggleSidebar={toggleSidebar} />}
          />
          <Route
            path="/export"
            element={<ExportImport toggleSidebar={toggleSidebar} />}
          />
        </Routes>
      </BrowserRouter>
      <Scroll />
    </div>
  );
}

export default App;
