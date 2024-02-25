import React from 'react'
import Popup from '../Popup';

const DeleteBudget = ({name, amount, note, period, onClose, show, onSubmit}) => {
  return (
      <Popup
          title={`Delete Budget “${name}”`}
          show={show}
          onClose={onClose}
          onSubmit={onSubmit}
      >
          <div>
            <p>Budget Amount: <b>{amount}</b></p>
            <p>Period: {period}</p>
            <p>Note: {note}</p>
          </div>
      </Popup>
  );
};

export default DeleteBudget