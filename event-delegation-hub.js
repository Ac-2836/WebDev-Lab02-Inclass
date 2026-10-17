const EVENT_HANDLER_PROPS = Object.freeze({
  click: 'onClick',
  input: 'onInput',
  keydown: 'onKeydown',
});

const configuredRoots = new WeakSet();

function isRecord(value) {
  return typeof value === 'object' && value !== null;
}

function dispatchToVNodeHandler(rootContainer, eventType, nativeEvent) {
  const handlerProp = EVENT_HANDLER_PROPS[eventType];
  let currentNode = nativeEvent.target;

  if (!(currentNode instanceof Node)) {
    return;
  }

  while (currentNode !== rootContainer) {
    if (currentNode instanceof Element) {
      const vNode = currentNode.__vnode;

      if (isRecord(vNode) && isRecord(vNode.props)) {
        const handler = vNode.props[handlerProp];

        if (handler !== undefined) {
          if (typeof handler !== 'function') {
            throw new TypeError(`${handlerProp} must be a function`);
          }

          handler.call(currentNode, nativeEvent);
          return;
        }
      }
    }

    currentNode = currentNode.parentNode;

    if (currentNode === null) {
      return;
    }
  }
}

export function setupEventDelegation(rootContainer) {
  if (!(rootContainer instanceof Element)) {
    throw new TypeError('Event delegation root must be an Element');
  }

  if (configuredRoots.has(rootContainer)) {
    return;
  }

  Object.entries(EVENT_HANDLER_PROPS).forEach(([eventType]) => {
    rootContainer.addEventListener(eventType, (nativeEvent) => {
      dispatchToVNodeHandler(rootContainer, eventType, nativeEvent);
    });
  });

  configuredRoots.add(rootContainer);
}
