import React,{useState} from "react";
import {Form} from "react-bootstrap";
import Button from "../../components/Button";

export const CollaItemCard=({ data, onItemClick }) => {
  const [repeat,repeatSet]=useState(true);
  const handleClick = () => {
    onItemClick(data.collabFundID);
  };

  const formatNumber = (number) => {
    return number.toLocaleString('vi-VN');
  };

  const buttonStyle={
    // backgroundImage: `url(${logo})`,
    backgroundColor: "#EFEDE4",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

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
                </>)
              })}
            </p>
            <p class="card-text small mb-2">Description: {data.description}</p>
            <p class="card-text small">
              <div style={{width: "min-content"}}>
                <Form.Check
                  className="mb-0"
                  type="switch"
                  label="Active"
                  size={"lg"}
                  checked={repeat}
                  onChange={({target: {checked}}) => repeatSet(checked)}
                ></Form.Check>
              </div>
            </p>
          </div>
        </div>
        <div class="col-md-5 collCard-Button p-2" style={buttonStyle}>
          <h5 class="card-title totalMoney pt-2 pb-3 mb-0 fs-6">{formatNumber(data.totalAmount)} đ</h5>
          <div className="listButton">
            <Button size="btn-sm" className="btn btn-outline-secondary">
              <span>New Transaction</span>
            </Button>
            <Button className="btn btn-outline-secondary" size="btn-sm">
              <span>Divide Money</span>
            </Button>
            <Button className="btn btn-outline-secondary" size="btn-sm">
              <span>Edit</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
