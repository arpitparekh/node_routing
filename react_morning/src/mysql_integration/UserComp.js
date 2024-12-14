import axios from 'axios';
import { useEffect, useState } from 'react';
import './UserComp.css';

export default function UserComp() {
  // State variables
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [click, setClick] = useState(0);

  // Backend URL
  const BACKEND_URL =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';

  // Fetch users
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users`)
      .then((response) => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Expected an array, got:', response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error.message);
        setUsers([]);
      });
  }, [click, BACKEND_URL]);

  // Form Handlers
  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(''); // Reset errors
    setSuccessMessage(''); // Reset success message

    // Validate password and confirmPassword
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    axios
      .post(`${BACKEND_URL}/addUser`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log('User created:', response.data);
        setClick((prevClick) => prevClick + 1); // Refresh users list
        setSuccessMessage('User registered successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch((error) => {
        console.error('Error creating user:', error.message);
        setError('Failed to register user. Please try again.');
      });
  };

  return (
    <div className="registration-form">
      <h2>User Registration</h2>

      {/* Form */}
      <form id="registrationForm" onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={onNameChange}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={onEmailChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={onPasswordChange}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      {/* User List */}
      <div>
        <h3>Registered Users</h3>
        <ul>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
