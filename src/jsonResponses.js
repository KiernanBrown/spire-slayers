// Object containing all decks
// I've put in two starter decks
const decks = {
  'Ironclad Start Deck': {
    name: 'Ironclad Start Deck',
    character: 'ironclad',
    cards: ['Strike', 'Strike', 'Strike', 'Strike', 'Strike', 'Defend', 'Defend', 'Defend', 'Defend', 'Bash'],
    notes: 'This is your starting deck when playing as The Ironclad.',
  },
  'Silent Start Deck': {
    name: 'Silent Start Deck',
    character: 'silent',
    cards: ['Strike', 'Strike', 'Strike', 'Strike', 'Strike', 'Defend', 'Defend', 'Defend', 'Defend', 'Defend', 'Survivor', 'Neutralize'],
    notes: 'This is your starting deck when playing as The Silent.',
  },
};

const ironcladCards = require('./ironcladCards.json');
const silentCards = require('./silentCards.json');

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getCard = (request, response, params) => {
  if (params.character === 'silent') {
    respondJSON(request, response, 200, silentCards);
  } else if (params.character === 'ironclad') {
    respondJSON(request, response, 200, ironcladCards);
  }
};

const publishDeck = (request, response, body, createdDecks) => {
  const responseJSON = {
    message: 'Missing Deck Name',
  };

  if (!body.name || body.name === '') {
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (decks[body.name]) {
    if (!createdDecks || createdDecks.indexOf(body.name) === -1) {
      // If there are no created decks, or if the user has not created this deck, we give a 400
      // This is telling the user that someone else has made a deck with this name
      responseJSON.message = 'Deck Name has already been used. Please choose a different Deck Name.';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }

    // Otherwise we do a 204 and update the deck
    responseCode = 204;
  } else {
    decks[body.name] = {};
  }

  decks[body.name].name = body.name;
  decks[body.name].character = body.character;
  decks[body.name].cards = body.cards;
  decks[body.name].notes = body.notes;

  if (responseCode === 201) {
    responseJSON.message = 'Deck Successfully Published';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const viewDeck = (request, response, params) => {
  const responseJSON = {
    message: 'Deck cannot be found',
  };
  // If we have the deck that the user is looking for, we will give a 200 and view the deck
  if (decks[params.deck]) {
    respondJSON(request, response, 200, { deck: decks[params.deck] });
  } else {
    // If we don't have the deck, give a 404
    responseJSON.id = 'notFound';
    respondJSON(request, response, 404, responseJSON);
  }
};

// Function to display the names of all the decks
const displayAllDecks = (request, response) => {
  respondJSON(request, response, 200, { allDecks: Object.keys(decks) });
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const getSuccessMeta = (request, response) => respondJSONMeta(request, response, 200);

const getNotFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  getCard,
  publishDeck,
  notFound,
  displayAllDecks,
  viewDeck,
  getSuccessMeta,
  getNotFoundMeta,
};
