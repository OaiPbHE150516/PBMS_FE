import React, { useEffect } from "react";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { getHistory } from "../../redux/historyCollabSlice";
import { IoIosArrowForward } from "react-icons/io";
export const HistoryTab = ({ collabID }) => {
  const user = useAppSelector((state) => state.authen.user);
  const dispatch = useDispatch();
  const histories = useAppSelector((state) => state.historyCollab.values);

  useEffect(() => {
    dispatch(getHistory({ collabID }));
  }, [user, collabID]);

  return (
    <div class="card mb-3 cardActionItem">
      {histories.map((item) => (
        <div className="col-md-11 cardHistoItem">
          <div className="row">
            <div className="time">
              {item.createTimeDetail.short_VN}, ngày{" "}
              {item.createTimeDetail.dayStr}{" "}
              {item.createTimeDetail.monthYearStr}
            </div>
            <div className="deltailMoney">
              <div className="moneyItem">
                <div className="col-md-6 titleMoney">Tổng tiền</div>
                <div className="col-md-6 numberMoney">
                  {item.totalAmountStr}
                </div>
              </div>
              <div className="moneyItem">
                <div className="col-md-6 titleMoney">Số người tham gia</div>
                <div className="col-md-6 numberMoney">
                  {item.numberParticipant}
                </div>
              </div>
              <div className="moneyItem">
                <div className="col-md-6 titleMoney">Tiền trung bình</div>
                <div className="col-md-6 numberMoney">
                  {item.averageAmountStr}
                </div>
              </div>
            </div>
            <div>
              {item.list_CFDM_Detail_VM_DTO.map((item, index) => (
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
                    <div className="amount">{item.dividingAmount.toLocaleString("vi-VN")} đ</div>
                    <IoIosArrowForward />
                  </div>
                  <div className="col-lg-5 right">
                    <img
                      src={item.fromAccount.pictureURL}
                      className="img-fluid rounded-full border border-dark"
                      width={50}
                      height={50}
                    />
                    <span>{item.toAccount.accountName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
