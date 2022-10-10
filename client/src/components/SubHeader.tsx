import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SubHeader.css';

function SubHeader() {
  return (
    <nav className="subheader">
      <ul>
        <li>
          <Link to="/characters">Characters</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SubHeader;
