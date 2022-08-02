import '../styles/Characters.css';
import React, { useEffect, useState } from 'react';
import EditCharacter from './EditCharacter';
import Character from './Character';
import { ICharacter } from '../types';

function ListCharacters() {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [isAddingCharacter, setIsAddingCharacter] = useState(false);

  async function getCharacters() {
    try {
      const response = await fetch('http://localhost:5000/characters');
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div className="characters-container">
      {characters.map((character) => (
        <Character
          key={character.id}
          character={character}
          setCharacters={setCharacters}
        />
      ))}
      {isAddingCharacter ? (
        <EditCharacter
          setIsEditing={setIsAddingCharacter}
          setCharacters={setCharacters}
        />
      ) : (
        <button onClick={() => setIsAddingCharacter((prevState) => !prevState)}>
          Add Character
        </button>
      )}
    </div>
  );
}

export default ListCharacters;
