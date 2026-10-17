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
      .filter(
        (child) => child !== null && child !== undefined && child !== false,
      )
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

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isVNode(value) {
  return (
    isRecord(value) &&
    ('type' in value) &&
    ('props' in value) &&
    isRecord(value.props) &&
    Array.isArray(value.props.children)
  );
}

function setDOMProp(dom, name, value) {
  if (name === 'children' || name === 'nodeValue') {
    return;
  }

  if (name === 'innerHTML' || name === 'outerHTML' || name === 'srcdoc') {
    throw new TypeError(`Unsafe DOM property: ${name}`);
  }

  if (name.startsWith('on')) {
    if (typeof value !== 'function') {
      throw new TypeError(`Event handler ${name} must be a function`);
    }

    return;
  }

  if (value === null || value === undefined) {
    return;
  }

  if (name === 'style') {
    if (!isRecord(value)) {
      throw new TypeError('The style prop must be an object');
    }

    Object.assign(dom.style, value);
    return;
  }

  if (!['string', 'number', 'boolean'].includes(typeof value)) {
    throw new TypeError(`DOM property ${name} must be a primitive value`);
  }

  if (name === 'className') {
    dom.className = value;
  } else if (name in dom) {
    dom[name] = value;
  } else {
    dom.setAttribute(name, String(value));
  }
}

export function renderToDOM(vNode) {
  if (!isVNode(vNode)) {
    throw new TypeError('Expected a valid VNode');
  }

  if (typeof vNode.type !== 'string') {
    throw new TypeError('Function components are not supported yet');
  }

  if (vNode.type === 'TEXT_ELEMENT') {
    if (typeof vNode.props.nodeValue !== 'string') {
      throw new TypeError('Text VNodes must have a string nodeValue');
    }

    const textNode = document.createTextNode(vNode.props.nodeValue);
    textNode.__vnode = vNode;
    return textNode;
  }

  const dom = document.createElement(vNode.type);
  dom.__vnode = vNode;

  Object.entries(vNode.props).forEach(([name, value]) => {
    setDOMProp(dom, name, value);
  });

  vNode.props.children.forEach((child) => {
    dom.appendChild(renderToDOM(child));
  });

  return dom;
}
