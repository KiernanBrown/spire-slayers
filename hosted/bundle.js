'use strict';

var mode = 'start'; // What mode are we in (start, build, view)

var cards = void 0; // Object containing all cards
var displayCards = {}; // Object containing cards we want to display

var nameField = void 0; // Field used for filtering cards by name

var character = ''; // Character we have selected
var deckRemovable = true; // Can we remove cards from the deck (not during publishing)

// Our deck object
var deck = {
  name: '',
  character: '',
  cards: [],
  notes: ''
};

// Array of deckNames that this user has created
// We will load the cookie for createdDecks on init and set this to be that
var createdDecks = [];

// Function to update/show your deck on the screen
var updateDeck = function updateDeck() {
  var cardCounts = {};

  for (var i = 0; i < deck.cards.length; i++) {
    var card = deck.cards[i];
    cardCounts[card] = (cardCounts[card] || 0) + 1;
  }

  // Build our content
  var bigString = '';
  if (mode === 'build') bigString = bigString + ' <h4>Step 2: Build your deck</h4>';else if (mode === 'view') bigString = bigString + ' <h4>' + deck.name + '</h4>';
  bigString = bigString + ' <b>Your Deck:</b> <br />';
  if (deckRemovable) bigString = bigString + ' <em>(Click on a card to remove it from your deck)</em>';

  var colCount = 0;
  for (var _i = 0; _i < deck.cards.length; _i++) {
    var _card = deck.cards[_i];
    // Only write the card for the first occurance
    if (deck.cards.indexOf(_card) === _i) {
      if (colCount % 8 === 0) {
        // If we are at a 8th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }

      // Make deck cards removable if you are not publishing the deck
      if (deckRemovable) bigString = bigString + ' <div class="deckCards" onclick="deck.cards.splice(\'' + _i + '\', 1); updateDeck();">';else bigString = bigString + ' <div class="deckCards">';
      bigString = bigString + ' <h4>' + deck.cards[_i] + ' x' + cardCounts[_card] + '</h4>';
      bigString = bigString + ' </div>';
      colCount++;
    }
  }

  bigString = bigString + ' </div>';

  // Add the button for publishing the deck
  if (deck.cards.length > 0 && deckRemovable) {
    bigString = bigString + ' <button type="button" class="btn btn-primary" onclick="prePublishDeck();">Publish Deck</button> <br />';
  }

  document.querySelector('#deck').innerHTML = bigString;
};

// Menu for publishing the deck
var prePublishDeck = function prePublishDeck() {
  deckRemovable = false;
  updateDeck();

  // Show the deck publishing options
  var bigString = '<h4>Step 3: Publish your deck</h4>';
  bigString = bigString + ' <br /> <label for="deckName">Deck Name: (entering an existing deck name will update that deck)</label>';
  bigString = bigString + ' <input id=\'deckNameField\' type=\'text\' name=\'deckName\' />';
  bigString = bigString + ' <br /> <label for="deckNotes">Notes about this deck (Optional): </label> <br />';
  bigString = bigString + ' <textarea id="deckNotesField" rows="8" cols="60"> </textarea>';

  bigString = bigString + ' <br /> <button type="button" class="btn btn-primary" onclick="publishDeck();">Publish Deck</button>';
  document.querySelector('#cardsHeader').innerHTML = '';
  document.querySelector('#filters').innerHTML = '';
  document.querySelector('#cards').innerHTML = bigString;
};

// Function to set our starting deck if we are building a deck
// This sets our deck to the starting deck for the character you have selected
var setStartDeck = function setStartDeck() {
  deck.cards = [];
  if (character === 'ironclad') {
    for (var i = 0; i < 5; i++) {
      deck.cards.push('Strike');
    }
    for (var _i2 = 0; _i2 < 4; _i2++) {
      deck.cards.push('Defend');
    }
    deck.cards.push('Bash');
  } else {
    for (var _i3 = 0; _i3 < 5; _i3++) {
      deck.cards.push('Defend');
    }
    for (var _i4 = 0; _i4 < 5; _i4++) {
      deck.cards.push('Strike');
    }
    deck.cards.push('Survivor');
    deck.cards.push('Neutralize');
  }
};

// Function to set cards of a specified cardType
var setCards = function setCards(cardType, displayEnergy, bString) {
  var bigString = bString;
  if (displayCards[cardType]) {
    var keys = Object.keys(displayCards[cardType]);
    for (var i = 0; i < keys.length; i++) {
      var card = displayCards[cardType][keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }
      // If we are building a deck, have the click event to add cards
      if (mode === 'build') bigString = bigString + ' <div class="col-sm-2 ' + cardType + '" onclick="deck.cards.push(\'' + card.Name + '\'); updateDeck();">';
      // Otherwise just display the card
      else if (mode === 'view') bigString = bigString + ' <div class="col-sm-2 ' + cardType + '">';
      bigString = bigString + ' <h3>' + card.Name + '</h3>';
      if (displayEnergy) bigString = bigString + ' <p>Energy: ' + card.Energy + '</p>';
      bigString = bigString + ' ' + card.Type + '</p>';
      bigString = bigString + ' ' + card.Description + '</p>';
      bigString = bigString + ' </div>';
    }
  }

  return bigString;
};

// Set all of our cards and show them on the page
var updateCards = function updateCards() {
  var bigString = '';
  if (mode === 'build') bigString = '<h4>Click a card to add it to your deck:</h4> <em>(Values in parenthesis are for the upgraded card)</em>';else if (mode === 'view') bigString = '<h4>These are the cards in this deck</h4> <em>(Values in parenthesis are for the upgraded card)</em>';
  document.querySelector("#cardsHeader").innerHTML = bigString;

  bigString = '';
  bigString = setCards('redCards', true, bigString);
  bigString = setCards('greenCards', true, bigString);
  bigString = setCards('colorlessCards', true, bigString);
  bigString = setCards('curseCards', false, bigString);

  // Show our cards on our page
  var content = document.querySelector("#cards");
  content.innerHTML = bigString;
};

// Method to reset a cardType in our displayCards
var resetCards = function resetCards(cardType) {
  if (cards[cardType]) {
    displayCards[cardType] = {};
    var keys = Object.keys(cards[cardType]);
    for (var i = 0; i < keys.length; i++) {
      var card = cards[cardType][keys[i]];
      displayCards[cardType][card.Name] = card;
    }
  }
};

// Resets all of our displayCards to be cards
var resetDisplayCards = function resetDisplayCards() {
  displayCards = {};
  resetCards('redCards');
  resetCards('greenCards');
  resetCards('colorlessCards');
  resetCards('curseCards');
};

// Method to filter a cardType by name
var nameFilter = function nameFilter(cardType) {
  if (displayCards[cardType]) {
    var keys = Object.keys(displayCards[cardType]);
    for (var i = 0; i < keys.length; i++) {
      var card = displayCards[cardType][keys[i]];
      if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
        delete displayCards[cardType][keys[i]];
      }
    }
  }
};

// Method to filter cards out of a cardType based on if they're in the deck we are viewing
var deckFilter = function deckFilter(cardType) {
  if (displayCards[cardType]) {
    var keys = Object.keys(displayCards[cardType]);
    for (var i = 0; i < keys.length; i++) {
      var card = displayCards[cardType][keys[i]];
      if (!deck.cards.includes(card.Name)) {
        delete displayCards[cardType][keys[i]];
      }
    }
  }
};

// Update our display cards based on name filter
var updateDisplayCards = function updateDisplayCards() {
  // We filter by the name field when building a deck
  if (mode === 'build') {
    if (nameField.value !== '') {
      nameFilter('redCards');
      nameFilter('greenCards');
      nameFilter('colorlessCards');
      nameFilter('curseCards');
    }
  }

  // We filter by deck when viewing a deck
  // This makes it so only cards in the deck appear on the page
  if (mode === 'view') {
    deckFilter('redCards');
    deckFilter('greenCards');
    deckFilter('colorlessCards');
    deckFilter('curseCards');
  }
};

var handleResponse = function handleResponse(xhr) {
  // We will handle 204 requests before anything else, as we don't parse them
  if (xhr.status === 204) {
    // Updated, user has used a POST request to edit a deck that they created
    bigString = '<h4>Deck Updated</h4></p>';
    bigString = bigString + ' <br /> <button type="button" class="btn btn-primary" onclick="changeMode(\'start\');">Back to start</button> <br />';
    document.querySelector('#responses').innerHTML = bigString;
    return;
  }

  var obj = JSON.parse(xhr.response);

  console.dir(obj);

  var bigString = '';

  switch (xhr.status) {
    // Success, user used a get request
    // This is either to get a deck or all decks, or to get cards from the server
    case 200:
      if (obj.allDecks) {
        // If the user requested the array of all deck names, make the deck objects
        if (obj.allDecks.length === 0) {
          bigString = bigString + ' <h4>No decks have been created yet! Try creating a deck.</h4>';
          document.querySelector('#cards').innerHTML = bigString;
          return;
        }
        for (var i = 0; i < obj.allDecks.length; i++) {
          if (i % 3 === 0) {
            // If we are at a 3rd deck, close our previous row and start a new one
            bigString = bigString + ' <div class="col-sm-1"></div>';
            bigString = bigString + ' </div>';
            bigString = bigString + ' <div class="row">';
            bigString = bigString + ' <div class="col-sm-1"></div>';
          }
          bigString = bigString + ' <div class = \'col-sm-3 deckCards\' onclick=\'deck.name = this.textContent; viewDeck();\'>' + obj.allDecks[i] + '</div>';
        }
        document.querySelector('#cards').innerHTML = bigString;
      } else if (obj.deck) {
        // If the user has requested a deck, we will display it on screen
        deck.name = obj.deck.name;
        deck.character = obj.deck.character;
        character = deck.character;
        deck.cards = obj.deck.cards;
        deck.notes = obj.deck.notes;
        getStarterCards();

        // Fill our responses section with our notes for the deck
        document.querySelector("#responses").innerHTML = '<p><b>Notes:</b> ' + deck.notes + '</p>';
      } else {
        cards = obj;
        resetDisplayCards();
        if (mode === 'view') updateDisplayCards(); // If we are viewing the deck, updateDisplayCards to remove non-relevant cards
        updateCards();
        if (mode === 'build') setStartDeck(); // If we are building a deck, set our deck to the starting deck
        updateDeck();

        if (mode === 'build') {
          // Set up our nameFilter
          bigString = '<br /> <label for="cardName">Filter By Name: </label>';
          bigString = bigString + ' <input id=\'nameField\' type=\'text\' name=\'cardName\' />';
          document.querySelector('#filters').innerHTML = bigString;

          nameField = document.querySelector('#nameField');
          nameField.onkeyup = function () {
            resetDisplayCards();
            updateDisplayCards();
            updateCards();
          };
          nameField.value = '';
        }
      }
      break;

    // Created, user has used a POST request to add a deck to our server's list of decks
    case 201:
      bigString = '<h4>' + obj.message + '</h4>';
      bigString = bigString + ' <br /> <button type="button" class="btn btn-primary" onclick="changeMode(\'start\');">Back to start</button> <br />';
      document.querySelector('#responses').innerHTML = bigString;

      // If the user has created a deck, we will add that to our createdDecks and update the cookie
      createdDecks.push(deck.name);
      document.cookie = createdDecks.toString();
      setTimeout(5000, function () {
        changeMode('start');
      });
      break;

    // Bad Request, user didn't enter a name when publishing the deck
    case 400:
      bigString = '<h4 class="error">Bad Request: ' + obj.message + '</h4>';
      document.querySelector('#responses').innerHTML = bigString;
      break;
  }
};

var sendAjax = function sendAjax(method, url, params) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url + '?' + params);
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  xhr.send();
};

var getStarterCards = function getStarterCards() {
  var params = 'character=' + character;
  sendAjax('GET', '/starterCards', params);
};

// Send a POST request to add the deck to our server's decks
var publishDeck = function publishDeck() {
  deck.name = document.querySelector('#deckNameField').value;
  deck.notes = document.querySelector('#deckNotesField').value;

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/publishDeck');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  var dataString = JSON.stringify(deck);
  if (createdDecks.length > 0) dataString = dataString + '|' + JSON.stringify(createdDecks);
  console.dir(dataString);
  console.dir(createdDecks);

  xhr.send(dataString);
};

var changeMode = function changeMode(newMode) {
  mode = newMode;
  if (newMode === 'start') {
    // Give our start top
    var bigString = '<h1>Spire Slayers</h1>';
    bigString = bigString + ' <h4>Deckbuilding and viewing application for Slay the Spire</h4>';
    bigString = bigString + ' <p>Start off by either building your own deck, or viewing decks that other users have created.</p>';
    bigString = bigString + ' <button type="button" class="btn btn-primary" id=\'buildButton\'>Build Deck</button> ';
    bigString = bigString + ' <button type="button" class="btn btn-primary" id=\'viewButton\'>View Deck</button>';
    document.querySelector('#top').innerHTML = bigString;
    document.querySelector('#deck').innerHTML = '';
    document.querySelector('#cardsHeader').innerHTML = '';
    document.querySelector('#filters').innerHTML = '';
    document.querySelector('#cards').innerHTML = '';
    document.querySelector('#responses').innerHTML = '';

    // Set up our buttons
    document.querySelector("#buildButton").onclick = function () {
      changeMode('build');
    };

    document.querySelector("#viewButton").onclick = function () {
      changeMode('view');
    };
  }

  if (newMode === 'build') {
    // Give our build deck top
    var _bigString = '<h1>Deck Builder</h1>';
    _bigString = _bigString + ' <h4>Step 1: Select the character you are creating the deck for</h4>';
    _bigString = _bigString + ' <form id="characterSelect">';
    _bigString = _bigString + ' <div class="btn-group" data-toggle="buttons">';
    _bigString = _bigString + ' <label id=\'ironcladButton\' class="btn btn-primary"> <input type="radio" name="characters" value=\'ironclad\' id=\'iButton\'> The Ironclad </label>';
    _bigString = _bigString + ' <label id=\'silentButton\' class="btn btn-primary"> <input type="radio" name="characters" value=\'silent\' id=\'sButton\'> The Silent </label>';
    _bigString = _bigString + ' </div> </form>';
    _bigString = _bigString + ' <button type="button" class="btn btn-primary" id=\'cardsButton\' disabled>Create Deck</button> <br />';
    document.querySelector('#top').innerHTML = _bigString;

    // Set our variables for building
    deckRemovable = true;
    var cardsButton = document.querySelector("#cardsButton");
    var characterSelect = document.querySelector("#characterSelect");

    characterSelect.onchange = function (e) {
      cardsButton.removeAttribute('disabled');
      character = e.target.value;
      deck.character = e.target.value;
    };

    cardsButton.addEventListener('click', function () {
      getStarterCards();
      document.querySelector('#iButton').setAttribute('disabled', true);
      document.querySelector('#sButton').setAttribute('disabled', true);
      document.querySelector('#cardsButton').setAttribute('disabled', true);
    });
  }

  if (newMode === 'view') {
    // Give our view deck top
    var _bigString2 = '<h1>Deck Viewer</h1>';
    _bigString2 = _bigString2 + ' <h4>Click on a deck to see the cards that are in it</h4>';
    _bigString2 = _bigString2 + ' <br /> <button type="button" class="btn btn-primary" onclick="changeMode(\'start\');">Back to start</button> <br />';
    document.querySelector('#top').innerHTML = _bigString2;

    // Set our variables for building
    deckRemovable = false;
    sendAjax('GET', '/displayAllDecks');
  }
};

// Function to GET a deck to view from the server
// Called when clicking a deck in the view mode
var viewDeck = function viewDeck() {
  var params = 'deck=' + deck.name;
  sendAjax('GET', '/viewDeck', params);
};

var init = function init() {
  // If there is a cookie, we use it to make our createdDecks array
  // This means the user has created decks in the past
  if (document.cookie) createdDecks = document.cookie.split(',');

  changeMode('start');
};

window.onload = init;
