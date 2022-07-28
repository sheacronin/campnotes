var express = require('express');
var router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const allCharacters = await pool.query('SELECT * FROM characters');
    res.json(allCharacters.rows);
  } catch (error) {
    console.error(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const character = await pool.query(
      'SELECT * FROM characters WHERE id = $1',
      [id]
    );

    res.json(character.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, alignment, race } = req.body;
    const newCharacter = await pool.query(
      'INSERT INTO characters (name, description, alignment, race) VALUES($1, $2, $3, $4) RETURNING *',
      [name, description, alignment, race]
    );

    res.json(newCharacter.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, alignment, race } = req.body;
    const updateCharacter = await pool.query(
      'UPDATE characters SET name = $1, description = $2, alignment = $3, race = $4 WHERE id = $5',
      [name, description, alignment, race, id]
    );

    res.json(updateCharacter);
  } catch (error) {
    console.error(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCharacter = await pool.query(
      'DELETE FROM characters WHERE id = $1',
      [id]
    );
    res.json('Character was deleted');
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
