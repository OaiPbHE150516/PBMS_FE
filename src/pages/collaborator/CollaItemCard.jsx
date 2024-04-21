import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import UpdateCollabFund from "../../components/CollabFundForm/UpdateCollabFund";
import DevideMoney from "../../components/CollabFundForm/DevideMoney";
import { addDivideMoney } from "../../redux/divideMoneySlice";
import { useDispatch, useSelector } from "react-redux";
import { TransactionFrom } from "../../components/CollabFundForm/TransactionForm";
import useAppSelector from "../../hooks/useAppSelector";
import {
  deleteCollaborator,
  updateCollaborator,
} from "../../redux/collaboratorSlice";

import PopupDelete from "../../components/PopupDelete";

export const CollaItemCard = ({ data, onItemClick }) => {
  const handleClick = () => {
    onItemClick(data.collabFundID);
  };

  const buttonStyle = {
    backgroundImage: `url(${data.imageURL})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showDivideForm, setShowDivideForm] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [editIdModal, editIdModalSet] = useState(false);

  const dispatch = useDispatch();
  const [show, showSet] = useState(false);
  const accountID = useSelector((state) => state.authen.user?.accountID);

  return (
    <div class="card mb-3 cardItem overflow-hidden" onClick={handleClick}>
      <div class="row g-0">
        <div class="col-md-7 collCard-Detail">
          <div class="card-body p-2">
            <h5 class="card-title pt-2 pb-3 mb-0 fs-6">{data.name}</h5>
            <p class="card-text small mb-2">
              {data.accountInCollabFunds.map((item, index) => {
                return (
                  <>
                    {item.accountName}
                    {index < data.accountInCollabFunds.length - 1 && ", "}
                  </>
                );
              })}
            </p>
            <p class="card-text small mb-2">Ghi chú: {data.description}</p>
          </div>
        </div>
        <div
          class="col-md-5 collCard-Button p-2"
          style={buttonStyle}
          onClick={handleClick}
        >
          <h5 class="card-title totalMoney pt-2 pb-3 mb-0 fs-6">
            {data.totalAmountStr}
          </h5>
          <div className="listButton">
            <Button
              size="btn-sm"
              className="btn btn-outline-secondary"
              onClick={() => setShowTransactionForm(true)}
            >
              <span>Giao dịch mới</span>
            </Button>
            {showTransactionForm && (
              <TransactionFrom
                show={showTransactionForm}
                showSet={setShowTransactionForm}
                collabFundID={data.collabFundID}
              />
            )}
            {data.totalAmount !== 0 ? (
              <>
                {!data.isFundholder ? (
                  <Button
                    className="btn btn-outline-secondary"
                    size="btn-sm"
                    onClick={() => setShowDivideForm(true)}
                  >
                    <span>Đề nghị chia tiền</span>
                  </Button>
                ) : (
                  <Button
                    className="btn btn-outline-secondary"
                    size="btn-sm"
                    onClick={() => setShowDivideForm(true)}
                  >
                    <span>Chia tiền</span>
                  </Button>
                )}
              </>
            ) : (
              <></>
            )}
            {showDivideForm && (
              <DevideMoney
                show={showDivideForm}
                showSet={setShowDivideForm}
                onSubmit={(fieldValue) => {
                  dispatch(
                    addDivideMoney({
                      accountID: accountID,
                      fieldValue: fieldValue,
                    })
                  )
                    .unwrap()
                    .then(() => showSet(false));
                }}
                collabFundID={data.collabFundID}
              />
            )}

            {data.isFundholder ? (
              <>
                {" "}
                <Button
                  className="btn btn-outline-secondary"
                  size="btn-sm"
                  onClick={() => setShowFormUpdate(true)}
                >
                  <span>Chỉnh sửa</span>
                </Button>
              </>
            ) : (
              <></>
            )}

            {showFormUpdate && (
              <UpdateCollabFund
                data={data}
                show={showFormUpdate}
                showSet={setShowFormUpdate}
                onClose={() => setShowFormUpdate(false)}
                onSubmit={(fieldValue) => {
                  dispatch(
                    updateCollaborator({
                      fieldValue: fieldValue,
                    })
                  )
                    .unwrap()
                    .then(() => {
                      editIdModalSet(false);
                      setShowFormUpdate(false);
                    });
                }}
              />
            )}
            {data.isFundholder ? (
              <>
                {" "}
                <Button
                  className="btn btn-outline-secondary"
                  size="btn-sm"
                  onClick={() => setShowDeletePopup(true)}
                >
                  <span>Xoá</span>
                </Button>
              </>
            ) : (
              <></>
            )}

            {showDeletePopup && (
              <PopupDelete
                title={"Xoá quỹ chung " + data.name}
                members={data.accountInCollabFunds}
                show={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                onSubmit={(accID, collabFundID) => {
                  dispatch(
                    deleteCollaborator({
                      accID: accountID,
                      collabFundID: data.collabFundID,
                    })
                  )
                    .unwrap()
                    .then(() => showSet(false));
                }}
                collabFundID={data.collabFundID}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
