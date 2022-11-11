import pool from '../config/db';

export interface Character {
  name: string;
  description: string;
  race: string;
  alignment: string;
}

class CharactersDao {
  getAllCharacters = async () => {
    const allCharacters = await pool.query('SELECT * FROM characters');
    return allCharacters.rows;
  };

  getCharacter = async (id: number) => {
    const character = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );
    return character.rows[0];
  };

  createCharacter = async (character: Character) => {
    const { name, description, alignment, race } = character;
    const newCharacter = await pool.query(
      'INSERT INTO characters (name, description, alignment, race) VALUES($1, $2, $3, $4) RETURNING *',
      [name, description, alignment, race]
    );
    return newCharacter.rows[0];
  };

  updateCharacter = async (id: number, character: Character) => {
    const { name, description, alignment, race } = character;
    const updatedCharacter = await pool.query(
      'UPDATE characters SET name = $1, description = $2, alignment = $3, race = $4 WHERE id = $5 RETURNING *',
      [name, description, alignment, race, id]
    );
    return updatedCharacter.rows[0];
  };

  deleteCharacter = async (id: number) => {
    const deletedCharacterId = await pool.query(
      'DELETE FROM characters WHERE id = $1 RETURNING id',
      [id]
    );
    return deletedCharacterId;
  };
}

export default CharactersDao;
