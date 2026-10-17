let stateStore = [];
let cursor = 0;

export function resetCursor() {
  cursor = 0;
}

export function useState(initialValue) {
  const currentCursor = cursor;

  if (stateStore[currentCursor] === undefined) {
    stateStore[currentCursor] = initialValue;
  }

  const setState = (nextState) => {
    stateStore[currentCursor] = nextState;
  };

  const state = stateStore[currentCursor];
  cursor += 1;
  return [state, setState];
}
