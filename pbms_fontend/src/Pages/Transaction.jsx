import React from 'react';
import Header from '../Components/Header/Header';
const Transaction = ({ toggleSidebar }) => {
    return (
        <div className='Transaction'>
            <Header toggleSidebar={toggleSidebar} />
            Transaction
        </div>
    );
};

export default Transaction;