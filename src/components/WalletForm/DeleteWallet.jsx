import React from 'react'
import Popup from '../Popup';

const DeleteWallet = ({name, balance, note, onClose, show, onSubmit = () => {}}) => {
  return (
      <Popup
          title={`Xóa ví “${name}”`}
          show={show}
          onClose={onClose}
          onSubmit={onSubmit}
      >
          <div>
            <p>Tên ví: <b>{name}</b></p>
            <p>Số dư: {balance}</p>
            <p>Ghi chú: {note}</p>
          </div>
      </Popup>
  );
};

export default DeleteWallet