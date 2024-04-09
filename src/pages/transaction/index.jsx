import React, { useEffect, useState } from 'react';
import { PageTitle } from '../../components';
import "../../css/Transaction.css";
import Button from "../../components/Button";
import { getTransaction } from "../../redux/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateTransaction from '../../components/TransactionForm/CreateTransaction';
import { getCategories } from "../../redux/categorySlice";
import { getWallets } from "../../redux/walletSlice";
import { addTransactionwithoutInvoice } from "../../redux/transactionSlice";
import { addInvoiceTransaction } from "../../redux/transactionSlice";
import { getDetailTransaction } from "../../redux/transactionSlice";
import DetailTransaction from '../../components/TransactionForm/DetailTransaction';

const Transaction = () => {

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.values);
  const accountID = useSelector((state) => state.authen.user?.accountID);
  const [editIdModal, setEditIdModal] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const data = await dispatch(getDetailTransaction({ transactionID: editIdModal }));
        setTransactionData(data);
        setIsDataLoaded(true);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
        setIsDataLoaded(true); // Đặt lại isDataLoaded thành true nếu có lỗi xảy ra để tránh lặp vô hạn
      }
    };

    if (editIdModal !== null) {
      setIsDataLoaded(false); // Đặt lại isDataLoaded thành false khi editIdModal thay đổi
      fetchTransactionData();
    }
  }, [editIdModal]);

  const handleEditIdModalSet = (id) => {
    setEditIdModal(id);
  };


  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const retrieveValues = () => {
    dispatch(getTransaction({ pageNumber: currentPage, pageSize }));
  };
  const formatCurrency = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
  const scan = useSelector((state) => state.scan.values);
  const [showCreateTransactionForm, setShowCreateTransactionForm] = useState(false);

  const handleCreateTransaction = (fieldValue) => {
    if (!fieldValue.image) {
      dispatch(addTransactionwithoutInvoice({ accountID: accountID, fieldValue: fieldValue }))
        .unwrap()
        .then(() => setShowCreateTransactionForm(false));
      console.log("không có ảnh");
    } else {
      dispatch(addInvoiceTransaction({ accountID: accountID, fieldValue: fieldValue, scan }))
        .unwrap()
        .then(() => setShowCreateTransactionForm(false));
      console.log("có ảnh");
    }
  };

  return (
    <div className='Transaction'>
      <PageTitle title="Giao dịch" />
      <div className="addTransaction">
        <Button
          size="btn-lg"
          onClick={() => setShowCreateTransactionForm(true)}
          className="active bold btn-light"
        >
          Tạo giao dịch mới
        </Button>
        <Button
          size="btn-lg"
          className="active bold btn-light"
        >
          Các danh mục
        </Button>
      </div>
      {showCreateTransactionForm && (
        <CreateTransaction
          show={showCreateTransactionForm}
          showSet={setShowCreateTransactionForm}
          onSubmit={handleCreateTransaction}
        />
      )}
      <div className="transactiontable">
        <div className="transactiontable-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col" onClick={handleToggleCheckboxes}>
                  {showCheckboxes}
                  #
                </th>
                <th scope="col">Thời gian</th>
                <th scope="col">Danh mục</th>
                <th scope="col">Số tiền</th>
                <th scope="col">Ví</th>
                <th scope="col">Ghi chú</th>
                <th scope="col">Thông tin</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions.resultDTO) && transactions.resultDTO.map((transaction, index) => (
                <tr key={index} onClick={() => setEditIdModal(transaction.transactionID)}>
                  <td>
                    {showCheckboxes && <input type="checkbox" />}
                  </td>
                  <td>{transaction.transactionDateMinus ? `${transaction.transactionDateMinus}` : `${transaction.transactionDateStr, transaction.transactionDateStr}`}</td>
                  <td>{transaction.category.nameVN}</td>
                  <td>
                    {transaction.category.categoryType.categoryTypeID === 1 ? (
                      <span style={{ color: '#4CAF50' }}>+{transaction.totalAmountStr}</span>
                    ) : transaction.category.categoryType.categoryTypeID === 2 ? (
                      <span style={{ color: 'red' }}>-{transaction.totalAmountStr}</span>
                    ) : (
                      <span>{formatCurrency(transaction.totalAmount)}</span>
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
            <a style={{ marginLeft: '20px', marginRight: '10px' }}>Hiển thị</a>
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
            <a style={{ marginLeft: '10px' }}>giao dịch trên mỗi trang</a>
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
      {editIdModal && isDataLoaded && (
        <DetailTransaction
          data={transactionData}
          show={Boolean(editIdModal)}
          onClose={() => setEditIdModal(null)}
        />
      )}
    </div>
  );
};

export default Transaction;
