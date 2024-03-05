import React, { useEffect, useState } from "react";
import { PageTitle } from "../../components";
import "../../css/Budget.css";
import Button from "../../components/Button";
import CreateBudget from "../../components/BudgetForm/CreateBudget";
import UpdateBudget from "../../components/BudgetForm/UpdateBudget";
import DeleteBudget from "../../components/BudgetForm/DeleteBudget";
import { useDispatch, useSelector } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import { addBudgets, getBudgets, removeBudgets } from "../../redux/budgetSlice";
import CardBudget from "./CardBudget";
import { getCategories } from "../../redux/categorySlice";
import { getWallets } from "../../redux/walletSlice";

const Budget = () => {
  const [show, showSet] = useState(false);
  const [editIdModal, editIdModalSet] = useState(false);
  const [removeIdModal, removeIdModalSet] = useState(false);

  // Get List Budget
  const dispatch = useDispatch();
  const budgets = useAppSelector((state) => state.budget.values);
  const accountID = useSelector((state) => state.authen.user?.accountID);
  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getCategories());
    dispatch(getWallets());
  }, []);

  const OtherBudget = budgets.filter((item) => {
    return item.budgetTypeID === 0;
  });
  const WeeklyBudget = budgets.filter((item) => {
    return item.budgetTypeID === 1;
  });

  const MonthlyBudget = budgets.filter((item) => {
    return item.budgetTypeID === 2;
  });

  const updateBudgetData = budgets.find(
    (item) => item.budgetID === editIdModal
  );
  const deleteBudgetData = budgets.find(
    (item) => item.budgetID === removeIdModal
  );

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

      <CreateBudget
        show={show}
        showSet={showSet}
        onSubmit={(fieldValue) =>
          dispatch(addBudgets({accountID: accountID, fieldValue: fieldValue}))
            .unwrap()
            .then(() => showSet(false))
        }
      />
      {updateBudgetData && (
        <UpdateBudget
          data={updateBudgetData}
          show={Boolean(editIdModal)}
          onClose={() => editIdModalSet(false)}
          onSubmit={(fieldValue) => {console.log({fieldValue})}}
        />
      )}
      {deleteBudgetData && (
        <DeleteBudget
          name={deleteBudgetData.budgetName}
          amount={deleteBudgetData.targetAmountStr}
          period={deleteBudgetData.budgetType.typeName + " budget"}
          note={deleteBudgetData.note}
          show={Boolean(removeIdModal)}
          onClose={() => removeIdModalSet(false)}
          onSubmit={() =>
            dispatch(removeBudgets())
              .unwrap()
              .then(() => showSet(false))}
          data={deleteBudgetData}
        />
      )}

      <div className="mt-5">
        {/* Monthly */}
        {MonthlyBudget.length > 0 && (
          <>
            <h3 className="mb-3 text-center h3">Monthly budget</h3>
            {MonthlyBudget.map((item) => (
              <div className="mb-4" key={item.budgetID}>
                <CardBudget
                  onDelete={() => removeIdModalSet(item.budgetID)}
                  onEdit={() => editIdModalSet(item.budgetID)}
                  onReload={() => {}}
                  data={item}
                />
              </div>
            ))}
          </>
        )}
        {/* Weekly */}
        {WeeklyBudget.length > 0 && (
          <>
            <h3 className="mb-3 text-center h3">Weekly budget</h3>
            {WeeklyBudget.map((item) => (
              <div className="mb-4" key={item.budgetID}>
                <CardBudget
                  onDelete={() => removeIdModalSet(item.budgetID)}
                  onEdit={() => editIdModalSet(item.budgetID)}
                  onReload={() => {}}
                  data={item}
                />
              </div>
            ))}
          </>
        )}
        {/* Other */}
        {OtherBudget.length > 0 && (
          <>
            <h3 className="mb-3 text-center h3">Other budget</h3>
            {OtherBudget.map((item) => (
              <div className="mb-4" key={item.budgetID}>
                <CardBudget
                  onDelete={() => removeIdModalSet(item.budgetID)}
                  onEdit={() => editIdModalSet(item.budgetID)}
                  onReload={() => {}}
                  data={item}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Budget;
