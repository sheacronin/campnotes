import React, { useState } from 'react';

function EditCharacter() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [alignment, setAlignment] = useState('');
  const [race, setRace] = useState('');

  async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const body = { name, description, alignment, race };
      const response = await fetch('http://localhost:5000/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <article>
      <h2>Character name</h2>
      <form onSubmit={onSubmitForm}>
        <div className="form-element">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-element">
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
    </article>
  );
}

export default EditCharacter;
