import { useState } from 'react';
import { ICharacter } from './useCharacters';

const useEditCharacter = (addCharacter: Function, editCharacter: Function) => {
  const [isEditing, setIsEditing] = useState(false);

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  const onSubmitForm = (characterId: number, character: ICharacter) => {
    if (characterId === -1) {
      // If no character (set default id to -1), post new character
      addCharacter(character);
    } else {
      // Else, edit the exisiting character
      editCharacter(character.id, character);
    }
    setIsEditing(false);
  };

  return { isEditing, onSubmitForm, openEditForm, closeEditForm };
};

export default useEditCharacter;
