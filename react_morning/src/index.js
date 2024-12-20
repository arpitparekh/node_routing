import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import UserComp from './mysql_integration/UserComp';
// import RefComp from './hooks/RefComp';
// import Myform from './hooks/Myform.js';  // Add the .js extension
// import UserComp from './mysql_integration/UserComp.js';
// import Changebackground from './hooks/ChangeBackground.js';
// import IncrementDecrement from './hooks/IncrementDecrement.js';
import AddUser from './mysql_integration/AddUser.js';
import UsersList from './mysql_integration/UserList.js';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <UserComp /> */}
    {/* <RefComp /> */}
    {/* <Changebackground /> */}
    <div>
      <AddUser />
      <UsersList />
    </div>
    {/* <IncrementDecrement /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
