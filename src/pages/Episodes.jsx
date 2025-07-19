import React, { useEffect, useState } from 'react';

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetch('/api/episodes')
      .then(r => r.json())
      .then(setEpisodes);
  }, []);
  return (
    <div>
      <h2>Episodes</h2>
      <ul>
        {episodes.map(e => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}
