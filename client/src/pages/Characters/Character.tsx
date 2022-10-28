import React, { useState } from 'react';
import { ICharacter } from './useCharacters';
import EditCharacter from './EditCharacter';

interface CharacterProps {
  character: ICharacter;
  deleteCharacter: Function;
  addCharacter: Function;
  editCharacter: Function;
}

function Character({
  character,
  deleteCharacter,
  addCharacter,
  editCharacter,
}: CharacterProps) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditCharacter
      character={character}
      setIsEditing={setIsEditing}
      addCharacter={addCharacter}
      editCharacter={editCharacter}
    />
  ) : (
    <article className="character">
      <h3>{character.name}</h3>
      <div>
        {character.alignment} | {character.race}
      </div>
      <div>{character.description}</div>
      <button onClick={() => deleteCharacter(character.id)}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </article>
  );
}

export default Character;
