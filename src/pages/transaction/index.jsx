import React, { useState } from "react";
import { PageTitle } from "../../components";
import {
  BsArrowLeft,
  BsArrowRight,
  BsPlusCircle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import "../../css/Transaction.css";
import { listTransaction } from "../../contexts/transaction";
import { Dropdown } from "react-bootstrap";

const Transaction = () => {
  //=================Create=================
  //Setup click Create
  const [openDropdownIndexCreate, setOpenDropdownIndexCreate] = useState(false);
  const handleDropdownToggleCreate = () => {
    setOpenDropdownIndexCreate((prevIndex) => !prevIndex);
    setOpenDropdownIndexDetail(null);
  };
  //Create Menu
  const renderDropdownCreate = () => {
    return (
      <Dropdown
        show={openDropdownIndexCreate}
        onHide={() => setOpenDropdownIndexCreate(null)}
      >
        <Dropdown.Menu>
          <Dropdown.Item>Action 1</Dropdown.Item>
          <Dropdown.Item>Action 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  //=================Details=================
  //Setup click Detail
  const [openDropdownIndexDetail, setOpenDropdownIndexDetail] = useState(null);
  const handleDropdownToggleDetail = (index) => {
    setOpenDropdownIndexDetail((prevIndex) =>
      prevIndex === index ? null : index
    );
    setOpenDropdownIndexCreate(false);
  };
  //Menu Detail
  const renderDropdownDetail = (isOpen) => {
    return (
      <Dropdown
        align={{ lg: "end" }}
        show={isOpen}
        onHide={() => setOpenDropdownIndexDetail(null)}
      >
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  //=================Table Transaction=================
  //Total of Transaction
  const totalTransactions = listTransaction.length;
  const totalAmount = listTransaction.reduce(
    (sum, transaction) => sum + transaction.money,
    0
  );
  //Each Transaction
  const renderTransaction = () => {
    return listTransaction.map((item, index) => {
      const colorTransaction = item.money < 0 ? "color_red" : "color_green";
      const isOpen = openDropdownIndexDetail === index;
      return (
        <div className="eachTransaction">
          <div className="cate_Wallet">
            <div>{item.category}</div>
            <div>{item.wallet}</div>
          </div>
          <div className="money_Date_Menu">
            <div className="money_Date">
              <div>{item.money}.000 VNĐ</div>
              <div>{item.date}</div>
            </div>

            <BsThreeDotsVertical
              onClick={() => handleDropdownToggleDetail(index)}
            />
            {renderDropdownDetail(isOpen)}
            <div className={colorTransaction}></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="Transaction">
      <PageTitle title="Transaction" />
      <div
        className="addTransaction"
        onClick={() => handleDropdownToggleCreate()}
      >
        <BsPlusCircle />
        <span>Add new Transaction</span>
      </div>
      {renderDropdownCreate()}
      <div className="date">
        <BsArrowLeft />
        <span>November 2023</span>
        <BsArrowRight />
      </div>
      <div className="tableTransaction">
        <div className="total">
          <span>Total Transaction: {totalTransactions}</span>
          <span>Total Amount: {totalAmount}.000 VNĐ</span>
        </div>
        <div className="listTransaction">{renderTransaction()}</div>
      </div>
    </div>
  );
};

export default Transaction;
