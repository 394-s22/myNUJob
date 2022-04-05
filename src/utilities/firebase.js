import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import React, { useState, useEffect } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyD7UQB82McTzvzjMjKcUxH_qkQPb1mfOMk",
  authDomain: "mynujob-394.firebaseapp.com",
  databaseURL: "https://mynujob-394-default-rtdb.firebaseio.com",
  projectId: "mynujob-394",
  storageBucket: "mynujob-394.appspot.com",
  messagingSenderId: "896744341348",
  appId: "1:896744341348:web:c78a853ff8a41370e1c471",
  measurementId: "G-46EZ8YGDBH"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const dbRef = ref(database, path);
    const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    if (devMode) { console.log(`loading ${path}`); }
    return onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (devMode) { console.log(val); }
      setData(transform ? transform(val) : val);
      setLoading(false);
      setError(null);
    }, (error) => {
      setData(null);
      setLoading(false);
      setError(error);
    });
  }, [path, transform]);

  return [data, loading, error];
};
