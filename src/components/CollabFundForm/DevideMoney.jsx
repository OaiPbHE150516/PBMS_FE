import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { FormErrorMessage } from "../BudgetForm/FormErrorMessage";
import { useForm } from "react-hook-form";
import Popup from "../Popup";
import logo from "../../assets/Logo.png";
import { FaLongArrowAltRight } from "react-icons/fa";
import useAppSelector from "../../hooks/useAppSelector";
import { useDispatch, useSelector } from "react-redux";
import { addDivideMoney, getInforDivide } from "../../redux/divideMoneySlice";
const DevideMoney = ({ show, showSet, collabFundID }) => {

  const divideMoney = useAppSelector((state) => state.divideMoney.values);
  const accountID = useSelector((state) => state.authen.user?.accountID);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getInforDivide(collabFundID));
  }, [collabFundID, dispatch]);

  const onSubmit = async () => {
    try {
      await dispatch(
        addDivideMoney({ accountID: accountID, fieldValue: { collabFundID: collabFundID } })
      );
      showSet(false);
    } catch (error) {
      console.error("Error adding divide money:", error);
    }
  };
  
  const listDVMI = divideMoney.listDVMI;
  const cfdividingmoney_result = divideMoney.cfdividingmoney_result;
  const cfdm_detail_result = divideMoney.cfdm_detail_result;

  let allTotalTransactions = 0;
  listDVMI.forEach((item) => {
    allTotalTransactions += item.transactionCount;
  });

  return (
    <Popup
      title={"Chia tiền cho các bên"}
      show={show}
      onClose={() => showSet(false)}
      onSubmit={onSubmit}
    >
      <div class=" tableListItem">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Người tham gia</th>
              <th scope="col">Số tiền đã đóng (Ta)</th>
              <th scope="col">Tổng số lần giao dịch</th>
              <th scope="col">
                Số tiền cần đóng thêm / nhận lại (Ta - Ti = S)
              </th>
            </tr>
          </thead>
          <tbody>
            {listDVMI.map((item, index) => (
              <tr>
                <td>{item.account.accountName}</td>
                <td>{item.totalAmount.toLocaleString("vi-VN")}</td>
                <td>{item.transactionCount}</td>
                <td>
                  {item.totalAmount.toLocaleString("vi-VN")} -{" "}
                  {cfdividingmoney_result.averageAmount.toLocaleString("vi-VN")}{" "}
                  ={" "}
                  {(
                    item.totalAmount - cfdividingmoney_result.averageAmount
                  ).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" detailDivideMoney">
        <div className="row">
          <div className="col-md-5 summaryTotal">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th style={{ textAlign: "right" }}>Tổng số giao dịch:</th>
                  <td>{allTotalTransactions}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Tổng số tiền (T):</th>
                  <td>
                    {cfdividingmoney_result.totalAmount.toLocaleString("vi-VN")}
                  </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Số người tham gia (N):</th>
                  <td>{cfdividingmoney_result.numberParticipant}</td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>
                    Tiền trung bình cộng (Ti):
                  </th>
                  <td>
                    {cfdividingmoney_result.averageAmount.toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                </tr>
                <tr>
                  <th style={{ textAlign: "right" }}>Số dư (S):</th>
                  <td>{cfdividingmoney_result.remainAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-7 listDivideMoney">
            {cfdm_detail_result.map((item, index) => (
              <div className="row divideItem">
                <div className="col-lg-5">
                  <input type="checkbox" />
                  <img src={logo} />
                  <span>{item.fromAccount.accountName}</span>
                </div>
                <div className="col-lg-2">
                  <div>{item.dividingAmount.toLocaleString("vi-VN")} đ</div>
                  <div>
                    <FaLongArrowAltRight />
                  </div>
                </div>
                <div className="col-lg-5">
                  <input type="checkbox" />
                  <img src={logo} />
                  <span>{item.toAccount.accountName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default DevideMoney;
