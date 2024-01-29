import React from 'react';
import Header from '../Components/Header/Header';
const Chart = ({ toggleSidebar }) => {
    return (
        <div className='Chart'>
            <Header toggleSidebar={toggleSidebar}/>
            Chart
        </div>
    );
};

export default Chart;