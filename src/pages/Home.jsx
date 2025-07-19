import React from 'react';
import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <div>
      <h1>Love Island Storyboard</h1>
      <nav>
        <ul>
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/locations">Locations</Link></li>
          <li><Link to="/episodes">Episodes</Link></li>
          <li><Link to="/storyboard">Storyboard</Link></li>
          <li><Link to="/remotion">Remotion Demo</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
}
