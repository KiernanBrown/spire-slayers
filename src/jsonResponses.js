const ironcladCards = require('./ironcladCards.json');
const silentCards = require('./silentCards.json');

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const getCard = (request, response, params) => {
  console.dir(params);
  if (params.character === 'silent') {
    respondJSON(request, response, 200, silentCards);
  } else if (params.character === 'ironclad') {
    respondJSON(request, response, 200, ironcladCards);
  }
};

module.exports = {
  success,
  badRequest,
  notFound,
  getCard,
};
