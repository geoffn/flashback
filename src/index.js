import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// if('serviceWorker' in navigator){
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw-cache.js')
//       .then(reg => console.log('Service Worker: Registered'))
//       .catch(err=> console.log('Service worke Error: ' + err))
//   })

// }
