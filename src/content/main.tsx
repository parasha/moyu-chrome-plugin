import React from 'react'
import ReactDOM from 'react-dom/client'

import App from '../content/App'

const insertWindow = () => {
  const AppDom = document.createElement('div');
  AppDom.setAttribute('id', 'moyu-chrome-chrome-plugin-insert-pop');
  document.body.appendChild(AppDom);

  ReactDOM.createRoot(AppDom).render(
    <App />
  )
};


insertWindow();