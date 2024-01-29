import React from "react";
import Header from "../Components/Header/Header";
const ExpectTransaction = ({ toggleSidebar }) => {
  return (
    <div className="ExpectTransaction">
      <Header toggleSidebar={toggleSidebar} />
      Expect Transaction
    </div>
  );
};

export default ExpectTransaction;
