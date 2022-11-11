import CharactersDao, { Character } from '../daos/charactersDao';

class CharactersController {
  charactersDao: CharactersDao;

  constructor(charactersDao: CharactersDao) {
    this.charactersDao = charactersDao;
  }

  getAllCharacters = async () => {
    return await this.charactersDao.getAllCharacters();
  };

  getCharacter = async (id: number) => {
    return await this.charactersDao.getCharacter(id);
  };

  createCharacter = async (character: Character) => {
    return await this.charactersDao.createCharacter(character);
  };

  updateCharacter = async (id: number, character: Character) => {
    return await this.charactersDao.updateCharacter(id, character);
  };

  deleteCharacter = async (id: number) => {
    return await this.charactersDao.deleteCharacter(id);
  };
}

export default CharactersController;
