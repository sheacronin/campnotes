import React from 'react';
import { ICharacter } from './useCharacters';
import EditCharacter from './EditCharacter';
import useEditCharacter from './useEditCharacter';

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
  const { isEditing, onSubmitForm, openEditForm, closeEditForm } =
    useEditCharacter(addCharacter, editCharacter);

  return isEditing ? (
    <EditCharacter
      character={character}
      onSubmitForm={onSubmitForm}
      closeEditForm={closeEditForm}
    />
  ) : (
    <article className="character">
      <h3>{character.name}</h3>
      <div>
        {character.alignment} | {character.race}
      </div>
      <div>{character.description}</div>
      <button onClick={() => deleteCharacter(character.id)}>Delete</button>
      <button onClick={() => openEditForm()}>Edit</button>
    </article>
  );
}

export default Character;
