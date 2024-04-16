import React, { useEffect, useState } from "react";
import { PageHelper, PageTitle } from "../../components";
import "../../css/Budget.css";
import Button from "../../components/Button";
import CreateBudget from "../../components/BudgetForm/CreateBudget";
import UpdateBudget from "../../components/BudgetForm/UpdateBudget";
import DeleteBudget from "../../components/BudgetForm/DeleteBudget";
import { useDispatch, useSelector } from "react-redux";
import useAppSelector from "../../hooks/useAppSelector";
import {
  addBudgets,
  getBudgets,
  removeBudgets,
  updateBudgets,
} from "../../redux/budgetSlice";
import CardBudget from "./CardBudget";
import { getCategories } from "../../redux/categorySlice";
import { getWallets } from "../../redux/walletSlice";

const Budget = () => {
  const [show, showSet] = useState(false);
  const [editIdModal, editIdModalSet] = useState(false);
  const [removeIdModal, removeIdModalSet] = useState(false);

  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const budgets = useAppSelector((state) => state.budget.values);

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getCategories());
  }, [user]);

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
      {user ? (
        <>
          <PageTitle title="Hạn mức chi" />
          <Button
            size="btn-lg"
            onClick={() => showSet(!show)}
            className="active bold btn-light"
          >
            Tạo hạn mức chi mới
          </Button>

          <CreateBudget
            show={show}
            showSet={showSet}
            onSubmit={(fieldValue) =>
              dispatch(
                addBudgets({
                  fieldValue: fieldValue,
                })
              )
                .unwrap()
                .then(() => showSet(false))
            }
          />
          {updateBudgetData && (
            <UpdateBudget
              data={updateBudgetData}
              show={Boolean(editIdModal)}
              showSet={showSet}
              onClose={() => editIdModalSet(false)}
              onSubmit={(fieldValue) => {
                dispatch(
                  updateBudgets({
                    fieldValue: fieldValue,
                  })
                )
                  .unwrap()
                  .then(() => editIdModalSet(false));
              }}
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
                  .then(() => showSet(false))
              }
              data={deleteBudgetData}
            />
          )}

          <div className="mt-5">
            {MonthlyBudget.length > 0 && (
              <>
                <h3 className="mb-3 text-center h3">Hạn mức theo tháng</h3>
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
            {WeeklyBudget.length > 0 && (
              <>
                <h3 className="mb-3 text-center h3">Hạn mức theo tuần</h3>
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
                <h3 className="mb-3 text-center h3">Các hạn mức sách khác</h3>
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
        </>
      ) : (
        <>
          <PageHelper />
        </>
      )}
    </div>
  );
};

export default Budget;
