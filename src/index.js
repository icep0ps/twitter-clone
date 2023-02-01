import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './Context/UserContext';
import { BrowserRouter } from 'react-router-dom';
import { TweetsProvider } from './Context/TweetsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <TweetsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TweetsProvider>
  </UserProvider>
);
