import React, { useEffect, useState } from 'react';

interface Character {
  id: number;
  name: string;
  description: string;
  race: string;
  alignment: string;
}

function ListCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);

  async function getCharacters() {
    try {
      const response = await fetch('http://localhost:5000/characters');
      const data = await response.json();
      setCharacters(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteCharacter(id: number) {
    try {
      const deletedCharacter = await fetch(
        `http://localhost:5000/characters/${id}`,
        { method: 'DELETE' }
      );
      console.log(deletedCharacter);
      setCharacters(characters.filter((character) => character.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <div>
      {characters.map((character) => (
        <article key={character.id}>
          <h3>{character.name}</h3>
          <div>
            {character.alignment} | {character.race}
          </div>
          <div>{character.description}</div>
          <button onClick={() => deleteCharacter(character.id)}>Delete</button>
        </article>
      ))}
    </div>
  );
}

export default ListCharacters;
