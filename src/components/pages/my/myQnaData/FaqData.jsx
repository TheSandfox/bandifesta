import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FaqData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3012/data', { withCredentials: true })
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
      {data.map(item => (
        <ul key={item.notice_id}>
          <li>{item.idx}</li>
          <li>{item.title}</li>
          <li>{item.text}</li>
          <li>{item.create_time}</li>
          <li>{item.user_id}</li>
        </ul>
      ))}
    </div>
  );
}

export default FaqData;