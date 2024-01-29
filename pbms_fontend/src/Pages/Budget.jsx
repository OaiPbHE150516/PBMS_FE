import React from 'react';
import Header from '../Components/Header/Header';

const Budget = ({ toggleSidebar }) => {
    return (
        <div className='Budget'>
            <Header toggleSidebar={toggleSidebar}/>
            Budget
        </div>
    );
};

export default Budget;