const { getCharacters } = require('./database');
const { connectToDb } = require('./database');
const { getCharactersById } = require('./database');

async function testGetCharacters() {
    try {

        await connectToDb();

        const characters = await getCharacters();
        console.log('Characters:', characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

async function testGetCharactersById() {
    try {

        await connectToDb();

        const characters = await getCharactersById(1);
        console.log('Characters:', characters);
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}

testGetCharactersById();
/* testGetCharacters(); */