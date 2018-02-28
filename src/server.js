const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/bootstrap.css': htmlHandler.getBootstrapCSS,
  '/bundle.js': htmlHandler.getBundle,
  '/starterCards': jsonHandler.getCard,
  '/displayAllDecks': jsonHandler.displayAllDecks,
  '/viewDeck': jsonHandler.viewDeck,
  notFound: jsonHandler.notFound,
};

const handleGet = (request, response, parsedUrl, params) => {
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    // Not Found for anything else
    urlStruct.notFound(request, response, params);
  }
};

const handleHead = (request, response, parsedUrl) => {
  if (urlStruct[parsedUrl.pathname]) {
    jsonHandler.getSuccessMeta(request, response);
  } else {
    // Not Found for anything else
    jsonHandler.getNotFoundMeta(request, response);
  }
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  if (parsedUrl.pathname === '/publishDeck') {
    // Handle the POST request for publishing a deck
    const res = response;

    const body = [];

    // Return a 400 if we have an error
    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyArr = bodyString.split('|');
      const bodyParams = JSON.parse(bodyArr[0]);

      // Take the createdDecks string and turn it into an array
      let createdDecks;
      if (bodyArr[1]) {
        createdDecks = JSON.parse(bodyArr[1]);
      }

      jsonHandler.publishDeck(request, res, bodyParams, createdDecks);
    });
  } else if (request.method === 'GET') {
    handleGet(request, response, parsedUrl, params);
  } else if (request.method === 'HEAD') {
    handleHead(request, response, parsedUrl);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
