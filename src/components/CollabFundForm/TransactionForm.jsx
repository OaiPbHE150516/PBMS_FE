import React, { useEffect, useState } from "react";
import PopupCollabTransaction from "../PopupCollabTransaction";
import { Button } from "react-bootstrap";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getMostTransExpen } from "../../redux/mostTransExpenseSlice";
import { IoIosSend } from "react-icons/io";
import { addActionWithTrans } from "../../redux/actionSlice";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import Popup from "../Popup";
import { getCategoryByType } from "../../redux/categorySlice";
import { getWallets } from "../../redux/walletSlice";
import { addTransWithoutInvoice } from "../../redux/transactionSlice";

const ListTransaction = ({
  data,
  showListTransaction,
  handleListTransactionClose,
}) => {
  const dispatch = useDispatch();

  const mostTransExpen = useAppSelector(
    (state) => state.mostTransExpense.values
  );

  useEffect(() => {
    dispatch(getMostTransExpen());
  }, [data]);

  return (
    <div style={{ display: showListTransaction ? "block" : "none" }}>
      <h5>Chọn giao dịch gần đây</h5>
      {mostTransExpen.map((item) => (
        <div className="transExpen_each">
          <div className="transExpen_time">{item.dayDetail.shortDate}</div>
          <div>
            {item.transactions.map((itemTrans) => (
              <div
                className="eachItem"
                onClick={() => handleListTransactionClose(itemTrans)}
              >
                <div className="row">
                  <div className="col-md-8">
                    <div className="row">
                      <div className="col-md-3">{itemTrans.timeStr}</div>
                      <div className="col-md-9">
                        {itemTrans.category.nameVN}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">{itemTrans.totalAmountStr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AddActionPopup = ({ show, onClose, itemTrans, user, collabFundID }) => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const handleAddAction = async () => {
    const fieldValue = {
      collabID: collabFundID,
      accountID: user.accountID,
      note: note,
      transactionID: itemTrans.transactionID,
    };
    try {
      await dispatch(addActionWithTrans({user, fieldValue}));
      onClose();
    } catch (errors) {}
  };

  return (
    <div className="popup" style={{ display: show ? "block" : "none" }}>
      <div className="eachItem">
        <div className="col-md-3 transExpen_time">
          {itemTrans.dayOfWeekStrShort}, {itemTrans.dateShortStr}
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-3">{itemTrans.timeStr}</div>
              <div className="col-md-9">{itemTrans.category.nameVN}</div>
            </div>
          </div>
          <div className="col-md-3">{itemTrans.totalAmountStr}</div>
          <div className="close col-md-1" onClick={onClose}>
            &times;
          </div>
        </div>
      </div>
      <br />
      <div className="popup-inner row">
        <div className="content col-md-11">
          <input
            type="text"
            placeholder="Nhập nội dung"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <div className="close col-md-1">
          <IoIosSend onClick={handleAddAction} />
        </div>
      </div>
    </div>
  );
};

const FormNewTransaction = ({ show, showSet, onSubmit = () => {} }) => {
  const user = useAppSelector((state) => state.authen.user);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      accountID: user.accountID,
      walletID: 0,
      categoryID: 0,
      totalAmount: 0,
      transactionDate: 0,
      note: "",
    },
  });

  const dispatch = useDispatch();

  //List Categories
  const categories = useAppSelector((state) => state.category.values);

  console.log("CATE", categories.filter((item) => item.nameVN === "Chi tiêu"))
  // List Wallet
  const wallets = useAppSelector((state) => state.wallet.values);

  useEffect(() => {
    dispatch(getWallets());
    dispatch(getCategoryByType());
  }, [user]);

  return (
    <Popup
      title={"Tạo giao dịch mới"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form className="c-form" noValidate validated={isValid}>
        <Form.Group className="mb-2">
          <Form.Label>Số tiền</Form.Label>
          <Form.Control
            type="number"
            {...register("totalAmount", { required: true })}
          ></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"totalAmount"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Hạng mục</Form.Label>
          <select
            className="form-control"
            style={{
              border: "var(--bs-border-width) solid var(--bs-border-color)",
              borderRadius: "unset",
              height: "38px",
            }}
            {...register("categoryID", { required: true })}
          >
            <option value={0}>-----Chọn hạng mục-----</option>
            {categories.filter((item) => item.nameVN === "Chi tiêu").map((cate) => (
              <optgroup key={cate.value} label={cate.nameVN}>
                {cate.children.map((child) => (
                  <option key={child.categoryID} value={child.categoryID}>
                    {child.nameVN}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <FormErrorMessage errors={errors} fieldName={"categoryID"} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Ví</Form.Label>
          <select
            className="form-control"
            style={{
              border: "var(--bs-border-width) solid var(--bs-border-color)",
              borderRadius: "unset",
              height: "38px",
            }}
            {...register("walletID", { required: true })}
          >
            <option value={0}>-----Chọn ví-----</option>
            {wallets.map((item) => (
              <option key={item.value} value={item.walletID}>
                {item.name}
              </option>
            ))}
          </select>
          <FormErrorMessage errors={errors} fieldName={"walletID"} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Ghi chú</Form.Label>
          <Form.Control as="textarea" {...register("note")}></Form.Control>
          <FormErrorMessage errors={errors} fieldName={"note"} />
        </Form.Group>
      </Form>
    </Popup>
  );
};

export const TransactionFrom = ({ show, showSet, collabFundID }) => {
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const [itemTrans, setItemTrans] = useState(null);
  const [showAddActionPopup, setShowAddActionPopup] = useState(false);
  const [showListTransaction, setShowListTransaction] = useState(true);

  const [showFormNewTransaction, setShowFormNewTransaction] = useState(false);

  const handleListTransactionClose = (selectedItemTrans) => {
    setShowListTransaction(false); //Close ListTransaction
    setShowAddActionPopup(true); //Show AddActionPopup
    setShowFormNewTransaction(false); //Close FormNewTransaction
    setItemTrans(selectedItemTrans);
  };

  const handleAddActionClose = () => {
    setShowListTransaction(true); //Show ListTransaction
    setShowAddActionPopup(false); //Close AddActionPopup
    setShowFormNewTransaction(false); //Close FormNewTransaction
    setItemTrans(null);
  };

  const handleShowFormCreateTransaction = () => {
    setShowFormNewTransaction(true); //Show FormNewTransaction
    setShowListTransaction(false); //Close ListTransaction
    setShowAddActionPopup(false); //Close AddActionPopup
  };

  return (
    <div className="TransactionForm">
      <PopupCollabTransaction
        title={"Thêm giao dịch vào chi tiêu chung"}
        show={show}
        onClose={() => showSet(false)}
      >
        {!showAddActionPopup && !showFormNewTransaction ? (
          <>
            <div>
              <div className="transaction-options">
                <Button
                  size="btn-lg"
                  className="active bold btn-light"
                  onClick={handleShowFormCreateTransaction}
                >
                  Tạo giao dịch mới
                </Button>
                <div>Hoặc</div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {showListTransaction && (
          <ListTransaction
            data={user}
            showListTransaction={showListTransaction}
            handleListTransactionClose={handleListTransactionClose}
          />
        )}
        {showAddActionPopup && (
          <AddActionPopup
            show={showAddActionPopup}
            onClose={handleAddActionClose}
            itemTrans={itemTrans}
            collabFundID={collabFundID}
            user={user}
          />
        )}
        {showFormNewTransaction && (
          <FormNewTransaction
            show={showFormNewTransaction}
            showSet={showSet}
            onSubmit={(fieldValue) => {
              dispatch(
                addTransWithoutInvoice({
                  user,
                  fieldValue,
                })
              )
                .unwrap()
                .then(() => showSet(false));
            }}
          />
        )}
      </PopupCollabTransaction>
    </div>
  );
};
