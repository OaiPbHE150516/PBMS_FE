import React from 'react';
import Header from '../Components/Header/Header';

const Calendar = ({ toggleSidebar }) => {
    return (
        <div className='Calendar'>
            <Header toggleSidebar={toggleSidebar}/>
            Calendar
        </div>
    );
};

export default Calendar;