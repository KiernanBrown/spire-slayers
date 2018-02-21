let cards;
let displayCards = {};

let nameField;

let character = '';

const deck = [];

// REFACTOR THIS CODE
const updateCards = () => {
  let bigString = '<p>Click a card to add it to your deck (not functional)</p><p>(Values in parenthesis are for the upgraded card)</p>';
  if (displayCards.redCards) {
    const keys = Object.keys(displayCards.redCards);
    for (let i = 0; i < keys.length; i++) {
      const card = displayCards.redCards[keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = `${bigString} <div class="col-sm-1"></div>`;
        bigString = `${bigString} </div>`;
        bigString = `${bigString} <div class="row">`;
        bigString = `${bigString} <div class="col-sm-1"></div>`;
      }
      bigString = `${bigString} <div class="col-sm-2 redCard">`;
      bigString = `${bigString} <h3>${card.Name}</h3>`;
      bigString = `${bigString} <p>Energy: ${card.Energy}</p>`;
      bigString = `${bigString} ${card.Type}</p>`;
      bigString = `${bigString} ${card.Description}</p>`;
      bigString = `${bigString} </div>`;
    }
  }

  if (displayCards.greenCards) {
    const keys = Object.keys(displayCards.greenCards);
    for (let i = 0; i < keys.length; i++) {
      const card = displayCards.greenCards[keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = `${bigString} <div class="col-sm-1"></div>`;
        bigString = `${bigString} </div>`;
        bigString = `${bigString} <div class="row">`;
        bigString = `${bigString} <div class="col-sm-1"></div>`;
      }
      bigString = `${bigString} <div class="col-sm-2 greenCard">`;
      bigString = `${bigString} <h3>${card.Name}</h3>`;
      bigString = `${bigString} <p>Energy: ${card.Energy}</p>`;
      bigString = `${bigString} ${card.Type}</p>`;
      bigString = `${bigString} ${card.Description}</p>`;
      bigString = `${bigString} </div>`;
    }
  }

  if (displayCards.colorlessCards) {
    const keys = Object.keys(displayCards.colorlessCards);
    for (let i = 0; i < keys.length; i++) {
      const card = displayCards.colorlessCards[keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = `${bigString} <div class="col-sm-1"></div>`;
        bigString = `${bigString} </div>`;
        bigString = `${bigString} <div class="row">`;
        bigString = `${bigString} <div class="col-sm-1"></div>`;
      }
      bigString = `${bigString} <div class="col-sm-2 colorlessCard">`;
      bigString = `${bigString} <h3>${card.Name}</h3>`;
      bigString = `${bigString} <p>Energy: ${card.Energy}</p>`;
      bigString = `${bigString} ${card.Type}</p>`;
      bigString = `${bigString} ${card.Description}</p>`;
      bigString = `${bigString} </div>`;
    }
  }
  if (displayCards.curseCards) {
    const keys = Object.keys(displayCards.curseCards);
    for (let i = 0; i < keys.length; i++) {
      const card = displayCards.curseCards[keys[i]];

      if (i % 5 === 0) {
        // If we are at a 5th card, close our previous row and start a new one
        bigString = `${bigString} <div class="col-sm-1"></div>`;
        bigString = `${bigString} </div>`;
        bigString = `${bigString} <div class="row">`;
        bigString = `${bigString} <div class="col-sm-1"></div>`;
      }
      bigString = `${bigString} <div class="col-sm-2 curseCard">`;
      bigString = `${bigString} <h3>${card.Name}</h3>`;
      bigString = `${bigString} ${card.Type}</p>`;
      bigString = `${bigString} ${card.Description}</p>`;
      bigString = `${bigString} </div>`;
    }
  }

  // Show our cards on our page
  const content = document.querySelector("#content");
  content.innerHTML = bigString;
};

const resetDisplayCards = () => {
  displayCards = {};
  if (cards.redCards) {
    displayCards.redCards = {};
    const keys = Object.keys(cards.redCards);
    for (let i = 0; i < keys.length; i++) {
      const card = cards.redCards[keys[i]];
      displayCards.redCards[card.Name] = card;
    }
  }
  if (cards.greenCards) {
    displayCards.greenCards = {};
    const keys = Object.keys(cards.greenCards);
    for (let i = 0; i < keys.length; i++) {
      const card = cards.greenCards[keys[i]];
      displayCards.greenCards[card.Name] = card;
    }
  }
  if (cards.colorlessCards) {
    displayCards.colorlessCards = {};
    const keys = Object.keys(cards.colorlessCards);
    for (let i = 0; i < keys.length; i++) {
      const card = cards.colorlessCards[keys[i]];
      displayCards.colorlessCards[card.Name] = card;
    }
  }
  if (cards.curseCards) {
    displayCards.curseCards = {};
    const keys = Object.keys(cards.curseCards);
    for (let i = 0; i < keys.length; i++) {
      const card = cards.curseCards[keys[i]];
      displayCards.curseCards[card.Name] = card;
    }
  }
};

// Update our display cards based on name filter
const updateDisplayCards = () => {
  console.dir(nameField.value);
  if (nameField.value !== '') {
    if (displayCards.redCards) {
      const keys = Object.keys(displayCards.redCards);
      for (let i = 0; i < keys.length; i++) {
        const card = displayCards.redCards[keys[i]];
        if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.redCards[keys[i]];
        }
      }
    }

    if (displayCards.greenCards) {
      const keys = Object.keys(displayCards.greenCards);
      for (let i = 0; i < keys.length; i++) {
        const card = displayCards.greenCards[keys[i]];
        if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.greenCards[keys[i]];
        }
      }
    }

    if (displayCards.colorlessCards) {
      const keys = Object.keys(displayCards.colorlessCards);
      for (let i = 0; i < keys.length; i++) {
        const card = displayCards.colorlessCards[keys[i]];
        if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.colorlessCards[keys[i]];
        }
      }
    }

    if (displayCards.curseCards) {
      const keys = Object.keys(displayCards.curseCards);
      for (let i = 0; i < keys.length; i++) {
        const card = displayCards.curseCards[keys[i]];
        if (!card.Name.toUpperCase().includes(nameField.value.toUpperCase())) {
          delete displayCards.curseCards[keys[i]];
        }
      }
    }
  }
};

const handleResponse = (xhr) => {
  const content = document.querySelector("#content");

  const obj = JSON.parse(xhr.response);

  console.dir(obj);

  switch (xhr.status) {
    case 200:
      cards = obj;
      resetDisplayCards();
      updateCards();
      break;
    case 400:
      content.innerHTML = `<b>Bad Request</b>`;
      break;
    default:
      content.innerHTML = `Error code not implemented by client.`;
      break;
  }
};

const sendAjax = (url, params) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${url}?${params}`);
  xhr.setRequestHeader('Accept', 'application/json');

  xhr.onload = () => handleResponse(xhr);

  console.dir(params);

  xhr.send();
};

const getStarterCards = () => {
  nameField.removeAttribute('disabled');
  nameField.value = '';
  const params = `character=${character}`;
  sendAjax('/starterCards', params);
};

const init = () => {
  const cardsButton = document.querySelector("#cardsButton");
  const characterSelect = document.querySelector("#characterSelect");
  nameField = document.querySelector("#nameField");

  characterSelect.onchange = (e) => {
    cardsButton.removeAttribute('disabled');
    character = e.target.value;
  };

  cardsButton.addEventListener('click', getStarterCards);

  nameField.onkeyup = () => {
    resetDisplayCards();
    updateDisplayCards();
    updateCards();
  };
};

window.onload = init;
