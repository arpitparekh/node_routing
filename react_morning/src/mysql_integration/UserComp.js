import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserComp.css'

export default function UserComp() {
  // http://localhost:3000/users
  // state variable
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [click, setClick] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:3000/users').then((response) => {
      setUsers(response.data);
    });
  }, [click]);

  function onNameChange(e) {
    setName(e.target.value)
  }

  function onEmailChange(e) {
    setEmail(e.target.value)
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  function onconfirmPasswordChange(e) {
    setconfirmPassword(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:3000/addUser', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        setClick(1);
        console.log(response.data);
      });
    console.log(email, name, password, confirmPassword);

  }

  return (
    <div class="registration-form">
      <h2>User Registration</h2>

      <form id="registrationForm" onSubmit={onSubmit}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            value={name}
            onChange={onNameChange}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            value={email}
            onChange={onEmailChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            value={password}
            onChange={onPasswordChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={onconfirmPasswordChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>
        <button type="submit" class="submit-btn">
          Register
        </button>

        <div>
          <ul>
            {users.map((user) => {
              return <li key={user.id}>{user.name}</li>;
            })}
          </ul>
        </div>
      </form>
    </div>
  );
}
