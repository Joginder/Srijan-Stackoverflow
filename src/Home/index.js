import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userService from '../constants/userService';

export const LoginForm = (props) => {
  super(props);

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUser({
      user: JSON.parse(localStorage.getItem('user')),
      users: { loading: true }
    });
    userService.getAll().then(users => setUsers({ users }));
  }
  );

  const { user, users } = this.state;
  return (
    <div className="user-block">
      <h1>Hi {user.firstName} {user.lastName}!</h1>
      {users.loading && <em>Loading users...</em>}
      {users.length &&
        <ul>
          {users.map((user, index) =>
            <li key={user.id}>
              {user.firstName + ' ' + user.lastName}
            </li>
          )}
        </ul>
      }
      <p>
        <Link to="/login">Logout</Link>
      </p>
    </div>
  );
}

export default HomePage;