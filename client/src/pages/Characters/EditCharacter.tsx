import React, { useState } from 'react';
import { ICharacter } from './useCharacters';

interface EditCharacterProps {
  character?: ICharacter;
  onSubmitForm: Function;
  closeEditForm: Function;
}

function EditCharacter({
  character = { id: -1, name: '', description: '', alignment: '', race: '' },
  onSubmitForm,
  closeEditForm,
}: EditCharacterProps) {
  const [name, setName] = useState(character.name);
  const [description, setDescription] = useState(character.description);
  const [alignment, setAlignment] = useState(character.alignment);
  const [race, setRace] = useState(character.race);

  return (
    <article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm(character.id, { name, description, alignment, race });
        }}
      >
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
      <button onClick={() => closeEditForm()}>Exit</button>
    </article>
  );
}

export default EditCharacter;
