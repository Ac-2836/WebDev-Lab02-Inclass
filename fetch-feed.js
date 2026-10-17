const FEED_ITEMS = Object.freeze([
  Object.freeze({
    id: 'vdom',
    title: 'Virtual DOM',
    description: 'Represent UI trees as lightweight virtual nodes.',
  }),
  Object.freeze({
    id: 'state',
    title: 'Reactive State',
    description: 'Update the interface from a predictable state store.',
  }),
  Object.freeze({
    id: 'events',
    title: 'Event Delegation',
    description: 'Handle bubbled events from one root listener.',
  }),
]);

let shouldFail = false;

export function setFetchFeedShouldFail(nextShouldFail) {
  if (typeof nextShouldFail !== 'boolean') {
    throw new TypeError('Failure mode must be a boolean');
  }

  shouldFail = nextShouldFail;
}

export async function fetchFeed() {
  const requestShouldFail = shouldFail;

  await new Promise((resolve) => {
    window.setTimeout(resolve, 800);
  });

  if (requestShouldFail) {
    throw new Error('The feed service is unavailable. Please try again.');
  }

  return FEED_ITEMS.map((item) => ({ ...item }));
}
