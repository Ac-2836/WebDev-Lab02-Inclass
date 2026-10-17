import { setupEventDelegation } from './event-delegation-hub.js';
import { renderToDOM } from './mini-react.js';

let stateStore = [];
let cursor = 0;
let triggerRender = () => {};

export function setRenderer(renderer) {
  if (typeof renderer !== 'function') {
    throw new TypeError('Renderer must be a function');
  }

  triggerRender = renderer;
}

export function resetCursor() {
  cursor = 0;
}

export function useState(initialValue) {
  const currentCursor = cursor;

  if (stateStore[currentCursor] === undefined) {
    stateStore[currentCursor] = initialValue;
  }

  const setState = (nextState) => {
    const previousState = stateStore[currentCursor];
    const resolvedState =
      typeof nextState === 'function'
        ? nextState(previousState)
        : nextState;

    if (Object.is(previousState, resolvedState)) {
      return;
    }

    stateStore[currentCursor] = resolvedState;
    triggerRender();
  };

  const state = stateStore[currentCursor];
  cursor += 1;
  return [state, setState];
}

export function renderApp(rootComponent, rootContainer) {
  if (typeof rootComponent !== 'function') {
    throw new TypeError('Root component must be a function');
  }

  if (!(rootContainer instanceof Element)) {
    throw new TypeError('Render root must be an Element');
  }

  const render = () => {
    resetCursor();
    rootContainer.replaceChildren(renderToDOM(rootComponent()));
  };

  setupEventDelegation(rootContainer);
  setRenderer(render);
  render();
}
