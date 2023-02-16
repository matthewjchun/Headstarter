import React, {useState} from 'react';
import {render} from 'react-dom'
import './calender.css';
import DatePicker from './datePicker';

const ReactCalendar = () => {
  
    return(
        <div className="CWrapper">
            <div className="calender">
                <DatePicker/>
            </div>
            <div className="events"></div>
        </div>
    );
};

export default ReactCalendar;