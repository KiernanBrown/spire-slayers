'use strict';

var cards = void 0;
var displayCards = {};

var nameField = void 0;

var character = '';

var deck = [];

// REFACTOR THIS CODE
var updateCards = function updateCards() {
  var bigString = '<p>Click a card to add it to your deck (not functional)</p><p>(Values in parenthesis are for the upgraded card)</p>';
  if (displayCards.redCards) {
    var keys = Object.keys(displayCards.redCards);
    for (var i = 0; i < keys.length; i++) {
      var card = displayCards.redCards[keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }
      bigString = bigString + ' <div class="col-sm-2 redCard">';
      bigString = bigString + ' <h3>' + card.Name + '</h3>';
      bigString = bigString + ' <p>Energy: ' + card.Energy + '</p>';
      bigString = bigString + ' ' + card.Type + '</p>';
      bigString = bigString + ' ' + card.Description + '</p>';
      bigString = bigString + ' </div>';
    }
  }

  if (displayCards.greenCards) {
    var _keys = Object.keys(displayCards.greenCards);
    for (var _i = 0; _i < _keys.length; _i++) {
      var _card = displayCards.greenCards[_keys[_i]];

      if (_i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }
      bigString = bigString + ' <div class="col-sm-2 greenCard">';
      bigString = bigString + ' <h3>' + _card.Name + '</h3>';
      bigString = bigString + ' <p>Energy: ' + _card.Energy + '</p>';
      bigString = bigString + ' ' + _card.Type + '</p>';
      bigString = bigString + ' ' + _card.Description + '</p>';
      bigString = bigString + ' </div>';
    }
  }

  if (displayCards.colorlessCards) {
    var _keys2 = Object.keys(displayCards.colorlessCards);
    for (var _i2 = 0; _i2 < _keys2.length; _i2++) {
      var _card2 = displayCards.colorlessCards[_keys2[_i2]];

      if (_i2 % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }
      bigString = bigString + ' <div class="col-sm-2 colorlessCard">';
      bigString = bigString + ' <h3>' + _card2.Name + '</h3>';
      bigString = bigString + ' <p>Energy: ' + _card2.Energy + '</p>';
      bigString = bigString + ' ' + _card2.Type + '</p>';
      bigString = bigString + ' ' + _card2.Description + '</p>';
      bigString = bigString + ' </div>';
    }
  }
  if (displayCards.curseCards) {
    var _keys3 = Object.keys(displayCards.curseCards);
    for (var _i3 = 0; _i3 < _keys3.length; _i3++) {
      var _card3 = displayCards.curseCards[_keys3[_i3]];

      if (_i3 % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = bigString + ' <div class="col-sm-1"></div>';
        bigString = bigString + ' </div>';
        bigString = bigString + ' <div class="row">';
        bigString = bigString + ' <div class="col-sm-1"></div>';
      }
      bigString = bigString + ' <div class="col-sm-2 curseCard">';
      bigString = bigString + ' <h3>' + _card3.Name + '</h3>';
      bigString = bigString + ' ' + _card3.Type + '</p>';
      bigString = bigString + ' ' + _card3.Description + '</p>';
      bigString = bigString + ' </div>';
    }
  }

  // Show our cards on our page
  var content = document.querySelector("#content");
  content.innerHTML = bigString;
};

var resetDisplayCards = function resetDisplayCards() {
  displayCards = {};
  if (cards.redCards) {
    displayCards.redCards = {};
    var keys = Object.keys(cards.redCards);
    for (var i = 0; i < keys.length; i++) {
      var card = cards.redCards[keys[i]];
      displayCards.redCards[card.Name] = card;
    }
  }
  if (cards.greenCards) {
    displayCards.greenCards = {};
    var _keys4 = Object.keys(cards.greenCards);
    for (var _i4 = 0; _i4 < _keys4.length; _i4++) {
      var _card4 = cards.greenCards[_keys4[_i4]];
      displayCards.greenCards[_card4.Name] = _card4;
    }
  }
  if (cards.colorlessCards) {
    displayCards.colorlessCards = {};
    var _keys5 = Object.keys(cards.colorlessCards);
    for (var _i5 = 0; _i5 < _keys5.length; _i5++) {
      var _card5 = cards.colorlessCards[_keys5[_i5]];
      displayCards.colorlessCards[_card5.Name] = _card5;
    }
  }
  if (cards.curseCards) {
    displayCards.curseCards = {};
    var _keys6 = Object.keys(cards.curseCards);
    for (var _i6 = 0; _i6 < _keys6.length; _i6++) {
      var _card6 = cards.curseCards[_keys6[_i6]];
      displayCards.curseCards[_card6.Name] = _card6;
    }
  }
};

// Update our display cards based on name filter
var updateDisplayCards = function updateDisplayCards() {
  console.dir(nameField.value);
  if (nameField.value !== '') {
    if (displayCards.redCards) {
      var keys = Object.keys(displayCards.redCards);
      for (var i = 0; i < keys.length; i++) {
        var card = displayCards.redCards[keys[i]];
        if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.redCards[keys[i]];
        }
      }
    }

    if (displayCards.greenCards) {
      var _keys7 = Object.keys(displayCards.greenCards);
      for (var _i7 = 0; _i7 < _keys7.length; _i7++) {
        var _card7 = displayCards.greenCards[_keys7[_i7]];
        if (!_card7.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.greenCards[_keys7[_i7]];
        }
      }
    }

    if (displayCards.colorlessCards) {
      var _keys8 = Object.keys(displayCards.colorlessCards);
      for (var _i8 = 0; _i8 < _keys8.length; _i8++) {
        var _card8 = displayCards.colorlessCards[_keys8[_i8]];
        if (!_card8.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.colorlessCards[_keys8[_i8]];
        }
      }
    }

    if (displayCards.curseCards) {
      var _keys9 = Object.keys(displayCards.curseCards);
      for (var _i9 = 0; _i9 < _keys9.length; _i9++) {
        var _card9 = displayCards.curseCards[_keys9[_i9]];
        if (!_card9.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.curseCards[_keys9[_i9]];
        }
      }
    }
  }
};

var handleResponse = function handleResponse(xhr) {
  var content = document.querySelector("#content");

  var obj = JSON.parse(xhr.response);

  console.dir(obj);

  switch (xhr.status) {
    case 200:
      cards = obj;
      resetDisplayCards();
      updateCards();
      break;
    case 400:
      content.innerHTML = '<b>Bad Request</b>';
      break;
    default:
      content.innerHTML = 'Error code not implemented by client.';
      break;
  }
};

var sendAjax = function sendAjax(url, params) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url + '?' + params);
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = function () {
    return handleResponse(xhr);
  };

  console.dir(params);

  xhr.send();
};

var getStarterCards = function getStarterCards() {
  nameField.removeAttribute('disabled');
  nameField.value = '';
  var params = 'character=' + character;
  sendAjax('/starterCards', params);
};

var init = function init() {
  var cardsButton = document.querySelector("#cardsButton");
  var characterSelect = document.querySelector("#characterSelect");
  nameField = document.querySelector("#nameField");

  characterSelect.onchange = function (e) {
    cardsButton.removeAttribute('disabled');
    character = e.target.value;
  };

  cardsButton.addEventListener('click', getStarterCards);

  nameField.onkeyup = function () {
    resetDisplayCards();
    updateDisplayCards();
    updateCards();
  };
};

window.onload = init;
