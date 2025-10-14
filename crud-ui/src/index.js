import React from 'react';
import ReactDOM from 'react-dom/client';
import { Login } from './Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dash';
import { InStock } from './InStock';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      {
        localStorage.getItem("token")
        ?
        <>
          <a href={'/'}>Home</a>
          <a href={'/new'}>New Car</a>
          <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/new' element={<InStock/>} />
            <Route path='/update/:edit' element={<InStock/>} />
          </Routes>
        </>
        :
        <Login/>
      }
    </BrowserRouter>
  </>
);