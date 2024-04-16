import React, { useEffect } from "react";
import PopupCollabTransaction from "../PopupCollabTransaction";
import { Button } from "react-bootstrap";
function ListTransaction() {
  return <div>Chọn giao dịch gần đây</div>;
}
export const TransactionFrom = ({ show, showSet }) => {
  return (
    <div className="TransactionForm">
      <PopupCollabTransaction
        title={"Thêm giao dịch vào chi tiêu chung"}
        show={show}
        onClose={() => showSet(false)}
      >
        <Button size="btn-lg" className="active bold btn-light">Tạo giao dịch mới</Button>
        <div>Hoặc</div>
        <ListTransaction />
      </PopupCollabTransaction>
    </div>
  );
};
