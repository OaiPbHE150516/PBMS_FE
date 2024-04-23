import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import Progress from "../../components/Progress";
import logo from "../../assets/Logo.png";
import * as dayjs from "dayjs";
import { Form } from "react-bootstrap";
const Card = ({ onDelete, onEdit, onReload, data }) => {
  return (
    <div className="c-card cardBudgetItem">
      <h3 className="c-card__title">{data.budgetName}</h3>
      <div className="ps-3">
        <div className="d-flex gap-3">
          <Progress data={data} />
        </div>
        <div className="d-flex align-items-end w-100 mt-4">
          <div>
            <p className="mb-0 text-base">Số dư: {data.remainAmountStr} </p>
            <p className="mb-0 text-base">
              Hạng mục: {data.categories[0].nameVN}
            </p>
            <p className="mb-0 text-base">Ghi chú: {data.note}</p>
          </div>
          <div className="row ms-auto">
            <button
              className="btn btn-outline-light col-4 fs-5 py-0 text-dark"
              onClick={onDelete}
            >
              <FaRegTrashCan />
            </button>
            <button
              className="btn btn-outline-light col-4 fs-5 py-0 text-dark"
              onClick={onEdit}
            >
              <FaRegEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
