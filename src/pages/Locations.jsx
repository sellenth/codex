import React, { useEffect, useState } from 'react';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    fetch('/api/locations')
      .then(r => r.json())
      .then(setLocations);
  }, []);
  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {locations.map(l => (
          <li key={l.id}>{l.name}</li>
        ))}
      </ul>
    </div>
  );
}
