import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import './datePicker.css'

export function Cal ({setSelectedDate}){
    const [value, setValue] = useState(new Date());
    setSelectedDate(value);
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [getDate, setDate] = useState([]);
    useEffect(() => {
        fetch("http://localhost:4000/getCalendar",{
            method:"GET",
        })
        .then((res) => res.json())
        .then((data) => {
            setDate(data.data);
        }); 
    }, []);
    for (var i=0; i < getDate.length; i++) {
        highlightedDays.push(parseInt(getDate.pop().date));
    } 
return(
        <LocalizationProvider dateAdapter= {AdapterDateFns}>
            <StaticDatePicker
            variant='static'
            orientation='portrait'
            disablePast
            value={value}
            onChange={(newValue) => {
                setValue(newValue)}
            }renderInput={(params) => {<TextField {... params}/>;
            }}
            renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                    !DayComponentProps.outsideCurrentMonth &&
                    highlightedDays.indexOf(day.getDate()) >= 0;

                return (
                    <Badge
                    key={day.toString()}
                    overlap='circular'
                    badgeContent={isSelected ? <CheckIcon/> : undefined}
                    >
                    <PickersDay {...DayComponentProps} />
                    </Badge>
                );
            }}
            ></StaticDatePicker>
        </LocalizationProvider>
    )

}
export default Cal;
