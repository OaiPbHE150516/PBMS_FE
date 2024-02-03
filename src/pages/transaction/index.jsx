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
    setOpenDropdownDetail((prevIndex) => (prevIndex === index ? null : index));
    setOpenDropdownCreate(false);
    setSelectedAction(null);
  };
  const handleDeleteItemClick = (index) => {
    window.confirm("Are you sure you want to delete this item?");
  };
  //Menu Detail
  const renderDropdownDetail = (isOpen, index) => {
    return (
      <Dropdown
        align={{ lg: "end" }}
        show={isOpen}
        onHide={() => setOpenDropdownDetail(null)}
      >
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleEditItemClick(index)}>Edit</Dropdown.Item>
          <Dropdown.Item onClick={() => handleDeleteItemClick(index)}>Delete</Dropdown.Item>
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
            {renderDropdownDetail(isOpen, index)}
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
              <button
                className="btnClose"
                onClick={() => setIsFormVisible(false)}
              >
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
              <button
                className="btnClose"
                onClick={() => setIsFormVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  //=================Form Edit Transaction=================
  //Setup click Edit
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const handleEditItemClick = (index) => {
    setSelectedTransaction(listTransaction[index]);
    setOpenDropdownDetail(null);
    setIsFormVisible(true);
  };

  const renderEditForm = () => {
    if (selectedTransaction) {
      const { money } = selectedTransaction;
      if (money < 0) {
        // return renderEditSpending();
        return (
          <div className="formEditContainer">
          <div className="formEdit">{renderEditSpending()}</div>
        </div>
        )
      } else {
        // return renderEditRevenue();
        return (
          <div className="formEditContainer">
          <div className="formEdit">{renderEditRevenue()}</div>
        </div>
        )
      }
    }
    return null;
  };
  //Form Spending
  const renderEditSpending = () => {
    return (
      <div className="editTransaction editSpending">
        <div className="title edit">Update Spending</div>
        <form>
          <div className="Row">
            <div className="Category">
              <div className="title">Category</div>
              <select>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            <div className="Money">
              <div className="title">Amount of money</div>
              <input type="text" />
              <span>VNĐ</span>
            </div>
          </div>
          <div className="Row">
            <div className="Wallet">
              <div className="title">Wallet</div>
              <select>
                <option value="1">Wallet 1</option>
                <option value="2">Wallet 2</option>
                <option value="3">Wallet 3</option>
              </select>
            </div>
            <div className="Date">
              <div className="title">Date</div>
              <input type="date" />
            </div>
          </div>
          <div className="Total">Total: 100.000.000 VNĐ</div>
          <div className="Button">
            <button type="submit" className="btnSave">
              Save
            </button>
            <button className="btnClose" onClick={() => setIsFormVisible(false)}>Close</button>
          </div>
        </form>
      </div>
    );
  };
  //Form Spending
  const renderEditRevenue = () => {
    return (
      <div className="editTransaction editRevenue">
        <div className="title edit">Update Revenue</div>
        <form>
          <div className="Row">
            <div className="Category">
              <div className="title">Category</div>
              <select>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            <div className="Money">
              <div className="title">Amount of money</div>
              <input type="text" />
              <span>VNĐ</span>
            </div>
          </div>
          <div className="Row">
            <div className="Wallet">
              <div className="title">Wallet</div>
              <select>
                <option value="1">Wallet 1</option>
                <option value="2">Wallet 2</option>
                <option value="3">Wallet 3</option>
              </select>
            </div>
            <div className="Date">
              <div className="title">Date</div>
              <input type="date" />
            </div>
          </div>
          <div className="Total">Total: 100.000.000 VNĐ</div>
          <div className="Button">
            <button type="submit" className="btnSave">
              Save
            </button>
            <button className="btnClose">Close</button>
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
      {renderEditForm()}
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
        <div className="listTransaction" onClick={() => setIsFormVisible(false)}>{renderTransaction()}</div>
      </div>
    </div>
  );
};

export default Transaction;
