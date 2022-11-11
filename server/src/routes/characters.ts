import express from 'express';
const router = express.Router();
import CharactersController from '../controllers/charactersController';
import CharactersDao from '../daos/charactersDao';

const charactersController = new CharactersController(new CharactersDao());

router.get('/', async (req, res) => {
  try {
    const allCharacters = await charactersController.getAllCharacters();
    res.json(allCharacters);
  } catch (error) {
    console.error(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const characterId = Number(id);
    const character = await charactersController.getCharacter(characterId);
    res.json(character);
  } catch (error) {
    console.error(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCharacter = await charactersController.createCharacter(req.body);
    res.status(201).json(newCharacter);
  } catch (error) {
    console.error(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const characterId = Number(id);
    const updatedCharacter = await charactersController.updateCharacter(
      characterId,
      req.body
    );
    res.json(updatedCharacter);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const characterId = Number(id);
    const deletedCharacterId = await charactersController.deleteCharacter(
      characterId
    );
    res.json(deletedCharacterId);
  } catch (error) {
    console.error(error);
  }
});

export default router;
