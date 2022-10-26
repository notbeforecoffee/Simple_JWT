import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const storedJwt = localStorage.getItem('token');
  const [jwt, setJwt] = useState(storedJwt || null);
  const [foods, setFoods] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [clearError, setClearError] = useState(null);

  // Request to endpoint to set the cookie
  const getJwt = async () => {
    const { data } = await axios.get(`/api/jwt`);
    // Value saved in state. Displayed on page
    setJwt(data.token);
  };

  // Request to endpoint to get the list of food
  const getFoods = async () => {
    try {
      const { data } = await axios.get(`/api/foods`);
      setFoods(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  // Clear the cookie
  const clearJwt = async () => {
      try {
        await axios.get(`/api/clearCookie`);
      } catch (err) {
        setClearError(err.message);
      }
  };

  return (
    <>
      <section style={{ marginBottom: '10px' }}>
        <button onClick={() => getJwt()}>Get JWT</button>
        {jwt && (
          <pre>
            <code>{jwt}</code>
          </pre>
        )}
      </section>
      <section>
        <button onClick={() => getFoods()}>Get Foods</button>
        <ul>
          {foods.map((food, i) => (
            <li>{food.description}</li>
          ))}
        </ul>
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
      </section>
      <section>
        <button onClick={() => clearJwt()}>Clear JWT</button>
        {clearError && <p style={{ color: 'red' }}>{clearError}</p>}
      </section>
    </>
  );
}
export default App;
