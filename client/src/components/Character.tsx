import React, { useState } from 'react';
import { ICharacter } from '../types';
import EditCharacter from './EditCharacter';

interface CharacterProps {
  character: ICharacter;
  setCharacters: Function;
}

function Character({ character, setCharacters }: CharacterProps) {
  const [isEditing, setIsEditing] = useState(false);

  async function deleteCharacter(id: number) {
    try {
      const deletedCharacter = await fetch(
        `http://localhost:5000/characters/${id}`,
        { method: 'DELETE' }
      );
      console.log(deletedCharacter);
      setCharacters((prevState: ICharacter[]) =>
        prevState.filter((character) => character.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return isEditing ? (
    <EditCharacter
      character={character}
      setIsEditing={setIsEditing}
      setCharacters={setCharacters}
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
