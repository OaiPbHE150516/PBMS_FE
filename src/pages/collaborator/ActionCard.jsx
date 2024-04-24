import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo.png";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getActionsOfCollab } from "../../redux/actionSlice";
import * as dayjs from "dayjs";
import { IoIosArrowForward } from "react-icons/io";
import Popup from "../../components/Popup";
import { Button } from "react-bootstrap";

export const ActionCard = ({ collabID }) => {
  const actions = useAppSelector((state) => state.action.values);
  const reversedActions = [...actions].reverse();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActionsOfCollab(collabID));
  }, [collabID]);

  const [actionSelected, showActionSelected] = useState(null);
  const [showPopupAction, setShowPopupAction] = useState(false);

  const handleGetActionID = (actionID) => {
    const selectedAction = reversedActions.find(
      (item) => item.collabFundActivityID === actionID
    );
    showActionSelected(selectedAction);
  };

  const handleAction = (actionID) => {
    handleGetActionID(actionID);
    setShowPopupAction(true);
  };

  return (
    <div class="card mb-3 cardActionItem">
      {reversedActions.map((item) => {
        return (
          <>
            <div
              class="card mb-3 cardActionItem"
              onClick={() => handleAction(item.collabFundActivityID)}
            >
              <div class="row g-0 ps-2 py-2">
                <div class="col-md-10 c-card-member-comment">
                  <img
                    src={item.account.pictureURL}
                    class="img-fluid rounded-start img_logo"
                    alt="..."
                  />
                  <div class="card-body py-0">
                    <p class="card-text c-card-member mb-2">
                      {item.account.accountName}
                    </p>
                    <p class="card-text">{item.note}</p>
                    <p>
                      {item.filename ? (
                        <>
                          <img src={item.filename} className="img_trans" />
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>
                      {item.cfDividingMoneyVMDTO ? (
                        <>
                          {item.cfDividingMoneyVMDTO.cF_DividingMoneyDetails.map(
                            (item, index) => (
                              <div className="moneyDivide">
                                <div className="col-lg-5 money_left">
                                  <img
                                    src={item.fromAccount.pictureURL}
                                    className="img-fluid rounded-full border border-dark"
                                    width={50}
                                    height={50}
                                  />
                                  <span>{item.fromAccount.accountName}</span>
                                </div>
                                <div className="col-lg-2 arrow_money">
                                  <IoIosArrowForward />
                                  <div className="amount">
                                    {item.dividingAmount.toLocaleString(
                                      "vi-VN"
                                    )}{" "}
                                    đ
                                  </div>
                                  <IoIosArrowForward />
                                </div>
                                <div className="col-lg-5 right">
                                  <img
                                    src={item.toAccount.pictureURL}
                                    className="img-fluid rounded-full border border-dark"
                                    width={50}
                                    height={50}
                                  />
                                  <span>{item.toAccount.accountName}</span>
                                </div>
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </p>
                  </div>
                </div>
                <div class="col-md-2 c-card-time-money">
                  <div class="card-body py-0">
                    <p class="card-text small fst-italic  mb-2">
                      {item.createTimeString}
                    </p>
                    {item.transaction &&
                      item.transaction.totalAmount !== null &&
                      item.transaction.totalAmount !== 0 && (
                        <p class="card-text c-card-money">
                          -
                          {item.transaction.totalAmount.toLocaleString("vi-VN")}{" "}
                          đ
                        </p>
                      )}
                  </div>
                </div>
              </div>
            </div>
            {showPopupAction && (
              <Popup
                title="Chi tiết hoạt động"
                show={showPopupAction}
                onClose={() => {
                  setShowPopupAction(false);
                }}
              >
                {actionSelected.transaction ? (
                  <>
                    <div>
                      <b> Hạng mục: </b>
                      {actionSelected.transaction?.category.nameVN}
                    </div>
                    <div>
                      <b>Số tiền: </b>
                      {actionSelected.transaction?.totalAmountStr}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                <div>
                  <b>Note: </b>
                  {actionSelected.note}
                </div>
              </Popup>
            )}
          </>
        );
      })}
    </div>
  );
};
