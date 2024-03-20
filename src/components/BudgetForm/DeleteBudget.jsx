import React from 'react';
import Popup from '../Popup';
import { useDispatch } from 'react-redux';
import { removeBudgets } from '../../redux/budgetSlice';

const DeleteBudget = ({ data, onClose, show }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const { budgetID, accountID } = data;
    dispatch(removeBudgets({ budgetID, accountID }))
      .unwrap()
      .then(() => onClose());
  };

  return (
    <Popup
      title={`Xóa ngân sách “${data.budgetName}”`}
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <p>Lượng ngân sách: <b>{data.targetAmountStr}</b></p>
        <p>Khoảng thời gian: Ngân sách {data.budgetType.typeName}</p>
        <p>Ghi chú: {data.note}</p>
      </div>
    </Popup>
  );
};

export default DeleteBudget;