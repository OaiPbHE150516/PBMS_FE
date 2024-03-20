import React from 'react'
import Popup from '../Popup';

const DeleteWallet = ({name, balance, note, onClose, show, onSubmit = () => {}}) => {
  return (
      <Popup
          title={`Delete “${name}”`}
          show={show}
          onClose={onClose}
          onSubmit={onSubmit}
      >
          <div>
            <p>Wallet name: <b>{name}</b></p>
            <p>Balance: {balance}</p>
            <p>Note: {note}</p>
          </div>
      </Popup>
  );
};

export default DeleteWallet