import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function MyNot() {
  const [promptData, setPromptData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'forms'), (snapshot) => {
      const newData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          startdate: data.startdate?.toDate(),
          enddate: data.enddate?.toDate(),
        };
      });
      setPromptData(newData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {promptData.map((data) => (
        <div key={data.id}>
          <h3>Title: {data.title}</h3>
          <p>Input Value: {data.inputValue}</p>
          <p>Start Date: {data.startdate?.toString()}</p>
          <p>Start Time: {data.starttime}</p>
          <p>End Date: {data.enddate?.toString()}</p>
          <p>End Time: {data.endtime}</p>
          <p>Input Value 1: {data.inputValue1}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default MyNot;

