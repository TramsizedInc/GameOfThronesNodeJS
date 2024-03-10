const express = require('express');
const router = express.Router();
const path = require('path');
const { getCharacters } = require('../database');
const { getCharactersById } = require('../database'); 
const  { deleteCharacterById } = require('../database');
const { insertCharacter } = require('../database');

/* const characters = [
    { id: 1, name: 'Tyrion Lannister', house: 'Lannister' },
    { id: 2, name: 'Jon Snow', house: 'Stark' },
    { id: 3, name: 'Daenerys Targaryen', house: 'Targaryen' }
  ];
 */




 
router.get('/index', async (req, res) => {
  try {
      const characters = await getCharacters(); 
      res.render('index', { characters }); 
  } catch (error) {
      console.error("Error fetching characters:", error);
      res.status(500).send("Error fetching characters");
  }
});
router.get('/create', (req, res, next) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
  try {
      const { name, house, attack, defense } = req.body;
      await insertCharacter({ name, house, attack: parseInt(attack), defense: parseInt(defense) }); 
      res.redirect('/character/index'); 
  } catch (error) {
      console.error('Failed to add character:', error);
      res.status(500).send("Error adding character");
  }
});

/* router.use('/update/:id', (req, res, next) => {
    const character = characters.find(c => c.id === parseInt(req.params.id));
  if (!character) return res.status(404).send('Character not found');
  res.render('update', { character });
});

router.post('/update/:id', (req, res) => {
    //modifying to datbase
    res.redirect('/');
  }); */

router.post('/delete/:id', async(req, res, next) => {
    const characterId = parseInt(req.params.id);
    try {
      await deleteCharacterById(characterId)
      res.redirect('/character/index')
    } catch (error) {
      console.error('Error deleting character:', error);
      res.status(500).send('Error deleting character');
    }
    
});
router.get('/show/:id', async (req, res, next) => {
    const characterId = parseInt(req.params.id);

    try {
      const character = await getCharactersById(characterId);
      if (!character) {
        return res.status(404).send('Character not found');
      }
      res.render('show', { character })
    } catch (error) {
      console.error('Error fetching character:', error);
      res.status(500).send('Error fetching character');
    }
});
router.get('/fight', async (req, res) => {
  try {
    const characters = await getCharacters(); // Fetch all characters from the database
    res.render('fight', {characters});
  } catch (error) {
    console.error("Failed to fetch characters:", error);
    res.status(500).send("Error fetching characters");
  }
});


  
module.exports = router;