import React from 'react';
import { createRoot } from 'react-dom/client';
import CourseHubApp from './CourseHubApp.jsx';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <CourseHubApp />
  </React.StrictMode>
);
