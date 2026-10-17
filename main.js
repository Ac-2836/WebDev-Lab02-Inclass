import './style.css';
import { renderApp } from './reactive-engine.js';
import { TaskApp } from './task-app.jsx';

const root = document.getElementById('app');

if (!(root instanceof HTMLElement)) {
  throw new Error('Application root #app was not found');
}

renderApp(TaskApp, root);
