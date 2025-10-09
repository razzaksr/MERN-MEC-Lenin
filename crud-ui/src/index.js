import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      {
        localStorage.getItem("token")?
        <>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
          </Routes>
        </>
        :
        <Login/>
      }
    </BrowserRouter>
  </>
);