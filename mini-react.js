export function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: String(text),
      children: [],
    },
  };
}

export function createElement(type, props, ...children) {
  const normalizedChildren = Object.freeze(
    children
      .flat(Infinity)
      .filter((child) => child !== null && child !== undefined && child !== false)
      .map((child) => {
        if (typeof child === 'object') {
          return child;
        }

        const textVNode = createTextElement(child);
        Object.freeze(textVNode.props.children);
        Object.freeze(textVNode.props);
        return Object.freeze(textVNode);
      }),
  );
  const frozenProps = Object.freeze({
    ...(props || {}),
    children: normalizedChildren,
  });

  return Object.freeze({
    type,
    props: frozenProps,
  });
}
