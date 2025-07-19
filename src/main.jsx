import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter, Route, Outlet } from '@tanstack/react-router';
import Home from './pages/Home';
import Characters from './pages/Characters';
import Locations from './pages/Locations';
import Episodes from './pages/Episodes';
import Storyboard from './pages/Storyboard';
import RemotionDemo from './pages/RemotionDemo';
import Settings from './pages/Settings';

const routeTree = (
  <Route path="/" element={<Outlet />}> 
    <Route index element={<Home />} />
    <Route path="characters" element={<Characters />} />
    <Route path="locations" element={<Locations />} />
    <Route path="episodes" element={<Episodes />} />
    <Route path="storyboard" element={<Storyboard />} />
    <Route path="remotion" element={<RemotionDemo />} />
    <Route path="settings" element={<Settings />} />
  </Route>
);

const router = createRouter({
  routeTree,
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
