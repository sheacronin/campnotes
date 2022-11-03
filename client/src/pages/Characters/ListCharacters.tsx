import './Characters.css';
import React from 'react';
import EditCharacter from './EditCharacter';
import Character from './Character';
import useCharacters from './useCharacters';
import useEditCharacter from './useEditCharacter';

function ListCharacters() {
  const { characters, deleteCharacter, addCharacter, editCharacter } =
    useCharacters();
  const {
    isEditing: isAddingCharacter,
    onSubmitForm,
    openEditForm,
    closeEditForm,
  } = useEditCharacter(addCharacter, editCharacter);

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
          onSubmitForm={onSubmitForm}
          closeEditForm={closeEditForm}
        />
      ) : (
        <button onClick={() => openEditForm()}>Add Character</button>
      )}
    </div>
  );
}

export default ListCharacters;
