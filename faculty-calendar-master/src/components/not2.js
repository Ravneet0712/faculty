import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Drawer, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import './drawer.css';

function DisplayDataButton() {
  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirm = async () => {
    try {
      const selectedEvent = data.find((item) => item.id === selectedItemId);
  
      // Check if the selected event and endTime exist
      if (selectedEvent && selectedEvent.endtime) {
        // Add the event to the Firebase database
        await addDoc(collection(db, 'events'), {
          title: selectedEvent.title,
          startdate: selectedEvent.startdate,
          endtime: selectedEvent.endtime,
          // Add other relevant fields
        });
  
        // Reset the selected item and close the confirm dialog
        setSelectedItemId(null);
        setShowConfirmModal(false);
  
        // Display a success message or perform any other actions
        console.log('Event added to the database');
      } else {
        // Handle the case where the endTime is missing or undefined
        console.error('Invalid endTime for the selected event');
        // Display an error message or perform any other actions
      }
    } catch (error) {
      console.error('Error adding event to the database:', error);
      // Handle the error, display an error message, or perform any other actions
    }
  };
  
  

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'forms'), where('inputValue', '==', 'Option1'));
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(newData);
      setOpenDrawer(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowConfirmModal(true);
  };

  

  const handleCancel = () => {
    // Logic if user chooses not to add event
    setShowConfirmModal(false);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setSelectedItemId(null); // Reset the selected item when the drawer is closed
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer} classes={{ paper: 'custom-drawer' }}>
        <div>
          <h1 style={{ marginBottom: '20px', marginTop: '30px' }}>Meeting Invites</h1>
          {data.map((item) => (
            <div
              key={item.id}
              style={{ backgroundColor: item.inputValue1 }}
              className={selectedItemId === item.id ? 'selected-item' : ''}
            >
              <button
                onClick={() => handleItemClick(item.id)}
                style={{ backgroundColor: item.inputValue1, width: '320px', height: '65px' }}
              >
                <h2>Title: {item.title}</h2>
                {/* Render other data fields here */}
                
              </button>
              <hr />
            </div>
          ))}
        </div>
      </Drawer>

      <Dialog
        open={showConfirmModal}
        onClose={handleCancel}
        sx={{ '& .MuiDialog-paper': { width: '600px', height: '300px' } }}
      >
        <DialogTitle>Confirm</DialogTitle>
        <DialogContent>
  <h3 style={{marginBottom:"12px"}}><b>Do you want to add this event to your calendar?</b></h3>
  {selectedItemId && data.find((item) => item.id === selectedItemId) && (
    <div style={{fontSize:"18px"}}>
        <p>
        <b>Title:</b>{' '}
        {data.find((item) => item.id === selectedItemId).title }
      </p>
      <p>
        <b>Start Date:</b>{' '}
        {data.find((item) => item.id === selectedItemId).startdate &&
          data.find((item) => item.id === selectedItemId).startdate.toDate().toLocaleDateString()}
      </p>
      <p>
        <b>End Date:</b>{' '}
        {data.find((item) => item.id === selectedItemId).enddate &&
          data.find((item) => item.id === selectedItemId).enddate.toDate().toLocaleDateString()}
      </p>
      <p>
        <b>Start Time:</b>{' '}
        {data.find((item) => item.id === selectedItemId).starttime &&
          data.find((item) => item.id === selectedItemId).starttime.toDate().toLocaleTimeString()}
      </p>
      <p>
        <b>End Time:</b>{' '}
        {data.find((item) => item.id === selectedItemId).endtime &&
          data.find((item) => item.id === selectedItemId).endtime.toDate().toLocaleTimeString()}
      </p>
    </div>
  )}
</DialogContent>

        <DialogActions>
          <Button onClick={handleConfirm} variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>
            Add to Calendar
          </Button>
          <Button onClick={handleCancel} variant="contained" style={{ backgroundColor: 'red', color: 'white' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DisplayDataButton;
