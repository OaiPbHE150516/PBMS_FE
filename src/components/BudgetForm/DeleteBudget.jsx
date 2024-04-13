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
      title={`Xóa hạn mức “${data.budgetName}”`}
      show={show}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div>
        <p>Ngưỡng chi tiêu: <b>{data.targetAmountStr}</b></p>
        <p>Ghi chú: {data.note}</p>
      </div>
    </Popup>
  );
};

export default DeleteBudget;