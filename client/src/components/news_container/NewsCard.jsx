import React from 'react';

const NewsCard = ({ news }) => (
  <div className="card">
    {news && ( // Check if news prop exists
      <> 
        <h3>{news.title}</h3>
        <p>{news.content}</p>
        <button onClick={() => window.location.href = `/news/${news.id}`}>
          Read More
        </button>
      </>
    )}
  </div>
);

export default NewsCard;