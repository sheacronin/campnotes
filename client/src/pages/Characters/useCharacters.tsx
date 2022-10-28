import { useReducer, useEffect, useCallback } from 'react';

interface CharacterState {
  characters: ICharacter[];
}

export interface ICharacter {
  id: number;
  name: string;
  description: string;
  race: string;
  alignment: string;
}

enum CharacterActionType {
  GET_CHARACTERS = 'GET_CHARACTERS',
  DELETE_CHARACTER = 'DELETE_CHARACTER',
  ADD_CHARACTER = 'ADD_CHARACTER',
  EDIT_CHARACTER = 'EDIT_CHARACTER',
}

interface ActionGetCharacters {
  type: CharacterActionType.GET_CHARACTERS;
  payload: ICharacter[];
}

interface ActionDeleteCharacter {
  type: CharacterActionType.DELETE_CHARACTER;
  payload: ICharacter[];
}

interface ActionAddCharacter {
  type: CharacterActionType.ADD_CHARACTER;
  payload: ICharacter[];
}

interface ActionEditCharacter {
  type: CharacterActionType.EDIT_CHARACTER;
  payload: ICharacter[];
}

type CharacterActions =
  | ActionGetCharacters
  | ActionDeleteCharacter
  | ActionAddCharacter
  | ActionEditCharacter;

const reducer = (state: CharacterState, action: CharacterActions) => {
  switch (action.type) {
    case CharacterActionType.GET_CHARACTERS:
      return { ...state, characters: action.payload };
    case CharacterActionType.DELETE_CHARACTER:
      return { ...state, characters: action.payload };
    case CharacterActionType.ADD_CHARACTER:
      return { ...state, characters: action.payload };
    case CharacterActionType.EDIT_CHARACTER:
      return { ...state, characters: action.payload };
    default:
      return state;
  }
};

const initialState = { characters: [] };

const useCharacters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCharacters = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/characters');
      const data = await response.json();
      dispatch({ payload: data, type: CharacterActionType.GET_CHARACTERS });
      return data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteCharacter = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`, {
        method: 'DELETE',
      });
      const deletedCharacterId = await response.json();
      const newCharacters = state.characters.filter(
        (character) => character.id !== deletedCharacterId
      );
      dispatch({
        payload: newCharacters,
        type: CharacterActionType.DELETE_CHARACTER,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addCharacter = async (character: ICharacter) => {
    try {
      const response = await fetch('http://localhost:5000/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character),
      });
      const newCharacter: ICharacter = await response.json();
      dispatch({
        payload: [...state.characters, newCharacter],
        type: CharacterActionType.ADD_CHARACTER,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const editCharacter = async (id: number, character: ICharacter) => {
    try {
      const response = await fetch(`http://localhost:5000/characters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(character),
      });
      const updatedCharacter = await response.json();
      const newCharacters = state.characters.map((oldCharacter) =>
        oldCharacter.id === id ? updatedCharacter : oldCharacter
      );
      dispatch({
        payload: newCharacters,
        type: CharacterActionType.EDIT_CHARACTER,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [getCharacters]);

  return { ...state, deleteCharacter, addCharacter, editCharacter };
};

export default useCharacters;
