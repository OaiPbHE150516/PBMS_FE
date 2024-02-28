import React, { useState } from "react";
import { PageTitle } from "../../components";
import "../../css/Budget.css";
import {
  budgetListData,
  walletListData,
  cateListData,
} from "../../contexts/budget";
import Button from "../../components/Button";
import CreateBudget from "../../components/BudgetForm/CreateBudget";
import CardWeek from "./CardWeek";
import CardMonth from "./CardMonth";
import UpdateBudget from "../../components/BudgetForm/UpdateBudget";
import DeleteBudget from "../../components/BudgetForm/DeleteBudget";

const Budget = () => {
  const [show, showSet] = useState(false);
  const [editModal, editModalSet] = useState(false);
  const [removeModal, removeModalSet] = useState(false);
  return (
    <div className="Budget">
      <PageTitle title="Budget" />
      <Button
        size="btn-lg"
        onClick={() => showSet(!show)}
        className="active bold btn-light"
      >
        Create new Budget
      </Button>
      
      <CreateBudget show={show} showSet={showSet} />
      <UpdateBudget show={editModal} onClose={() => editModalSet(false)} />
      <DeleteBudget
        name={"Giải trí"}
        amount={"12.000.000 đ"}
        period={"Weekly budget"}
        note={"Shopping with girlfriend"}
        show={removeModal}
        onClose={() => removeModalSet(false)}
      />
      <div className="mt-5">
        <h2 className="mb-3 text-center bold">Ngân sách hàng tháng</h2>
        <div className="mb-4">
          <CardMonth
            onDelete={() => removeModalSet(true)}
            onEdit={() => editModalSet(true)}
            onReload={() => {}}
          />
        </div>
        <h2 className="mb-3 text-center bold">Ngân sách hàng tuần</h2>
        <div className="mb-3">
          <CardWeek
            onDelete={() => removeModalSet(true)}
            onEdit={() => editModalSet(true)}
            onReload={() => {}}
          />
        </div>
        <div>
          <CardWeek
            onDelete={() => removeModalSet(true)}
            onEdit={() => editModalSet(true)}
            onReload={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Budget;
