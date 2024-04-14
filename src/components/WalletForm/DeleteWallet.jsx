import React from 'react'
import PopupDelete from '../PopupDelete';

const DeleteWallet = ({name, balance, note, onClose, show, onSubmit = () => {}}) => {
  return (
      <PopupDelete
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
      </PopupDelete>
  );
};

export default DeleteWallet