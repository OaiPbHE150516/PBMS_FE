import React from 'react';
import Header from '../Components/Header/Header';
const Wallet = ({ toggleSidebar }) => {
    return (
        <div className='Wallet'>
            <Header toggleSidebar={toggleSidebar} />
            Wallet
        </div>
    );
};

export default Wallet;