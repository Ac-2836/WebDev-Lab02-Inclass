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
