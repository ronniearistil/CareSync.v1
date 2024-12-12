import React, { useEffect, useState } from 'react';
import { fetchAnalytics } from '../../utils/api';

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    fetchAnalytics()
      .then((response) => {
        console.log("API Response:", response.data); // Log the response data
        setAnalytics(response.data);
      })
      .catch((error) => console.error('Failed to fetch analytics:', error));
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      <ul>
        {analytics.map(({ id, metric, value }) => (
          <li key={id}>
            <strong>{metric}</strong>: {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Analytics;



