import { createElement, renderToDOM } from './mini-react.js';

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertMatchesVNode(vNode, domNode) {
  if (vNode.type === 'TEXT_ELEMENT') {
    assert(domNode.nodeType === Node.TEXT_NODE, 'Expected a text node');
    assert(
      domNode.nodeValue === vNode.props.nodeValue,
      'Text node does not match its VNode',
    );
    return;
  }

  assert(domNode.nodeType === Node.ELEMENT_NODE, 'Expected an element node');
  assert(
    domNode.tagName.toLowerCase() === vNode.type,
    'Element does not match its VNode type',
  );

  if (typeof vNode.props.className === 'string') {
    assert(
      domNode.className === vNode.props.className,
      'Element class does not match its VNode',
    );
  }

  if (typeof vNode.props.id === 'string') {
    assert(domNode.id === vNode.props.id, 'Element id does not match its VNode');
  }

  assert(
    domNode.childNodes.length === vNode.props.children.length,
    'DOM child count does not match its VNode',
  );

  vNode.props.children.forEach((child, index) => {
    assertMatchesVNode(child, domNode.childNodes[index]);
  });
}

const unsafeText = '<script>alert(1)</script> Safe Text';
let clickCount = 0;

const vApp = createElement(
  'section',
  { id: 'root-view', className: 'hero', role: 'region' },
  createElement(
    'header',
    null,
    createElement('h1', null, 'Mini React Engine'),
    createElement('p', null, unsafeText),
  ),
  createElement(
    'button',
    {
      onClick: () => {
        clickCount += 1;
      },
      type: 'button',
    },
    'Click',
  ),
);

const root = document.getElementById('app') ?? document.createElement('main');
root.id = 'app';

if (!root.isConnected) {
  document.body.appendChild(root);
}

root.replaceChildren(renderToDOM(vApp));

const button = root.querySelector('button');
console.assert(button !== null, 'Mount Failed');
assert(button !== null, 'Mount Failed');

assertMatchesVNode(vApp, root.firstChild);
assert(
  root.querySelector('script') === null,
  'Untrusted text must not create a script element',
);
assert(
  root.querySelector('p')?.textContent === unsafeText,
  'Untrusted text must render as plain text',
);

button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
assert(clickCount === 1, 'Button click handler did not run');

console.info('Checkpoint 1 passed: DOM, text safety, and click handler.');
