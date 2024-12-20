import React, { useEffect, useState } from 'react';
import * as api from '../../utils/newsApi'; // Namespace import
import NewsCard from './NewsCard';

const News = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    api.fetchNews() // Access fetchNews via the namespace import
      .then((response) => setNewsList(response))
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
