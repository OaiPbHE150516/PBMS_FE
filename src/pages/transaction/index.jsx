import React, { useEffect } from 'react';
import { PageTitle } from '../../components';
import "../../css/Transaction.css";
import Button from "../../components/Button";
import { getTransaction } from "../../redux/transactionSlice";
import { useDispatch, useSelector } from "react-redux";

const Transaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.values);

  const retrieveValues = () => {
    console.log("retrieveValues");
    dispatch(getTransaction());
  };

  useEffect(() => {
    retrieveValues();
  }, []);

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
                <th scope="col">#</th>
                <th scope="col">Time</th>
                <th scope="col">Category</th>
                <th scope="col">Amount</th>
                <th scope="col">Wallet</th>
                <th scope="col">Description</th>
                <th scope="col">Infor</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr>
                  <td></td>
                  <td>{transaction.transactionDateMinus}, {transaction.transactionDateStr}</td>
                  <td>{transaction.category.nameVN}</td>
                  <td>{transaction.totalAmount}</td>
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
