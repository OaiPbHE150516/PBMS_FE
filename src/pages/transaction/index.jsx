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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const retrieveValues = () => {
    dispatch(getTransaction({ pageNumber: currentPage, pageSize }));
  };

  useEffect(() => {
    retrieveValues();
  }, [currentPage, pageSize]);

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
                <th style={{ width: '50px' }} scope="col" onClick={handleToggleCheckboxes}>
                  {showCheckboxes}
                  #
                </th>
                <th scope="col" style={{ width: '150px' }}>Time</th>
                <th scope="col" style={{ width: '150px' }}>Category</th>
                <th scope="col" style={{ width: '150px' }}>Amount</th>
                <th scope="col" style={{ width: '150px' }}>Wallet</th>
                <th scope="col" style={{ width: '150px' }}>Description</th>
                <th scope="col" style={{ width: '150px' }}>Infor</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions.resultDTO) && transactions.resultDTO.map((transaction, index) => (
                <tr key={index}>
                  <td style={{ width: '50px' }}>
                    {showCheckboxes && <input type="checkbox" />}
                  </td>
                  <td style={{ width: '150px' }}>{transaction.transactionDateMinus ? `${transaction.transactionDateMinus}, ${transaction.transactionDateStr}` : transaction.transactionDateStr}</td>
                  <td style={{ width: '150px' }}>{transaction.category.nameVN}</td>
                  <td style={{ width: '150px' }}>
                    {transaction.category.categoryType.categoryTypeID === 1 ? (
                      <span style={{ color: '#4CAF50' }}>+{transaction.totalAmount}</span>
                    ) : transaction.category.categoryType.categoryTypeID === 2 ? (
                      <span style={{ color: 'red' }}>-{transaction.totalAmount}</span>
                    ) : (
                      <span>{transaction.totalAmount}</span>
                    )}
                  </td>

                  <td style={{ width: '150px' }}>{transaction.wallet.name}</td>
                  <td style={{ width: '150px' }}>{transaction.note}</td>
                  <td style={{ width: '150px' }}>{transaction.toPerson}</td>
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
