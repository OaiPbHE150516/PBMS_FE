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
  const [openDropdownCreate, setOpenDropdownCreate] = useState(false);
  const handleDropdownToggleCreate = () => {
    setOpenDropdownCreate((prevIndex) => !prevIndex);
    setOpenDropdownDetail(null);
  };
  //Create Menu
  const renderDropdownCreate = () => {
    return (
      <Dropdown
        show={openDropdownCreate}
        onHide={() => setOpenDropdownCreate(null)}
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleActionItemClick("Action 1")}>
            Action 1
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleActionItemClick("Action 2")}>
            Action 2
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  //=================Details=================
  //Setup click Detail
  const [openDropdownDetail, setOpenDropdownDetail] = useState(null);
  const handleDropdownToggleDetail = (index) => {
    setOpenDropdownDetail((prevIndex) =>
      prevIndex === index ? null : index
    );
    setOpenDropdownCreate(false);
    setSelectedAction(null);
  };
  //Menu Detail
  const renderDropdownDetail = (isOpen) => {
    return (
      <Dropdown
        align={{ lg: "end" }}
        show={isOpen}
        onHide={() => setOpenDropdownDetail(null)}
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
      const isOpen = openDropdownDetail === index;
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

  //=================Form Create Transaction=================
  //Setup click Create
  const [selectedAction, setSelectedAction] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleActionItemClick = (action) => {
    setSelectedAction(action);
    setOpenDropdownCreate(false);
    setIsFormVisible(true);
  };
  //Create Transaction
  const renderFormCreateTransaction = () => {
    if (selectedAction === "Action 1" || selectedAction === "Create Revenue") {
      return (
        <div className="formCreateContainer">
          <div className="formCreate">{renderCreateRevueForm()}</div>
        </div>
      );
    } else if (selectedAction === "Create Spending") {
      return (
        <div className="formCreateContainer">
          <div className="formCreate">{renderCreateSpendingForm()}</div>
        </div>
      );
    }
    return null;
  };
  //Form Create Revuene
  const renderCreateRevueForm = () => {
    return (
      <div id="createRevenue" className="create">
        <div className="title revenue_spending">
          <div
            className="revenue"
            onClick={() => handleActionItemClick("Create Revenue")}
          >
            Create Revenue
          </div>
          <div
            className="spending"
            onClick={() => handleActionItemClick("Create Spending")}
          >
            Create Spending
          </div>
        </div>
        <form>
          <div className="column">
            <div className="Category">
              <div className="title">Category</div>
              <select>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
              </select>
            </div>
            <div className="Wallet">
              <div className="title">Wallet</div>
              <select>
                <option value="1">Wallet 1</option>
                <option value="2">Wallet 2</option>
                <option value="3">Wallet 3</option>
                <option value="4">Wallet 4</option>
                <option value="5">Wallet 5</option>
              </select>
            </div>
          </div>
          <div className="column">
            <div className="Money">
              <div className="title">Amount of money</div>
              <input type="text" />
              <span>VNĐ</span>
            </div>
            <div className="Date">
              <div className="title">Date</div>
              <input type="date" />
            </div>
            <div className="button">
              <button type="submit" className="btnCreate">
                Create
              </button>
              <button type="submit" className="btnClose" onClick={() => setIsFormVisible(false)}>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  //Form Spending
  const renderCreateSpendingForm = () => {
    return (
      <div id="createSpending" className="create">
        <div className="title revenue_spending">
          <div
            className="revenue"
            onClick={() => handleActionItemClick("Create Revenue")}
          >
            Create Revenue
          </div>
          <div
            className="spending"
            onClick={() => handleActionItemClick("Create Spending")}
          >
            Create Spending
          </div>
        </div>
        <form>
          <div className="column">
            <div className="Category">
              <div className="title">Category</div>
              <select>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
              </select>
            </div>
            <div className="Wallet">
              <div className="title">Wallet</div>
              <select>
                <option value="1">Wallet 1</option>
                <option value="2">Wallet 2</option>
                <option value="3">Wallet 3</option>
                <option value="4">Wallet 4</option>
                <option value="5">Wallet 5</option>
              </select>
            </div>
          </div>
          <div className="column">
            <div className="Money">
              <div className="title">Amount of money</div>
              <input type="text" />
              <span>VNĐ</span>
            </div>
            <div className="Date">
              <div className="title">Date</div>
              <input type="date" />
            </div>
            <div className="button">
              <button type="submit" className="btnCreate">
                Create
              </button>
              <button type="submit" className="btnClose" onClick={() => setIsFormVisible(false)}>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    );
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
      {renderFormCreateTransaction()}
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
