import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  user: { id: number; username: string; password?: string } | null;
  setUser: Function;
  isLoading: boolean;
}

function Header({ user, setUser, isLoading }: HeaderProps) {
  function logoutUser() {
    setUser(null);
    fetch('http://localhost:5000/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
  }

  return (
    <header>
      <h1>
        <Link to="/">CampNotes</Link>
      </h1>
      <nav>
        {!isLoading && (
          <ul>
            {user === null ? (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
