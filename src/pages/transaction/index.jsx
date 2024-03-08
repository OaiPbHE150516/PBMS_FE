import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../components';
import "../../css/Transaction.css";
import Button from "../../components/Button";
import { getTransaction } from "../../redux/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.values);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const retrieveValues = () => {
    dispatch(getTransaction());
  };

  useEffect(() => {
    retrieveValues();
  }, []);

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <div className='Transaction'>
      <PageTitle title="Transaction" />
      <div className="addTransaction">
        <Button
          size="btn-lg"
          className="active bold btn-light"
        >
          Create new Transaction
        </Button>
        <Button
          size="btn-lg"
          className="active bold btn-light"
        >
          List category
        </Button>
      </div>
      <div className="transactiontable">
        <div className="transactiontable-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" onClick={handleToggleCheckboxes}>
                  {showCheckboxes}
                  #
                </th>
                <th scope="col">Time</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                <th scope="col">Wallet</th>
                <th scope="col">Description</th>
                <th scope="col">Infor</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions.resultDTO) && transactions.resultDTO.map((transaction, index) => (
                <tr key={index}>
                  <td>
                    {showCheckboxes && <input type="checkbox" />}
                  </td>
                  <td>{transaction.transactionDateMinus ? `${transaction.transactionDateMinus}, ${transaction.transactionDateStr}` : transaction.transactionDateStr}</td>
                  <td>{transaction.category.nameVN}</td>
                  <td>
                  {transaction.category.categoryType.categoryTypeID === 1 ? (
                    <span style={{ color: '#4CAF50' }}>+ {transaction.totalAmount}</span>
                  ) : transaction.category.categoryType.categoryTypeID === 2 ? (
                    <span style={{ color: 'red' }}>- {transaction.totalAmount}</span>
                  ) : (
                    <span>{transaction.totalAmount}</span>
                  )}
                </td>
                  <td>{transaction.wallet.name}</td>
                  <td>{transaction.note}</td>
                  <td>{transaction.toPerson}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
