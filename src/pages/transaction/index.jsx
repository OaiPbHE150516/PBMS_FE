import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../components';
import "../../css/Transaction.css";
import Button from "../../components/Button";
import { getTransaction } from "../../redux/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from '../../components/TransactionForm/CreateTransaction';
import { getCategories } from "../../redux/categorySlice";
import { getWallets } from "../../redux/walletSlice";

const Transaction = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.values);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const retrieveValues = () => {
    dispatch(getTransaction({ pageNumber: currentPage, pageSize }));
  };

  useEffect(() => {
    retrieveValues();
  }, [currentPage, pageSize]);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getWallets());
  }, []);

  const handleToggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (event) => {
    const selectedPageSize = parseInt(event.target.value, 10);
    setPageSize(selectedPageSize);
  };
  const [show, showSet] = useState(false);
  return (
    <div className='Transaction'>
      <PageTitle title="Transaction" />
      <div className="addTransaction">
        <Button
          size="btn-lg"
          onClick={() => showSet(!show)}
          className="active bold btn-light"
        >
          Create new Transaction
        </Button>
        <CreateTransaction
          show={show}
          showSet={showSet}
        // onSubmit={(fieldValue) =>
        //   dispatch(addWallet({ accountID: accountID, fieldValue: fieldValue }))
        //     .unwrap()
        //     .then(() => showSet(false))
        // }
        />
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
                      <span style={{ color: '#4CAF50' }}>+{transaction.totalAmount}</span>
                    ) : transaction.category.categoryType.categoryTypeID === 2 ? (
                      <span style={{ color: 'red' }}>-{transaction.totalAmount}</span>
                    ) : (
                      <span>{transaction.totalAmount}</span>
                    )}
                  </td>

                  <td style={{ width: "150px" }}>
                    {transaction.wallet.name}
                  </td>
                  <td>
                    {transaction.note.length > 40 ? (
                      <>{transaction.note.substring(0, 40)}...</>
                    ) : (
                      <>{transaction.note}</>
                    )}
                  </td>
                  <td>
                    {transaction.note.length > 10 ? (
                      <>{transaction.note.substring(0, 10)}...</>
                    ) : (
                      <>{transaction.note}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a style={{ marginLeft: '20px', marginRight: '10px' }}>Show</a>
            <select
              className="form-select"
              style={{ width: '70px' }}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
            <a style={{ marginLeft: '10px' }}>entries per page</a>
            <ul className="pagination justify-content-end" style={{ marginLeft: 'auto' }}>
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageClick(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {'<<<'}
                </button>
              </li>
              {[1, 2, 3].map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageClick(page)}>
                    {page}
                  </button>
                </li>
              ))}
              {transactions.totalPage > 3 && (
                <>
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                  <li className={`page-item ${currentPage === transactions.totalPage - 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(transactions.totalPage - 1)}
                    >
                      {transactions.totalPage - 1}
                    </button>
                  </li>
                  <li className={`page-item ${currentPage === transactions.totalPage ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageClick(transactions.totalPage)}
                    >
                      {transactions.totalPage}
                    </button>
                  </li>
                </>
              )}
              <li className={`page-item ${currentPage === transactions.totalPage ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageClick(currentPage + 1)}
                  disabled={currentPage === transactions.totalPage}
                >
                  {'>>>'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
