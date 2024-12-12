import React, { useEffect, useState } from 'react';
import { fetchNews } from '../utils/api'; // Updated import path
import NewsCard from './NewsCard';

const News = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews()
      .then((response) => setNewsList(response.data))
      .catch((error) => console.error('Failed to fetch news:', error));
  }, []);

  return (
    <div>
      <h2>News</h2>
      <div>
        {newsList.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default News;
