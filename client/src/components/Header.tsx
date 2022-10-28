import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { ICampaign } from '../types';

interface HeaderProps {
  user: { id: number; username: string } | null;
  setUser: Function;
  isLoading: boolean;
  campaigns: ICampaign[];
  setCurrentCampaignId: Function;
}

function Header({
  user,
  setUser,
  isLoading,
  campaigns,
  setCurrentCampaignId,
}: HeaderProps) {
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
              <>
                <li>
                  <select
                    name="campaign"
                    id="campaign"
                    onChange={(e) => setCurrentCampaignId(e.target.value)}
                  >
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.title}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  <button onClick={logoutUser}>Logout</button>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
