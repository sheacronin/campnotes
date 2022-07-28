import React from 'react';
import './App.css';
import EditCharacter from './components/EditCharacter';
import ListCharacters from './components/ListCharacters';

function App() {
  return (
    <div>
      <EditCharacter />
      <ListCharacters />
    </div>
  );
}

export default App;
