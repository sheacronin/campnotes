import './Characters.css';
import React, { useState } from 'react';
import EditCharacter from './EditCharacter';
import Character from './Character';
import useCharacters from './useCharacters';

function ListCharacters() {
  const [isAddingCharacter, setIsAddingCharacter] = useState(false);
  const { characters, deleteCharacter, addCharacter, editCharacter } =
    useCharacters();

  return (
    <div className="characters-container">
      {characters.map((character) => (
        <Character
          key={character.id}
          character={character}
          deleteCharacter={deleteCharacter}
          addCharacter={addCharacter}
          editCharacter={editCharacter}
        />
      ))}
      {isAddingCharacter ? (
        <EditCharacter
          setIsEditing={setIsAddingCharacter}
          addCharacter={addCharacter}
          editCharacter={editCharacter}
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
