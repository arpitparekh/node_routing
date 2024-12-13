import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import UserComp from './mysql_integration/UserComp';
import reportWebVitals from './reportWebVitals';
// import RefComp from './hooks/RefComp';
import Myform from './hooks/Myform';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <UserComp /> */}
    {/* <RefComp /> */}
    {/* <Changebackground /> */}
    <Myform />
    {/* <IncrementDecrement /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
