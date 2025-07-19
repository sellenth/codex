import React, { useState, useEffect } from 'react';

export default function Storyboard() {
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [scenes, setScenes] = useState([]);
  const [selectedCharacters, setSelectedCharacters] = useState([]);
  const [locationId, setLocationId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/characters').then(r => r.json()).then(setCharacters);
    fetch('/api/locations').then(r => r.json()).then(setLocations);
    fetch('/api/scenes').then(r => r.json()).then(setScenes);
  }, []);

  const createScene = async () => {
    const res = await fetch('/api/scenes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        characterIds: selectedCharacters.map(id => Number(id)),
        locationId: Number(locationId),
        description,
      })
    });
    const json = await res.json();
    setScenes(prev => [...prev, json]);
  };

  return (
    <div>
      <h2>Storyboard</h2>
      <div>
        <h3>Create Scene</h3>
        <label>Characters:</label>
        <select multiple value={selectedCharacters} onChange={e => setSelectedCharacters(Array.from(e.target.selectedOptions).map(o => o.value))}>
          {characters.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <label>Location:</label>
        <select value={locationId} onChange={e => setLocationId(e.target.value)}>
          <option value="">Select location</option>
          {locations.map(l => (
            <option key={l.id} value={l.id}>{l.name}</option>
          ))}
        </select>
        <label>Description:</label>
        <input value={description} onChange={e => setDescription(e.target.value)} />
        <button onClick={createScene}>Create</button>
      </div>

      <h3>Scenes</h3>
      <ul>
        {scenes.map(s => (
          <li key={s.id}>{`Characters: ${s.characterIds.join(',')} Location: ${s.locationId} ${s.description}`}</li>
        ))}
      </ul>
    </div>
  );
}
