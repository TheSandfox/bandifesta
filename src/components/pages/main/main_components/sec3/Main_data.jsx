import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Main_data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <div className="Main_data">
      <h1>Data from MySQL</h1>
      <ul>
        {data.map(item => (
          <li key={item.notice_id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Main_data;