import './style.css';
import './skeleton.css';
import { createElement } from './mini-react.js';
import { renderApp } from './reactive-engine.js';
import { TaskApp } from './task-app.jsx';
import { DataFeed } from './data-feed.jsx';

const root = document.getElementById('app');

if (!(root instanceof HTMLElement)) {
  throw new Error('Application root #app was not found');
}

function LabApp() {
  return createElement('main', { className: 'lab-app' }, TaskApp(), DataFeed());
}

renderApp(LabApp, root);
