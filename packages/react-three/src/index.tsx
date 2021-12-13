import React from 'react';
import ReactDom from 'react-dom';

import App from './ThreeShowcase/app';

const renderCanvas = () => {
  const container = document.getElementById('container');

  ReactDom.render(<App />, container);
}

window.addEventListener('load', () => {
  setTimeout(renderCanvas, 400);
});