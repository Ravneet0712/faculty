import React from 'react';
import { Drawer } from '@mui/material';
/*import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { parseISO } from 'date-fns';
import Event from './Event';*/
import MyForm from '../try.js';

function Drawersend({ open, onClose }) {
  

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          onClose();
        }}
        
      >
        <MyForm/>
        
      </Drawer>
    </div>
  );
}

export default Drawersend;
