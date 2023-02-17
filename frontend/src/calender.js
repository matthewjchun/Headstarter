import React, {useState} from 'react';
import {render} from 'react-dom'
import './calender.css';
import DatePicker from './datePicker';

export function ReactCalendar(){
    const [selectedDate, setSelectedDate] = useState();
    const [timeSlot, setTimeSlot] = useState("");

    const handleClick = (value) => {
        setTimeSlot(value);
    }
    function refreshPage() {
        window.location.reload(true);
    } 

    function handleSubmit(){
        const clock = timeSlot;
        const year = selectedDate.getFullYear();
        const date = selectedDate.getDate();
        const month = selectedDate.getMonth();
        try{
            fetch("http://localhost:4000/calendar",{
                method:"POST",
                crossDomain:true,
                headers:{
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    year,
                    date,
                    month,
                    clock,
                }),
            }).then((res) => res.json())
            .then((data) => {
                console.log(data, "calendar");
            });
        }catch (err){
            console.log(err)
        }
        
    }
    function clicked(){
        handleSubmit();
        refreshPage();
    }
    const time = [
        "9:00AM", "10:00AM", "11:00AM",
        "12:00PM", "01:00PM", "02:00PM",
        "03:00PM", "04:00PM", "05:00PM",
        "06:00PM", "07:00PM", "08:00PM",
        "09:00AM", "10:00PM", "11:00PM"

    ];
    const listTime = time.map((time) => 
    <button className="timeSlot" key={time.toString()} value={time} onClick={(e) => {
                handleClick(e.target.value)}}>{time}</button>
    );
    return(
        <div className="CWrapper">
            <div className="calender">
                <DatePicker setSelectedDate={setSelectedDate}/>
            </div>
            <div className="events">
                <div className="time">{timeSlot}</div>
                {listTime}
            <button className="btnCalendar" onClick={() => clicked()}>Done</button>
            </div>
        </div>
    );
};

export default ReactCalendar;