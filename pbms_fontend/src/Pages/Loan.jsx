import React from 'react';
import Header from '../Components/Header/Header';
const Loan = ({ toggleSidebar }) => {
    return (
        <div className='Loan'>
            <Header toggleSidebar={toggleSidebar} />
            Loan
        </div>
    );
};

export default Loan;