import React from 'react'
import {FaRegEdit} from 'react-icons/fa';
import {FaRegTrashCan} from 'react-icons/fa6';
import {IoReload} from 'react-icons/io5';
import Progress from '../../components/Progress';
import logo from "../../assets/Logo.png"
import "../../css/Budget.css"

const Card = ({ onDelete, onEdit, onReload }) => {
  return (
      <div className="c-card">
          <h3 className="c-card__title">Budget 1</h3>
          <div className="ps-3">
              <div className="d-flex gap-3">
                  <div className="c-card__logo">
                      <img
                          src={logo}
                          alt=""
                          className="d-block"
                          height={80}
                      />
                  </div>
                  <Progress
                      fromDate={"1/1/2023"}
                      toDate={"1/1/2023"}
                      percent={20}
                      value={"200.000 đ"}
                      fromValue={"0 đ"}
                      toValue={"1.000.000 đ"}
                  />
              </div>
              <div className="d-flex align-items-end w-100 mt-4">
                  <div>
                      <p className="mb-0 text-base">Surplus: 800.000 đ </p>
                      <p className="mb-0 text-base">Note: Shopping</p>
                  </div>
                  <div className="row ms-auto progressIcons">
                      <button
                          className="btn btn-outline-light col-4 fs-5 py-0 text-dark"
                          onClick={onReload}
                      >
                          <IoReload />
                      </button>
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

export default Card