/*
you need to add user id who is sending and user id of the person you are sending
change any details if you want
line129  add list of users to whom you can send msg
line103     to add data to table forms
*/



import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { TextField, Button, Select, MenuItem, InputLabel } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './EventForm/EventForm.js';

function MyForm() {
  const [inputValue, setInputValue] = useState({
    title: '',
    inputValue: '',
    startdate: '',
    starttime: '',
    enddate:'',
    endtime: '',
    inputValue1: '',
  });

  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    }));
  };
  
  const handleDateChange = (date) => {
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      startdate: date
    }));
  };
  const handleEDateChange = (date) => {
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      enddate: date
    }));
  };

  const handleTimeChange = (time) => {
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      starttime: time,
    }));
  };
  const handleETimeChange = (time) => {
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      endtime: time,
    }));
  };
  
  const handleESelectChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    }));
  };
  
  
  
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prevInputValues) => ({
      ...prevInputValues,
      [name]: value
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Create an object with the input value
    const formData = {
      inputValue: inputValue.inputValue,
      title: inputValue.title,
      startdate: inputValue.startdate,
      starttime: inputValue.starttime,
      enddate: inputValue.enddate,
      endtime: inputValue.endtime,
      inputValue1: inputValue.inputValue1
    };
  
    // Add the form data to the Firebase database
    addDoc(collection(db, 'forms'), formData)
      .then((docRef) => {
        console.log('Form data added with ID: ', docRef.id);
        // Reset the input value after successful submission
        setInputValue({
          inputValue: '',
          title: '',
          startdate: '',
          starttime: '',
          endtime: '',
          inputValue1: ''
        });
      })
      .catch((error) => {
        console.error('Error adding form data: ', error);
      });
  };
  

  return (
    <div className="new-event" style={{ marginTop: '20px' }}>
    <form onSubmit={handleSubmit}>
  <div className="form-row">
    <InputLabel htmlFor="bc" className="form-label" style={{ fontSize: '20px', marginBottom: '-18px' }}>
      Select User:
    </InputLabel>
    <br />
    <Select style={{ width: "250px", marginBottom: "22px" }} value={inputValue.inputValue} onChange={handleSelectChange} name="inputValue">
      <MenuItem value="Option1">Option1</MenuItem>
      <MenuItem value="Option2">Option2</MenuItem>
      <MenuItem value="Option3">Option3</MenuItem>
    </Select>
  </div>
  <div className="form-row" >
    <InputLabel htmlFor="bc" className="form-label" style={{ fontSize: '20px', marginBottom: '-18px' }}>
      Event Title:
    </InputLabel>
    <br />
    <TextField
      type="text"
      placeholder="Add Title"
      className="form-input"
      style={{ fontSize: '20px', width: '100%' }}
      value={inputValue.title}
    onChange={(event) => handleInputChange(event)}
      name="title" // Added the name attribute
      id="bc"
    />
  </div>
  <div className="form-row">
          <InputLabel htmlFor="datepicker" className="form-label" style={{ fontSize: '20px' }}>
            Start Date:
          </InputLabel>
          <div className="form-input">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id="datepicker"
                placeholderText="Start Date"
                value={inputValue.startdate}
                onChange={(date) => handleDateChange(date)}
                name="startdate"

                
              />
            </LocalizationProvider>
          </div>
    </div>
    <div className="form-row">
          <InputLabel htmlFor="stime" className="form-label" style={{ fontSize: '20px' }}>
            Start Time:
          </InputLabel>
          <div className="form-input">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                id="stime"
                placeholderText="Start Time"
                value={inputValue.starttime}
                onChange={(time) => handleTimeChange(time)}
                
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="form-row">
          <InputLabel htmlFor="datepicker" className="form-label" style={{ fontSize: '20px' }}>
            End Date:
          </InputLabel>
          <div className="form-input">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                id="datepicker"
                placeholderText="End Date"
                value={inputValue.enddate}
                onChange={(date) => handleEDateChange(date)}
                name="enddate"

                
              />
            </LocalizationProvider>
          </div>
    </div>
    <div className="form-row">
          <InputLabel htmlFor="stime" className="form-label" style={{ fontSize: '20px' }}>
            End Time:
          </InputLabel>
          <div className="form-input">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                id="stime"
                placeholderText="End Time"
                value={inputValue.endtime}
                onChange={(time) => handleETimeChange(time)}
                
              />
            </LocalizationProvider>
          </div>
        </div>
    <div className="form-row">
    <InputLabel htmlFor="bc" className="form-label" style={{ fontSize: '20px', marginBottom: '-18px' }}>
      Event Type:
    </InputLabel>
    <br />
    <Select style={{ width: "250px", marginBottom: "22px" }} value={inputValue.inputValue1} onChange={handleESelectChange} name="inputValue1">
      <MenuItem value="#B94747">Important</MenuItem>
      <MenuItem value="#44BC44">Personal</MenuItem>
      <MenuItem value="#6656D3">Class related</MenuItem>
    </Select>
  </div>
  <Button type="submit" variant="contained" >
          Submit
</Button>
</form>
</div>
        
  );
}

export default MyForm;
