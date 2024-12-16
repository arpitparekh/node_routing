import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://node-routing-n249.onrender.com/data')
      .then((response) => {
        console.log('API Response:', response.data); // Debug the response
        if (Array.isArray(response.data)) {
          setUsers(response.data); // Only set data if it’s an array
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <table className="user-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.description}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
