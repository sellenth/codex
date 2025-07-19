import React, { useEffect, useState } from 'react';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    fetch('/api/characters')
      .then(r => r.json())
      .then(setCharacters);
  }, []);
  return (
    <div>
      <h2>Characters</h2>
      <ul>
        {characters.map(c => (
          <li key={c.id}>{c.name} - {c.occupation}</li>
        ))}
      </ul>
    </div>
  );
}
