import React, { useEffect } from "react";
import logo from "../../assets/Logo.png";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getActionsOfCollab } from "../../redux/actionSlice";
import * as dayjs from "dayjs";

export const ActionCard = ({ collabID }) => {
  const actions = useAppSelector((state) => state.action.values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getActionsOfCollab(collabID));
  }, [collabID]);

  return (
    <div class="card mb-3 cardActionItem">
      {actions.map((item) => {
        return (
          <>
            <div class="card mb-3 cardActionItem">
              <div class="row g-0 ps-2 py-2">
                <div class="col-md-4 c-card-member-comment">
                  <img
                    src={item.account.pictureURL}
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                  <div class="card-body py-0">
                    <p class="card-text c-card-member mb-2">
                      {item.account.accountName}
                    </p>
                    <p class="card-text">{item.note}</p>
                  </div>
                </div>
                <div class="col-md-8 c-card-time-money">
                  <div class="card-body py-0">
                    <p class="card-text small fst-italic  mb-2">
                      {item.createTimeString}
                    </p>
                    {item.transactionID && (
                      <p class="card-text c-card-money">
                        -{item.transaction.totalAmount.toLocaleString("vi-VN")}{" "}
                        đ
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
