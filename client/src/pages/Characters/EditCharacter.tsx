import React, { useState } from 'react';
import { ICharacter } from './useCharacters';

interface EditCharacterProps {
  character?: ICharacter;
  setIsEditing: Function;
  addCharacter: Function;
  editCharacter: Function;
}

function EditCharacter({
  character = { id: -1, name: '', description: '', alignment: '', race: '' },
  setIsEditing,
  addCharacter,
  editCharacter,
}: EditCharacterProps) {
  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const [alignment, setAlignment] = useState(character.alignment);
  const [race, setRace] = useState(character.race);

  async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = { name, description, alignment, race };

    if (character.id === -1) {
      // If no character (set default id to -1), post new character
      addCharacter(body);
    } else {
      // Else, edit the exisiting character
      editCharacter(character.id, body);
    }
    setIsEditing(false);
  }

  return (
    <article>
      <form onSubmit={onSubmitForm}>
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="alignment">Alignment:</label>
          <input
            type="text"
            name="alignment"
            id="alignment"
            value={alignment}
            onChange={(e) => setAlignment(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="race">Race:</label>
          <input
            type="text"
            name="race"
            id="race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />
        </div>
        <div className="form-control">
          <button type="submit">Save Character</button>
        </div>
      </form>
      <button onClick={() => setIsEditing(false)}>Exit</button>
    </article>
  );
}

export default EditCharacter;
